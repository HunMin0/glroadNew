export const state = () => ({
  counter: 0,
  _CONST_: {
    /*USER_LEVEL_FORWARDING: 5,
    USER_LEVEL_MEMBER: 10,*/
    USER_SCOPE_MEMBER: 'member',
    USER_SCOPE_FORWARDING: 'forwarding',
    USER_SCOPE_ADMIN: 'admin',
    TRANSIT_TYPE_LCL_ID: 1,
    TRANSIT_TYPE_FCL_ID: 2,

    STATUS_ORDER_PLACED: 1,
    STATUS_ESTIMATE_ISSUANCE_ID: 2,
    STATUS_SIGNATURE_COMPLETED_ID: 3,
    STATUS_PAYMENT_COMPLETED_ID: 4,
    STATUS_WAREHOUSE_ARRIVAL_ID: 5,
    STATUS_TRANSPORT_DEPARTED_ID: 6,
    STATUS_TRANSPORT_COMPLETED_ID: 7,
    STATUS_PURCHASE_CONFIRMATION_ID: 8,
    STATUS_CANCEL_REQUEST_ID: 9,
    STATUS_CANCEL_DONE_ID: 10,

    PAYMENT_CONFIRM_STATUSES: [
      3,//STATUS_SIGNATURE_COMPLETED_ID
    ]
  },
  loadingSpinner: false,
});

export const getters = {
  _CONST_: state => {
    return state._CONST_;
  },
  loadingSpinner(state) {
    return state.loadingSpinner;
  }
}

export const mutations = {
  increment(state) {
    state.counter++;
  },
  loadingSpinner(state, p) {
    state.loadingSpinner = p;
  }
}
