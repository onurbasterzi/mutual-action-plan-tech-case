<template>
  <router-view />
</template>

<script>
import { useTaskStore } from './stores/task-store';
export default {

  preFetch() {
    const taskStore = useTaskStore()

    return new Promise((resolve, reject) => {
      taskStore.getAllTasks().then(() => {
        resolve()
        console.log("tasks from app.vue", taskStore.tasks)
      }).catch(err=>{
        reject()
      })
    })
  }
}

</script>

<script setup>

</script>
