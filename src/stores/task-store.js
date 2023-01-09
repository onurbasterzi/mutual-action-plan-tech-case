import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
export const useTaskStore = defineStore('task', {
  state: () => ({

    tasks: [],
    selectedId: 0,
  }),
  getters: {
    getTaskById: (state) => (id) => {
      return state.tasks.find(x => x.id == id)
    },

    searchResult: (state)=>(value)=>{
      return state.tasks.filter(x => x.title.toLowerCase().includes(value.toLowerCase()));
    }
  },
  actions: {

    getAllTasks() {
      return new Promise((resolve, reject) => {
        api.get(`/tasks/get`).then(res => {
          this.tasks = res.data
          resolve()
        }).catch(err => {
          reject()
        })
      })

    },

    addTask(data) {
      let formData = {
        title: data.value.title,
        tags: JSON.stringify(data.value.tags),
        endDate: data.value.endDate,
        state: data.value.state,
        description: data.value.description
      }
      return new Promise((resolve, reject) => {
        api.post('/tasks/add', formData
        ).then(res => {
          resolve(formData)
        }).catch(err => {
          reject(err)
        })
      })
    },
    deleteTask(id) {

      return new Promise((resolve, reject) => {
        api.post(`/tasks/delete/${id}`, {}
        ).then(res => {
          resolve()
        }).catch(err => {
          reject()
        })
      })
    },
    changeState(state, id) {
      let formData = {
        state
      }
      return new Promise((resolve, reject) => {
        api.post(`/tasks/update/${id}`, formData
        ).then(res => {
          resolve()
        }).catch(err => {
          reject()
        })
      })
    },

    updateTask(data, id) {
      let formData = {
        title: data.value.title,
        tags: JSON.stringify(data.value.tags),
        endDate: data.value.endDate,
        state:data.value.state,
        description:data.value.description
      }
      return new Promise((resolve, reject) => {
        api.post(`/tasks/update/${id}`, formData
        ).then(res => {
          resolve(formData)
        }).catch(err => {
          reject(err)
        })
      })
    },


  }
});
