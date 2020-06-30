// import GravitAPI from "gravit-api";
// import GravitAPI from "gravit-api";

export const state = () => ({
  sessionID: null
})

export const mutations = {
  setSessionID(state, sessionID) {
    state.sessionID = sessionID;
  },
  clearSessionID(state) {
    state.sessionID = null;
  }
}

export const actions = {
  nuxtServerInit({commit}) {
    const sessionID = this.$cookies.get('sessionID');
    if (sessionID) commit('setSessionID', sessionID);
  },
  login({commit}, data) {
    this.$api.sendRequest('auth', {
      login: data.login,
      password: {
        password: data.password,
        type: "plain"
      },
      auth_id: data.authMethod,
      getSession: true,
      authType: "API",
      initProxy: false
    }, (res) => {
      const sessionID = res.session;
      commit('setSessionID', sessionID);
      this.$cookies.set('sessionID', sessionID, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });
      this.$router.push('/cabinet');
      console.log(res);
    }, console.error);
  },
  logout({commit}) {
    commit('clearSessionID');
    this.$cookies.remove('sessionID');
    this.$router.push('/');
  }
}

export const getters = {
  hasAuth: s => !!s.sessionID,
}
