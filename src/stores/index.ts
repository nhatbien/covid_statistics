import { createStore } from "vuex";
export const store = createStore({
  state: {
    isPopupCountry: false,
    country: {},
  },
  getters: {
    isPopupCountry(state){
        return state.isPopupCountry
    }
  },
  mutations: {
    toggleCountry(state, data) {
      if (data) {
        state.country = data;
      }
      state.isPopupCountry = true;
    },
  },
  actions: {
    toggleCountry({commit}, data){
        commit("toggleCountry", data)
    }
  },
});
export function useStore() {
    return store
  }