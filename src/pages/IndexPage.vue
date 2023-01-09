<template>
  <q-page class="wrapper">
    <div class="table q-pa-md">
      <q-table :grid="$q.screen.xs" :binary-state-sort="true" title="Tasks List" card-class="bg-background2 main-text"
        :rows="data" :rows-per-page-options="[0]" :columns="columns" row-key="name">
        <template v-slot:top-right>
          <q-input borderless type="text" v-model="filter" @update:model-value="newValue => filterList(newValue)"
            placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:item="props">
          <MobileTableContent @check="check" :data="props" @confirmDelete="confirmDelete"
            @editTaskPanel="editTaskPanel" />
        </template>
        <template v-slot:body-cell-title="props">
          <TableDataCell :data="props" />
        </template>
        <template v-slot:body-cell-endDate="props">
          <TableDataCell :data="props" />
        </template>
        <template v-slot:body-cell-state="props">
          <TableDataCell :data="props" @check="check" />
        </template>
        <template v-slot:body-cell-islemler="props">
          <TableDataCell :data="props" @confirmDelete="confirmDelete" @editTaskPanel="editTaskPanel" />
        </template>
      </q-table>

    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from 'src/stores/task-store';
import { useSettingStore } from 'src/stores/setting-store';
import MobileTableContent from 'src/components/MobileTableContent.vue';
import TableDataCell from 'src/components/TableDataCell.vue'
import { stringToDate, removeById } from 'boot/helpers'
import { useQuasar } from 'quasar';




const filter = ref('');
const tasksStore = useTaskStore()
const settingStore = useSettingStore()
const columns = [
  { name: 'state', classes: 'table-class', sortable: true, sort: (a, b) => { return (a.state.toLowerCase() > b.state.toLowerCase()) ? 1 : -1 }, align: 'left', label: 'State', field: row => row },
  { name: 'title', classes: 'table-class', sortable: true, sort: (a, b) => { return (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1 }, align: 'left', label: 'Title', field: row => row },
  { name: 'endDate', classes: 'table-class', sortable: true, style: '', align: 'left', sort: (a, b) => { return (stringToDate(a.endDate) > stringToDate(b.endDate)) ? 1 : -1 }, label: 'End Date', field: row => row },
  { name: 'islemler', classes: 'table-class', align: 'right', label: '', field: row => row }

]
const data = ref(tasksStore.tasks);

const $q = useQuasar();

const check = (value) => {
  if (value.state == 'Complated') {
    tasksStore.changeState('Todo', value.id).then(() => {
      let selected_task = tasksStore.tasks.find(x => x.id == value.id)
      selected_task.state = 'Todo'

    })
  }
  else {
    tasksStore.changeState('Complated', value.id).then(() => {
      let selected_task = tasksStore.tasks.find(x => x.id == value.id)
      selected_task.state = 'Complated'

    })
  }
}

const filterList = (value) => {
  data.value = tasksStore.searchResult(value)
}



const confirmDelete = (id) => {
  $q.dialog({
    title: 'Selected task will be deleted !',
    message: 'Are you sure you want to delete this record?',
    cancel: {
      label: "Cancel",
      push: true,
      color: 'grey-5',
      tabindex: 0
    },
    ok: {
      label: "Delete",
      push: true,
      color: 'primary',
      tabindex: 1
    },
    persistent: false,

  }).onOk(() => {
    deleteTask(id)
  }).onCancel(() => {
    // console.log('Cancel')
  })
}

const deleteTask = (id) => {
  tasksStore.deleteTask(id).then(() => {
    removeById(tasksStore.tasks, id)
    $q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'task_alt',
      message: 'Task deleted successfully'
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

const editTaskPanel = (id) => {

  tasksStore.selectedId = id;
  settingStore.drawerState = !settingStore.drawerState
}

</script>

<style>
input[type="checkbox"] {
  accent-color: #000000;
  width: 20px;
  height: 20px;
}

.q-table__grid-item-title {
  font-size: 14px
}

.q-table__grid-item-value {
  font-size: 16px;
}

.line-trough {
  text-decoration: line-through;
  color: #4d4d4d;
}
</style>
