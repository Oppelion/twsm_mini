import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    highscore: []
  },
  getters: {
    sortedHighscore: state => {
      return state.highscore.sort((A, B) => {
        const a = parseFloat(A.highscore);
        const b = parseFloat(B.highscore);

        if(a > b) {
          return 1;
        }

        if(a < b) {
          return -1;
        }

        return 0;
      });
    }
  },
  actions: {
    fetchData: async ({ state }) => {
      const res = await axios.get('http://localhost:4000/users');

      state.highscore = res.data;
    },

    addHighscore: async (_, payload) => {
      const instance = axios.create({
        url: '/',
        baseURL: 'http://localhost:4000/user',
        method: 'POST',
        timeout: 1000
      });
      
      let res = await instance.request({
        data: payload
      });
      
      res.data.json
    }
  }
})

Vue.config.productionTip = false

// Refresh highscore every 5 seconds
setInterval(() => {
  store.dispatch('fetchData');
}, 5000);

store.dispatch('fetchData');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
