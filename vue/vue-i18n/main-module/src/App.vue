<template>
  <div>
    {{ $t("date") }}
    <ETable></ETable>

    <el-radio v-model="radio" label="zh" @change="changeLanguage"
      >中文</el-radio
    >
    <el-radio v-model="radio" label="en" @change="changeLanguage"
      >英文</el-radio
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "zh",
    };
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang; // 设置给本地的i18n插件
      this.$message.success("切换多语言成功");
    },
  },
};
</script>
