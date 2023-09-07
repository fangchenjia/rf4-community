
declare type ExtCanvas = fabric.Canvas & {
  isDragging: boolean;
  lastPosX: number;
  lastPosY: number;
};

declare interface EditorPluginOption {
  [propName: string]: unknown;
}

// 插件class
declare interface EditorPluginClass {
  public pluginName: string;
  public apis: string[];
  new (editor: any, options?: EditorPluginOption): EditorPluginTempl;
}

// 插件实例
declare interface EditorPluginTempl {
  editor: Editor;
  canvas: fabric.Canvas;
  [propName: string]: any;
}

