<template>
  <div>
    <el-table :data="[]" style="width: 100%">
      <el-table-column prop="date" :label="$t('table.date')" width="180">
      </el-table-column>
      <el-table-column prop="name" :label="$t('table.name')" width="180">
      </el-table-column>
      <el-table-column prop="address" :label="$t('table.address')">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui"; // 按需引入

export default {
  name: "ETable",
  components: {
    "el-table": Table,
    "el-table-column": TableColumn,
  },
};
</script>
