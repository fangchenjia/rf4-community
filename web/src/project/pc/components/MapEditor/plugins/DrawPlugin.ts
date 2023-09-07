import { fabric } from 'fabric'
import Editor from '../core'
import { v4 as uuid } from 'uuid';
import Arrow from '../shapes/Arrow.js'

// mode 枚举类型
type DrawMode = 'arrow' | 'draw' | 'base'

class DrawPlugin {
  public canvas: fabric.Canvas
  public editor: Editor
  static pluginName = 'DrawPlugin'
  static apis = ['setDrawMode', 'addTextBox', 'setDrawColor', 'setDrawStrokeWidth']
  mode: DrawMode = 'base'
  color: string = '#000000'
  strokeWidth: number = 1
  isDrawArrow: boolean = false
  lineToDraw: any
  pointer: any;
  pointerPoints: any;
  constructor(editor: Editor) {
    this.editor = editor
    this.canvas = editor.canvas
    this.lineToDraw = null;
    this.pointer = null;
    this.pointerPoints = null;
    this.init();
  }

  init() {
    this._initArrow();
    this._initPencilBrush();
  }

  setDrawColor(color: string) {
    this.color = color
    this.canvas.freeDrawingBrush.color = color
  }

  setDrawStrokeWidth(strokeWidth: number) {
    this.strokeWidth = strokeWidth
    this.canvas.freeDrawingBrush.width = strokeWidth
  }

  addTextBox(option?: fabric.ITextboxOptions) {
    // 添加文本框
    const text = new fabric.Textbox('点击编辑', {
      ...option,
      left: 10,
      top: 10,
      fontFamily: 'Arial',
      width: 20,
      fontSize: 8,
      transparentCorners: false,
      id: uuid(),
    });
    this.canvas.add(text);
    // 置于最上层
    this.canvas.setActiveObject(text);
    this.canvas.renderAll();
  };

  _initPencilBrush() {
    // 创建画笔
    const brush = new fabric.PencilBrush(this.canvas)
    brush.color = this.color
    brush.width = this.strokeWidth
    this.canvas.freeDrawingBrush = brush
    // 监听绘制完成事件
    this.canvas.on('path:created', function(event) {
      const path = event.path;
      // 设置绘制的路径不可点击
      path.evented = false;
    });
  }

  _initArrow() {
    const { canvas } = this;
    // 画箭头
    canvas.on('mouse:down', (o) => {
      if (this.mode !== 'arrow') return;
      canvas.discardActiveObject();
      canvas.getObjects().forEach((obj) => {
        obj.selectable = false;
        obj.hasControls = false;
      });
      canvas.selection = false;
      canvas.requestRenderAll();
      this.isDrawArrow = true;
      this.pointer = canvas.getPointer(o.e);
      this.pointerPoints = [this.pointer.x, this.pointer.y, this.pointer.x, this.pointer.y];

      const NodeHandler = Arrow;
      this.lineToDraw = new NodeHandler(this.pointerPoints, {
        strokeWidth: this.strokeWidth,
        stroke: this.color,
        id: uuid(),
      });

      this.lineToDraw.selectable = false;
      this.lineToDraw.evented = false;
      this.lineToDraw.strokeUniform = true;
      canvas.add(this.lineToDraw);
    });

    canvas.on('mouse:move', (o) => {
      if (!this.isDrawArrow) return;
      canvas.discardActiveObject();
      const activeObject = canvas.getActiveObject();
      if (activeObject) return;
      this.pointer = canvas.getPointer(o.e);

      if (o.e.shiftKey) {
        // calc angle
        const startX = this.pointerPoints[0];
        const startY = this.pointerPoints[1];
        const x2 = this.pointer.x - startX;
        const y2 = this.pointer.y - startY;
        const r = Math.sqrt(x2 * x2 + y2 * y2);
        let angle = (Math.atan2(y2, x2) / Math.PI) * 180;
        angle = parseInt(((angle + 7.5) % 360) / 15) * 15;

        const cosx = r * Math.cos((angle * Math.PI) / 180);
        const sinx = r * Math.sin((angle * Math.PI) / 180);

        this.lineToDraw.set({
          x2: cosx + startX,
          y2: sinx + startY,
        });
      } else {
        this.lineToDraw.set({
          x2: this.pointer.x,
          y2: this.pointer.y,
        });
      }

      canvas.renderAll();
    });

    canvas.on('mouse:up', () => {
      if (!this.isDrawArrow) return;
      this.lineToDraw.setCoords();
      this.isDrawArrow = false;
      canvas.discardActiveObject();
    });

  }

  setDrawMode(mode: DrawMode) {
    this.mode = mode
    switch(mode) {
      case 'arrow':
        this.canvas.isDrawingMode = false
        break
      case 'draw':
        this.canvas.isDrawingMode = true
        break
      case 'base':
        this.canvas.isDrawingMode = false
        // 所有text对象可选中
        this.canvas.getObjects().forEach((obj) => {
          if (obj.get('type') === 'textbox') {
            obj.selectable = true;
            obj.hasControls = true;
          }
        });
        break
    }
  }

  endRest() {
    this.canvas.getObjects().forEach((obj) => {
      if (obj.id !== 'workspace') {
        obj.selectable = true;
        obj.hasControls = true;
      }
    });
  }
}

export default DrawPlugin
