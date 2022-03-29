export default function ({store, redirect, $auth, route}) {
  console.log('middleware authenticated')
  //console.log(store, redirect, $auth, route)
  if (!$auth.loggedIn) {
    redirect('/auth/login')
  }
}
