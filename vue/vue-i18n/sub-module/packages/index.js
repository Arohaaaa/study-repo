import ETable from "./ETable";
import en from "./locales/en";
import zh from "./locales/zh";

const components = [ETable];

// 全局注册
const install = (Vue, { i18n }) => {
  components.forEach((comp) => Vue.use(comp));
  i18n.mergeLocaleMessage("zh", zh);
  i18n.mergeLocaleMessage("en", en);
};

// 支持按需引入
export { ETable };
export default { install, version: "0.1.0" };
