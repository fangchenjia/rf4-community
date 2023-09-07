import { fabric } from 'fabric';

class Editor {
  container: HTMLElement;
  canvas: fabric.Canvas;
  private pluginMap: {
    [propName: string]: EditorPluginTempl;
  } = {};
  // 自定义API
  private customApis: string[] = [];
  [propName: string]: any;

  constructor(container: HTMLElement | string, canvas: HTMLCanvasElement | string) {
    // 拿到最外层容器
    if (typeof container === 'string') {
      const el = document.getElementById(container);
      if (!el) {
        throw new Error('container is not exist');
      }
      this.container = el;
    } else {
      this.container = container;
    }
    // 拿到画布
    this.canvas = new fabric.Canvas(canvas);
  }

  // 引入组件
  use(plugin: EditorPluginClass, options?: EditorPluginOption) {
    if (this._checkPlugin(plugin)) {
      this._saveCustomAttr(plugin);
      const pluginRunTime = new plugin(this, options);
      this.pluginMap[plugin.pluginName] = pluginRunTime;
      this._bindingApis(pluginRunTime);
    }
  }

  // 获取插件
  getPlugin(name: string) {
    if (this.pluginMap[name]) {
      return this.pluginMap[name];
    }
  }

  // 检查组件
  private _checkPlugin(plugin: EditorPluginClass) {
    const { pluginName, apis = [] } = plugin;
    //名称检查
    if (this.pluginMap[pluginName]) {
      throw new Error(pluginName + '插件重复初始化');
    }

    apis.forEach((apiName: string) => {
      if (this.customApis.find((info) => info === apiName)) {
        throw new Error(pluginName + '插件中' + apiName + '重复');
      }
    });
    return true;
  }

  // 保存组件自定义事件与API
  private _saveCustomAttr(plugin: EditorPluginClass) {
    const { apis = [] } = plugin;
    this.customApis = this.customApis.concat(apis);
  }
  // 代理API事件
  private _bindingApis(pluginRunTime: EditorPluginTempl) {
    const { apis = [] } = pluginRunTime.constructor;
    apis.forEach((apiName) => {
      this[apiName] = function (...args: any) {
        return pluginRunTime[apiName].apply(pluginRunTime, [...args]);
      };
    });
  }
}

export default Editor;
