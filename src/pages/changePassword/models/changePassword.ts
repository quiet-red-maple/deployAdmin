import { changePassword } from '@/services/login';

export default {
  namespace: 'changePassword',
  state: {
    data: {

    },
  },

  reducers: {
    query(state: any, { payload: { data } }: any) {
      return { ...state, data };
    },
  },

  effects: {
    *fetch({ payload, callback }: any, { call, put }: any) {
      const response = yield call(changePassword, payload);
      yield put({
        type: 'query',
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