import LoginModal from './LoginModal.vue'
import { createApp } from "vue";

// 创建元素节点
const rootNode = document.createElement("div");
// 在body标签内部插入此元素
document.body.appendChild(rootNode);
// 创建应用实例（第一个参数是根组件。第二个参数可选，它是要传递给根组件的 props）
const loginModal = createApp(LoginModal);
// 挂载应用实例
export default loginModal.mount(rootNode);
