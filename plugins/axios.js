export default function ({store, $axios, redirect, $auth}) {
  $axios.onRequest(config => {
    //console.log('request');
    store.commit('loadingSpinner', true);
  })

  $axios.onResponse(config => {
    console.log('response');
    store.commit('loadingSpinner', false);
  })

  $axios.onError(async error => {
    //console.log('error', error.response);
    store.commit('loadingSpinner', false);
    return Promise.reject(error);// error를 그대로 return
    //return Promise.resolve(false);// error의 오류 전파를 방지하기 위해 resolved promise를 반환
    /*nuxtError({ statusCode: error.response.status, message: error.message, });*/
    //console.log('error', error.response)
    /*if (error.response.status === 419 && error.response.data.message === 'CSRF token mismatch.') {
      await $auth.request($auth.getStrategy().options.endpoints.csrf, {maxRedirects: 0});
      return $axios.request(error.config);//같은 설정으로 재요청
      return Promise.resolve(false);
    } */
  })
}
