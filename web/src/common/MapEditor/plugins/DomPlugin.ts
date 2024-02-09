// 渲染html插件
import { fabric } from 'fabric'
import Editor from '../core'

class DomPlugin {
  public canvas: fabric.Canvas
  public editor: Editor
  static pluginName = 'DomPlugin'
  static apis = ['showDom', 'setDom', 'hideDom']

  dom: HTMLElement
  container: HTMLElement
  timer: any = new Date().getTime()
  constructor(editor: Editor) {
    this.editor = editor
    this.canvas = editor.canvas
    this.dom = document.createElement('div')
    this.dom.style.display = 'none'
    this.dom.style.position = 'absolute'
    this.dom.style.zIndex = '9999'
    this.container = editor.container
    this.container.appendChild(this.dom)
    this.init()
  }

  init() {
    this._clickAutoHide()
  }

  _clickAutoHide() {
    // 点击其他元素隐藏dom
    this.container.addEventListener('click', (e) => {
      const now = new Date().getTime();
      if (now - this.timer > 500 && (e.target !== this.dom && !this.dom.contains(e.target))) {
        this.hideDom()
      }
    })
  }

  showDom(x: number, y: number) {
    this.dom.style.left = `${x}px`;
    this.dom.style.top = `${y}px`;
    this.dom.style.display = 'block';

    this.timer = new Date().getTime();
  }

  hideDom() {
    this.dom.style.display = 'none';
  }

  setDom(dom: HTMLElement) {
    this.dom.innerHTML = '';
    this.dom.appendChild(dom);
  }
}

export default DomPlugin
