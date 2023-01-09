<template>

    <q-card class="wrapper q-ma-lg">
      <q-card-section>
        <div class="text-h6">Task Details</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
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
            <span>Select State: </span>
            <q-toggle false-value="Todo" unchecked-icon="edit_note" class="items-start" size="50px"
              checked-icon="task_alt" :label="formData.state" true-value="Complated" color="green"
              v-model="formData.state" />
          </div>

          <label>Description</label>
          <q-editor v-model="formData.description" min-height="5rem" />

          <div>
            <q-btn label="Save" type="submit" color="primary" />

          </div>
        </q-form>
      </q-card-section>

      <q-separator />


    </q-card>

</template>

<script setup>

import { useTaskStore } from 'src/stores/task-store'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { onlyLetter } from 'boot/helpers'

const selectedId=useRoute().params.id

const taskStore = useTaskStore()
const newTag = ref('');


const $q = useQuasar()

const formData = ref({ ...taskStore.getTaskById(selectedId) })
formData.value.tags=JSON.parse(formData.value.tags)

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
    taskStore.updateTask(formData,selectedId).then(res => {

      let selectedTask=taskStore.tasks.find(x=>x.id==selectedId)
      selectedTask.tags=res.tags;
      selectedTask.title=res.title;
      selectedTask.endDate=res.endDate;
      selectedTask.description=res.description;
      selectedTask.state=res.state;

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


</script>

<style lang="scss" scoped>

</style>
