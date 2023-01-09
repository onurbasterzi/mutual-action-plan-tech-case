<template>
  <q-td v-if="data.col.name == 'title'" :props="data" :class="data.value.state == 'Complated' ? 'bg-green-1' : ''">
    <div class="col-auto">
      <span :class="data.value.state == 'Todo' ? '' : 'line-trough'">    <router-link :to="`/task-details/${data.value.id}`">{{ data.value.title }}</router-link></span>
    </div>
  </q-td>
  <q-td v-if="data.col.name == 'endDate'" :props="data" :class="data.value.state == 'Complated' ? 'bg-green-1' : ''">
    <div class="col-auto">
      <span :class="data.value.state == 'Todo' ? '' : 'line-trough'">{{ data.value.endDate }}</span>
    </div>
  </q-td>
  <q-td v-if="data.col.name == 'state'" :props="data" :class="data.value.state == 'Complated' ? 'bg-green-1' : ''">
    <div class="col-auto flex items-center">

      <input type="checkbox" id="state" @change="$emit('check', data.value)"
        :checked="data.value.state == 'Todo' ? false : true" />
      <label for="state" class="q-ml-sm">{{ data.value.state }}</label>
    </div>

  </q-td>
  <q-td v-if="data.col.name == 'islemler'" :props="data" :class="data.value.state == 'Complated' ? 'bg-green-1' : ''">
    <div class="col-auto">

      <q-btn-dropdown color="primary" size="sm" label="Actions">
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label @click="$emit('editTaskPanel',data.value.id)">Edit Task</q-item-label>
            </q-item-section>
          </q-item>

          <q-item @click="$emit('confirmDelete', data.value.id)" clickable v-close-popup>
            <q-item-section>
              <q-item-label>Delete Task</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

    </div>

  </q-td>
</template>



<script setup>
const props = defineProps(['data'])



</script>

<style lang="scss" scoped>

</style>
