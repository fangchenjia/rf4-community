import { fabric } from 'fabric'
import Editor from '../core'
import { throttle } from 'lodash'
import { downFile } from '@/utils'

class WorkspacePlugin {
  public canvas: fabric.Canvas
  public editor: Editor
  static pluginName = 'WorkspacePlugin'
  static apis = ['big', 'small', 'auto', 'one','setAllowDrag','download','exportObjects','importObjects','clear']
  containerEl: HTMLElement
  workspace: null | fabric.Rect = null
  option: any
  allowDrag: boolean = true
  constructor(editor: Editor) {
    this.editor = editor
    this.canvas = editor.canvas
    this.containerEl = editor.container
    this.init({
      width: 100,
      height: 100
    })
  }

  init(option) {
    this.option = option
    this._initBackground()
    this._initWorkspace()
    // 监听窗口变化
    this._initResizeObserve()
    // 滚轮缩放
    this._bindWheel()
    // 拖拽
    this._initDring()
    // 监听键盘删除事件
    this._initDeleteObserve()
  }

  clear() {
    // 清空所有arrow path
    this.canvas.getObjects().forEach((item) => {
      if (item.type === 'arrow' || item.type === 'path' || item.type === 'circle') {
        if (item.id !== 'singleMarker') {
          this.canvas.remove(item)
        }
      }
    })
  }

  // 导出json
  exportObjects() {
    const json = this.canvas.toJSON(['id', 'gradientAngle', 'selectable', 'hasControls']);
    // 删除workspace
    json.objects = json.objects.filter((item: any) => item.id !== 'workspace')
    return json.objects
  }
  // 导入json
  importObjects(objs: any[]) {
    // 添加json对象中的objects
    objs.forEach((item: any) => {
      // 只导入 textbox arrow path circle
      switch (item.type) {
        case 'textbox':
          item = new fabric.Textbox(item.text, {
            ...item,
            id: item.id,
          });
          break;
        case 'arrow':
          item = new fabric.Arrow(item.points, {
            ...item,
            id: item.id,
          });
          break;
        case 'path':
          item = new fabric.Path(item.path, {
            ...item,
            id: item.id,
          });
          break;
        case 'circle':
          item = new fabric.Circle({
            ...item,
            id: item.id,
          });
          break;
        default:
          break;
      }
      this.canvas.add(item);
    })
  }
  // 下载图片
  download() {
    const dataURL = this.canvas.toDataURL({
      multiplier: 4
    })
    downFile(dataURL, { fileType: 'png' })
  }

  // 自动缩放
  auto() {
    const scale = this._getScale()
    this.setZoomAuto(scale - 0.08)
  }

  // 放大
  big() {
    let zoomRatio = this.canvas.getZoom()
    zoomRatio += 0.05
    const center = this.canvas.getCenter()
    this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio)
  }

  // 缩小
  small() {
    let zoomRatio = this.canvas.getZoom()
    zoomRatio -= 0.05
    const center = this.canvas.getCenter()
    this.canvas.zoomToPoint(
      new fabric.Point(center.left, center.top),
      zoomRatio < 0 ? 0.01 : zoomRatio
    )
  }

  // 1:1 放大
  one() {
    const scale = this._getScale() / 2
    this.setZoomAuto(scale)
    this.canvas.requestRenderAll()
  }

  // 设置是否允许拖拽
  setAllowDrag(allowDrag: boolean) {
    this.allowDrag = allowDrag
  }

  setZoomAuto(scale: number, cb?: (left?: number, top?: number) => void) {
    const { containerEl } = this
    const width = containerEl.offsetWidth
    const height = containerEl.offsetHeight
    this.canvas.setWidth(width)
    this.canvas.setHeight(height)
    const center = this.canvas.getCenter()
    // 重置画布
    this.canvas.setViewportTransform(fabric.iMatrix.concat())
    // 缩放画布
    this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), scale)
    if (!this.workspace) return
    // 设置地图区域居中
    this.setCenterFromObject(this.workspace)

    // 超出画布不展示 即只展示mapWorkspace区域
    this.workspace.clone((cloned: fabric.Rect) => {
      this.canvas.clipPath = cloned
      this.canvas.requestRenderAll()
    })
    if (cb) cb(this.workspace.left, this.workspace.top)
  }

  /**
   * 设置画布中心到指定对象中心点上
   * @param {Object} obj 指定的对象
   */
  setCenterFromObject(obj: fabric.Rect) {
    const { canvas } = this
    const objCenter = obj.getCenterPoint()
    const viewportTransform = canvas.viewportTransform
    if (canvas.width === undefined || canvas.height === undefined || !viewportTransform) return
    viewportTransform[4] = canvas.width / 2 - objCenter.x * viewportTransform[0]
    viewportTransform[5] = canvas.height / 2 - objCenter.y * viewportTransform[3]
    canvas.setViewportTransform(viewportTransform)
    canvas.renderAll()
  }

  _getScale() {
    const viewPortWidth = this.containerEl.offsetWidth
    const viewPortHeight = this.containerEl.offsetHeight
    // 为了可以完整展示在viewport内部
    if (viewPortWidth / viewPortHeight < this.option.width / this.option.height) {
      // 按照宽度缩放
      return viewPortWidth / this.option.width
    }
    // 按照高度缩放
    return viewPortHeight / this.option.height
  }

  // 绑定鼠标滚轮事件
  _bindWheel() {
    this.canvas.on('mouse:wheel', function (this: fabric.Canvas, opt) {
      const delta = opt.e.deltaY
      let zoom = this.getZoom()
      zoom *= 0.999 ** delta
      if (zoom > 20) zoom = 20
      if (zoom < 0.01) zoom = 0.01
      const center = this.getCenter()
      this.zoomToPoint(new fabric.Point(center.left, center.top), zoom)
      opt.e.preventDefault()
      opt.e.stopPropagation()
    })
  }
  // 拖拽模式;
  _initDring() {
    const This = this
    this.canvas.on('mouse:down', function (this: ExtCanvas, opt) {
      if (!This.allowDrag) return
      const evt = opt.e
      // This.canvas.defaultCursor = 'grabbing'
      This.canvas.discardActiveObject()
      This._setDring()
      this.selection = false
      this.isDragging = true
      this.lastPosX = evt.clientX
      this.lastPosY = evt.clientY
      this.requestRenderAll()
    })

    this.canvas.on('mouse:move', function (this: ExtCanvas, opt) {
      if (this.isDragging) {
        This.canvas.discardActiveObject()
        // This.canvas.defaultCursor = 'grabbing'
        const { e } = opt
        if (!this.viewportTransform) return
        const vpt = this.viewportTransform
        vpt[4] += e.clientX - this.lastPosX
        vpt[5] += e.clientY - this.lastPosY
        this.lastPosX = e.clientX
        this.lastPosY = e.clientY
        this.requestRenderAll()
      }
    })

    this.canvas.on('mouse:up', function (this: ExtCanvas) {
      if (!this.viewportTransform) return
      this.setViewportTransform(this.viewportTransform)
      this.isDragging = false
      this.selection = true
      this.getObjects().forEach((obj) => {
        if (obj.id !== 'workspace' && obj.hasControls) {
          obj.selectable = true
        }
      })
      This.canvas.defaultCursor = 'default'
      this.requestRenderAll()
    })
  }
  _setDring() {
    this.canvas.selection = false
    this.canvas.defaultCursor = 'grab'
    this.canvas.getObjects().forEach((obj) => {
      obj.selectable = false
    })
    this.canvas.requestRenderAll()
  }
  // 初始化监听器
  _initResizeObserve() {
    const resizeObserver = new ResizeObserver(
      throttle(() => {
        this.auto()
      }, 50)
    )
    resizeObserver.observe(this.containerEl)
  }

  // 初始化背景
  _initBackground() {
    this.canvas.backgroundImage = ''
    this.canvas.setWidth(this.containerEl.offsetWidth)
    this.canvas.setHeight(this.containerEl.offsetHeight)
  }

  // 初始化画布
  _initWorkspace() {
    const { width, height } = this.option
    const workspace = new fabric.Rect({
      width,
      height,
      id: 'workspace'
    })
    workspace.set('selectable', false) // 不能被选中
    workspace.set('hasControls', false)
    workspace.hoverCursor = 'default'
    this.canvas.add(workspace)
    this.canvas.renderAll()
    this.workspace = workspace
    this.auto()
  }

  // 监听键盘删除事件
  _initDeleteObserve() {
    const { canvas } = this;
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === 8 || e.keyCode === 46 || e.code === 'Delete' || e.code === 'Backspace') {
        // 如果正在编辑文本框，则不删除
        if (canvas.getActiveObject()?.isEditing) return;
        const activeObject = canvas.getActiveObjects();
        if (activeObject) {
          activeObject.map((item) => canvas.remove(item));
          canvas.requestRenderAll();
          canvas.discardActiveObject();
        }
      }
    })
  }

}

export default WorkspacePlugin
