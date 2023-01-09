<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title class="flex items-center justify-start">
        <img class="logo" src="/logo.jpeg" alt="">
        <p class="q-ma-none">Simpliciter Case</p>
      </q-toolbar-title>
      <div>
      <q-btn v-if="!route.params.id" size="sm" color="white" class="text-black" @click="settingStore.newTaskState = true">Add New</q-btn>
      <q-btn v-else size="sm" color="white" class="text-black" to="/">Task List</q-btn>
      </div>
    </q-toolbar>
  </q-header>
  <NewTask />
</template>

<script setup>
import { useSettingStore } from 'src/stores/setting-store';
import NewTask from './NewTask.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
.logo {
  max-height: 50px;
}
</style>
