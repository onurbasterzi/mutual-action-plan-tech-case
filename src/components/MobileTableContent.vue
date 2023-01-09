<template>
  <div class="q-pa-xs q-py-sm col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
    <q-card class="q-pa-sm">

      <q-item v-for="col in data.cols" :key="col.name" class="q-py-xs "
        :class="col.value.state == 'Complated' ? 'bg-green-1' : ''">
        <div class="q-table__grid-item-row">
          <div class="q-table__grid-item-title">{{ col.label }}</div>
          <div v-if="col.name == 'state'" class="q-table__grid-item-value flex items-center">
            <input type="checkbox" id="state" @change="$emit('check',col.value)"
              :checked="col.value.state == 'Todo' ? false : true" />
            <label for="state" class="q-ml-sm">{{ col.value.state }}</label>
          </div>

          <div v-if="col.name == 'title'" :class="col.value.state == 'Todo' ? '' : 'line-trough'"
            class="q-table__grid-item-value"> <router-link :to="`/task-details/${col.value.id}`">{{ col.value.title }}</router-link></div>
          <div v-if="col.name == 'endDate'" :class="col.value.state == 'Todo' ? '' : 'line-trough'"
            class="q-table__grid-item-value">{{ col.value.endDate }}</div>
          <div v-if="col.name == 'islemler'" class="q-table__grid-item-value">
            <q-btn-dropdown color="primary" size="sm" label="Actions">
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label  @click="$emit('editTaskPanel',col.value.id)">Edit Task</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label @click="$emit('confirmDelete', col.value.id)">Delete Task</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>


      </q-item>

    </q-card>
  </div>
</template>

<script setup>
const props=defineProps(['data'])
</script>

<style lang="scss" scoped>

</style>
