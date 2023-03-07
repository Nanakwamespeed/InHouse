import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    user: [],
    adminMenus: [],
    userMenus: [],
    theme: '',
    loggedIn: false,
    themeForDefault: '',
    exchangeRates: []
  },
  getters: {
    getUser: state => state.user,
    getUserMenus: state => state.userMenus,
    getAdminMenus: state => state.adminMenus,
    getUserTheme: state => state.theme,
    getUserStatus: state => state.loggedIn,
    getDefaultTheme: state => state.themeForDefault,
    getExchangeRates: state => state.exchangeRates,
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setUserTheme (state, theme) {
      state.theme = theme
    },
    setAdminMenus (state, admin_menus) {
      state.adminMenus = admin_menus
    },
    setUserMenus (state, user_menus) {
      state.userMenus = user_menus
    },
    setDefaultTheme (state, themeForDefault) {
      state.themeForDefault = themeForDefault
    },
    setExchangeRates (state, exchangeRates) {
      state.exchangeRates = exchangeRates
    },
    setUserStatus (state, loggedIn) {
      state.loggedIn = loggedIn
    },
    RESET_STATE(state) {
      // set the state properties to their initial values
      state.user = [null]
      state.adminMenus = []
      state.userMenus = []
      state.loggedIn = false
      state.theme = ''
    }
  },
  actions: {
    resetState(context) {
      context.commit('RESET_STATE');
    },
  },
  modules: {
  }
})
