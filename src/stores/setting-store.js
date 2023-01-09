import { defineStore } from 'pinia';

export const useSettingStore = defineStore('setting', {
  state: () => ({
    drawerState: false,
    newTaskState:false,
  }),
  getters: {

  },
  actions: {
    increment() {

    },
  },
});
