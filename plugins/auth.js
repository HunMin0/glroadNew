export default function({store, $auth }) {
  $auth.onRedirect((to, from) => {
    //console.error(to)
    // you can optionally change `to` by returning a new value

    //console.error($auth.user, store, store.getters)
    //console.log($auth.loggedIn, $auth.hasScope(store.getters['_CONST_'].USER_SCOPE_FORWARDING));
    if ($auth.loggedIn && $auth.hasScope(store.getters['_CONST_'].USER_SCOPE_FORWARDING)) {
      return '/forwarding/dashboard'
    }
    if ($auth.loggedIn && $auth.hasScope(store.getters['_CONST_'].USER_SCOPE_ADMIN)) {
      return '/admin/dashboard'
    }
  })
}
