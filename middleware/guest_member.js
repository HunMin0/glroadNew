export default function ({store, redirect, $auth, route}) {
  console.log('middleware guest member');
  //console.log(store, redirect, $auth, route);
  /*if ($auth.user.scope === store.getters['_CONST_'].USER_SCOPE_FORWARDING) {
    redirect(`/${store.getters['_CONST_'].USER_SCOPE_FORWARDING}/dashboard`)
  }
  if ($auth.user.scope !== store.getters['_CONST_'].USER_SCOPE_MEMBER
    && !route.fullPath.startsWith('/' + $auth.user.scope)) {
    redirect('/auth/login')
  }*/

  /*if ($auth.loggedIn && $auth.hasScope(store.getters['_CONST_'].USER_SCOPE_MEMBER)) {
    if (route.fullPath.startsWith(`/${store.getters['_CONST_'].USER_SCOPE_FORWARDING}`)
      || route.fullPath.startsWith(`/${store.getters['_CONST_'].USER_SCOPE_ADMIN}`)) {
      redirect('/auth/login')
    }
  }*/
  /**
   * 로그인을 안했거나
   * 로그인을 했으면 user scope가 member이고
   *   router fullpath가 forwarding 또는 admin으로 시작하지 하면 안됨
   */

  if ($auth.loggedIn) {//로그인 했으면
    if (!$auth.hasScope(store.getters['_CONST_'].USER_SCOPE_MEMBER)) {//회원 체크
      redirect('/auth/login');
    }
  }

}
