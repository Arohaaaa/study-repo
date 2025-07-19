import ETable from "./src/ETable.vue";

// 提供 install 方法（支持 Vue.use()）
ETable.install = function (Vue) {
  Vue.component(ETable.name, ETable);
};

export default ETable;
