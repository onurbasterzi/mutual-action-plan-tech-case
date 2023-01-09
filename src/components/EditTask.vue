<template>
  <div v-if="formData != null">
    <q-card-section>
      <div class="text-h6">Edit Task</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-form class="q-gutter-md">
        <q-form @submit.prevent="onSubmit()" @reset="onCancel" class="q-gutter-md">
          <q-input filled v-model="formData.title" :maxlength="30" @keypress="onlyLetter($event)" label="Title *"
            lazy-rules :rules="[val => val && val.length > 0 || 'This field cannot be empty']" />

          <q-input class="q-mb-none" v-model="newTag" label="Add New Tag..." @keypress="onlyLetter($event)"
            @keydown.enter.prevent="onSubmit($event)" @keyup.enter="addTag(newTag)" filled lazy-rules
            :rules="[val => formData.tags.length > 0 || 'Please add at least one tag']">
            <template v-slot:append>
              <q-btn round dense flat icon="add" @click="addTag(newTag)" />
            </template>
          </q-input>
          <div class="q-my-none">
            <q-chip color="primary" class="q-ma-xs" text-color="white" removable @remove="formData.tags.splice(key, 1)"
              v-for="(tag, key) in formData.tags" :key="key">
              {{ tag }}

            </q-chip>
          </div>
          <q-input filled v-model="formData.endDate" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please select date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="formData.endDate" @update="getData()" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div>
            <q-btn label="Save" type="submit" color="primary" />
            <q-btn label="Cancel" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-form>
    </q-card-section>
    <q-separator />
  </div>
</template>

<script setup>
import { useTaskStore } from 'src/stores/task-store';
import { useSettingStore } from 'src/stores/setting-store';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { onlyLetter } from 'boot/helpers'
import { useQuasar } from 'quasar';


const settingStore = useSettingStore();
const { drawerState } = storeToRefs(settingStore);
const taskStore = useTaskStore();
const formData = ref(null);
const newTag = ref('');
const $q=useQuasar();

const addTag = (value) => {
  if (value != '') {

    formData.value.tags.push(value)
    newTag.value = '';
  }

}

const onSubmit = (e) => {

  if (e) {
    e.preventDefault();
  }

  else {
    taskStore.updateTask(formData,taskStore.selectedId).then(res => {

      let selectedTask=taskStore.tasks.find(x=>x.id==taskStore.selectedId)
      selectedTask.tags=res.tags;
      selectedTask.title=res.title;
      selectedTask.endDate=res.endDate;

      onCancel()
      $q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'task_alt',
        message: 'Task Updated.'
      })
    }).catch(err => {
      $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'warning',
        message: 'Error, something went wrong !'
      })
    })

  }
}

watch(drawerState, (after, before) => {
  if (after == true) {
    formData.value = { ...taskStore.getTaskById(taskStore.selectedId) }
    formData.value.tags = JSON.parse(formData.value.tags)
  }
})

const onCancel = () => {
  settingStore.drawerState = false
}

</script>

<style lang="scss" scoped>

</style>
