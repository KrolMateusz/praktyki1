export const routrerModule = {
    state: () => ({
      activeRouteName: ""
    }),
    mutations: {  
      changeActiveRouteName(state, value) {
          state.activeRouteName = value
      }
    },
    actions: { },
    getters: { }
  }