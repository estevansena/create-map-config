// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    activeIndex: 0,
  },
  mutations: {
    setActiveIndex(state, index) {
      state.activeIndex = index;
    },
  },
  actions: {
    updateActiveIndex({ commit }, index) {
      commit('setActiveIndex', index);
    },
  },
  getters: {
    activeIndex: (state) => state.activeIndex,
  },
});
