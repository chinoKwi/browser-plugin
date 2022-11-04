<template>
  <!-- <AppstoreOutlined class="app_list_btn" @click="getData()" /> -->
  <Modal title="应用列表" v-model:visible="showAppListVisible" :footer="null">
    <Spin :spinning="loading">
      <Table :columns="columns" :data-source="data">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'enable'">
            <Tag v-if="record.enable == false" color="error">禁用中</Tag>
            <Tag v-else color="success">启用中</Tag>
          </template>
          <template v-if="column.key === 'caozuo'">
            <Button
              type="primary"
              size="default"
              :disabled="record.enable == false"
              :loading="loading"
              @click="useApp(record)"
              >使用</Button
            >
          </template>
        </template>
      </Table>
    </Spin>
  </Modal>
</template>
<script setup>
import { ref } from "vue";
import { Modal, Spin, Table, Button, Tag } from "ant-design-vue";
import { AppstoreOutlined } from "@ant-design/icons-vue";
import { GetAppList } from "@/api/user";

const loading = ref(false);
const showAppListVisible = ref(false);
const columns = ref([
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "是否启用",
    dataIndex: "enable",
    key: "enable",
  },
  {
    title: "操作",
    dataIndex: "caozuo",
    key: "caozuo",
  },
]);
const data = ref([]);

const getData = async () => {
  showAppListVisible.value = true;
  loading.value = true;
  const res = await GetAppList();
  loading.value = false;
  if (res.meta.status !== 200) {
    return (showAppListVisible.value = false);
  }
  data.value = res.data;
};

const useApp = (data) => {
  console.log("useApp", data);
  window.$message.success(`已使用应用【${data.name}】`);

  window.localStorage.setItem("apiAppId", data._id);
  window.localStorage.setItem("apiToken", data.token);
  chrome.storage.sync.set({ apiToken: data.token, apiAppId: data._id });
};

defineExpose({
  openModal: function () {
    getData();
  },
});
</script>
<style lang="less" scoped>
.app_list_btn {
  position: absolute;
  top: 100px;
  left: 0;
}
</style>
