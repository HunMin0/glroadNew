export default function ({store, redirect, $auth, route}) {
  console.log('middleware admin');
  //console.log(store, redirect, $auth, route);

  if (!$auth.loggedIn) {//로그인 체크
    redirect('/auth/login');
  }

  if (!$auth.hasScope(store.getters['_CONST_'].USER_SCOPE_ADMIN)) {//관리자 체크
    redirect('/auth/login');
  }

  if (!route.fullPath.startsWith(`/${store.getters['_CONST_'].USER_SCOPE_ADMIN}`)) {//라우터 체크
    redirect(`/${store.getters['_CONST_'].USER_SCOPE_ADMIN}/dashbaord`);
  }

}
