import { fabric } from 'fabric'
import Editor from '../core'
import { type Ref } from 'vue'
import { mapItems } from '@/config/map'

class MapPlugin {
  public editor: Editor
  public canvas: fabric.Canvas
  static pluginName = 'MapPlugin'
  static apis = ['setCurMap', 'addMarker', 'addMarkersByPosition','setMapClickPosition', 'setMapFindSwitch']
  switch = true // 点击开关
  workspace: null | fabric.Rect = null
  mapMousePosition: Ref<{ x: number; y: number }> = ref({ x: 0, y: 0 }) // 鼠标在mapWorkspace中的坐标
  mapClickPosition: Ref<{ x: number; y: number }> = ref({ x: 0, y: 0 }) // 点击mapWorkspace中的坐标
  curMap: any
  edgeNum = 4 // 地图边缘的宽度
  markers: fabric.Object[] = [] // 地图上的点位
  constructor(editor: Editor) {
    this.editor = editor
    this.canvas = editor.canvas
    this.workspace = editor.getPlugin('WorkspacePlugin')?.workspace
    this.curMap = mapItems[0]
    this.init()
  }
    

  init() {
    this._initPositionObserve()
    this._initPositionClick()
  }

  // 设置当前地图
  setCurMap(mapKey: string) {
    // 没找到则模糊匹配 写法有点乱mapItems 应该从后台取，而不是前端一份后台一份，后续优化！！！
    const mapItem = mapItems.find((item) => item.value === mapKey) || mapItems.find((item) => item.label.includes(mapKey))
    if (!mapItem) {
      return 
    }
    this.curMap = mapItem
    this._setMapImage(mapItem.imageUrl)
    // 清空所有arrow path
    this.canvas.getObjects().forEach((item) => {
      if (item.type === 'arrow' || item.type === 'path') {
        this.canvas.remove(item)
      }
    })
    // 重置mapClickPosition
    this.mapClickPosition.value = { x: 0, y: 0 }
    // 清空点位
    let singleMarker = null
    this.markers.forEach((marker) => {
      if (marker?.id === 'singleMarker') {
        marker.set('opacity', 0)
        singleMarker = marker
      }else{
        this.canvas.remove(marker)
      }
    })
    this.markers = singleMarker ? [singleMarker] : []
    this.canvas.renderAll()
  }
  // 设置地图开关
  setMapFindSwitch(switchValue: boolean) {
    this.switch = switchValue
  }

  setMapClickPosition(position: { x: number; y: number }) {
    this.mapClickPosition.value = position
    const singleMarker = this.markers.find((marker) => marker?.id === 'singleMarker')
    if (!singleMarker) return
    const { x, y } = this._positionToPoint(position)
    // 设置到中心点 位置减去radius和strokeWidth
    const deviation = (singleMarker.radius || 0) + (singleMarker.strokeWidth || 0) /2
    singleMarker.set({
      left: x - deviation,
      top: y - deviation,
      opacity: 1
    })
    this.canvas.renderAll()
  }

  addMarkersByPosition(positions: { x: number; y: number }[]) {
    positions.forEach((position) => {
      this.addMarker(this._positionToPoint(position), { stroke: 'red' })
    })
  }

  /**
   * 添加点位
   * @param position { x: number; y: number} 坐标
   * @returns fabric.Object
   */
  addMarker( position: { x: number; y: number }, options?: fabric.ICircleOptions) {
    // 在mapWorkspace中添加点位
    const radius = options?.radius || 1.6
    const strokeWidth = options?.strokeWidth || 0.5
    const marker = new fabric.Circle({
      radius: radius,
      fill: options?.fill || '',
      stroke: options?.stroke || '#77ba41',
      strokeWidth: options?.strokeWidth || 0.5,
      left: position.x - radius - strokeWidth/2,
      top: position.y - radius - strokeWidth/2,
      hoverCursor: 'default', // 设置鼠标样式为默认样式
      evented: false,
      ...options
    })
    this.canvas.add(marker)
    this.markers.push(marker)
    return marker
  }

  // 坐标转换为地图点位
  _pointToPosition({ x, y }: { x: number; y: number }) {
    if(x === 0 && y === 0) {
      return { x: 0, y: 0 }
    }
    if (this.workspace?.width === undefined || this.workspace?.height === undefined) {
      throw new Error('workspace width or height is not exist')
    }
    // 去除边缘后计算百分比
    const percentX = (x - this.edgeNum) / (this.workspace?.width - this.edgeNum * 2)
    const percentY = (y - this.edgeNum) / (this.workspace?.height - this.edgeNum * 2)
    // 根据当前地图range计算出当前点位的坐标 pointRange: [{x:48,y:57},{x:138,y:147}]
    const range = this.curMap.pointRange
    if (!range) return { x: 0, y: 0 }
    const px = range[0].x + Math.floor((range[1].x - range[0].x) * percentX)
    const py = range[1].y - Math.floor((range[1].y - range[0].y) * percentY)
    return { x: px, y: py }
  }

  // 地图点位转换为坐标
  _positionToPoint({ x, y }: { x: number; y: number }) {
    if (this.workspace?.width === undefined || this.workspace?.height === undefined) {
      throw new Error('workspace width or height is not exist')
    }
    const range = this.curMap.pointRange
    if (!range) return { x: 0, y: 0 }
    const percentX = (x - range[0].x) / (range[1].x - range[0].x)
    const percentY = (range[1].y - y) / (range[1].y - range[0].y)
    const px = this.edgeNum + (this.workspace?.width - this.edgeNum * 2) * percentX
    const py = this.edgeNum + (this.workspace?.height - this.edgeNum * 2) * percentY
    return { x: px, y: py }
  }

  _initPositionObserve() {
    this.workspace?.on('mousemove', (e) => {
      if (!this.switch) {
        return
      }
      if (!e.absolutePointer) {
        throw new Error('absolutePointer is not exist')
      }
      const { x, y } = e.absolutePointer
      if (this.workspace?.width === undefined || this.workspace?.height === undefined) {
        throw new Error('workspace width or height is not exist')
      }
      // 过滤掉鼠标在地图边缘的区域
      if (
        x < this.edgeNum ||
        y < this.edgeNum ||
        x > this.workspace?.width - this.edgeNum ||
        y > this.workspace?.height - this.edgeNum
      ) {
        this.mapMousePosition.value = { x: 0, y: 0 }
        return
      }
      this.mapMousePosition.value = this._pointToPosition({ x, y })
    })
    // 超出mapWorkspace区域设置为0
    this.workspace?.on('mouseout', () => {
      // 移动到marker上不设置为0
      if (this.canvas.getActiveObject()) return
      this.mapMousePosition.value = { x: 0, y: 0 }
    })
  }

  _initPositionClick() {
    // 用于区分点击和拖拽
    let dragTime = 0
    // 点击mapWorkspace添加点位
    const marker = this.addMarker({ x: 0, y: 0 },{ id: 'singleMarker'}) 
    // 隐藏marker
    marker.set('opacity', 0)
    this.workspace?.on('mousedown', () => {
      dragTime = new Date().getTime()
    })
    this.workspace?.on('mouseup', (e) => {
      if (!this.switch) {
        return
      }
      if (new Date().getTime() - dragTime > 200) return
      const { x, y } = e.absolutePointer
      // 记录点击位置
      this.mapClickPosition.value = this._pointToPosition({ x, y})
      // 设置到中心点 位置减去radius和strokeWidth
      const deviation = (marker.radius || 0) + (marker.strokeWidth || 0) /2
      marker.set({
        left: x - deviation,
        top: y - deviation,
        opacity: 1
      })
    })
  }

  // 设置mapWorkspace的背景图片 图片拉伸至mapWorkspace的大小
  _setMapImage(url: string) {
    const { workspace } = this
    if (!workspace) return
    const img = new Image();
    const timestamp = new Date().getTime();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url + '?' + timestamp;
    img.onload = () => {
      if (
        img.width === undefined ||
        img.height === undefined ||
        workspace.width === undefined ||
        workspace.height === undefined
      )
        return
      const x = workspace.width / img.width
      const y = workspace.height / img.height
      const imgPattern = new fabric.Pattern({
        source: img,
        repeat: 'no-repeat',
        // 重置图片大小和mapWorkspace一样大
        patternTransform: [x, 0, 0, y, 0, 0]
      })
      workspace.set('fill', imgPattern)
      this.canvas.renderAll()
    }
  }
}

export default MapPlugin
