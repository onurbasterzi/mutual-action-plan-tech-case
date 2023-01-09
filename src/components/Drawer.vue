<template>
  <q-drawer v-model="settingStore.drawerState" class="bg-grey-1" overlay side="right"  bordered>
    <EditTask  />
  </q-drawer>
</template>

<script setup>
import { useSettingStore } from 'src/stores/setting-store';
import EditTask from './EditTask.vue';
const settingStore=useSettingStore()

</script>

<style lang="scss" scoped>

</style>
