import { login, register } from '@/services/login';

export default {
  namespace: 'logins',
  state: {
    data: {

    },
    register: {}
  },

  reducers: {
    query(state: any, { payload: { data } }: any) {
      return { ...state, data };
    },
    registerData(state: any, { payload: { data } }: any) {
      return { ...state, register: data };
    },
  },

  effects: {
    *fetch({ payload, callback }: any, { call, put }: any) {
      const response = yield call(login, payload);
      yield put({
        type: 'query',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *setRegister({ payload, callback }: any, { call, put }: any) {
      const response = yield call(register, payload);
      yield put({
        type: 'register',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
  },

  subscriptions: {
    // setup({ dispatch, history }: any) {
    //   return history.listen(({ pathname, query }: any) => {
    //     if (pathname === '/users') {
    //       dispatch({ type: 'fetch', payload: query });
    //     }
    //   });
    // },
  },
};