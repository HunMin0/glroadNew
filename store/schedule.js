export const state = () => ({
  search: {
    transit_type_id: 0,
    pol: '',
    pod: '',
    departure_date: '',
    container: {},
    cbm: 0,
    kg: 0
  }
})

export const getters = {
  search: state => {
    return state.search;
  },
}

export const mutations = {
  setSearch(state, payload) {
    state.search.transit_type_id = payload.transit_type_id;
    state.search.pol             = payload.pol;
    state.search.pod             = payload.pod;
    state.search.departure_date  = payload.departure_date;
    state.search.container       = payload.container;
    state.search.cbm             = payload.cbm;
    state.search.kg              = payload.kg;
  }
}

export const actions = {
  setSearch({commit}, payload) {
    //console.log('payload', payload);
    commit("setSearch", payload);
  }
}
