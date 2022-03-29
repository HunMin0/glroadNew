import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    key: 'glroad',
    paths: ['schedule']
  })(store)
}
