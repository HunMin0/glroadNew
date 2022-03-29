export const state = () => ({
  message: '', color: '', timeout: -1, vertical: '', action: false, href: ''
})

export const mutations = {
  SHOW_MESSAGE(state, payload) {
    state.message = payload.message;
    state.color = payload.color;
    state.timeout = payload.timeout;
    state.vertical = payload.vertical;
    state.action = payload.action;
    state.href = payload.href;
  }
}

export const actions = {
  showSnackbar({commit}, payload) {
    commit("SHOW_MESSAGE", payload);
  }
}
