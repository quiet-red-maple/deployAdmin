import { 
  getData,
  getCreaitAndLending,
  getLending,
  getUserCreaitAndLending,
  getFund,
  getProjectAll,
 } from '@/services/index';

 export default {
   namespace: 'index',
   state: {
    statisticData: {},
    creaitAndLending: {
      data: []
    },
    lending: {
      
    },
    userCreaitAndLending: {
      data: []
    },
    fund: [],
    projectAll: []
   },
   reducers: {
    changeStatistic(state: any, { payload: { data } }: any) {
      return { ...state, statisticData: data && data.body ? data.body : state.statisticData };
    },
    changeCreaitAndLending(state: any, { payload: { data } }: any) {
      return { ...state, creaitAndLending: data ? data.body : state.creaitAndLending };
    },
    changeLending(state: any, { payload: { data } }: any) {
      return { ...state, lending: data ? data.body : state.lending };
    },
    changeUserCreaitAndLending(state: any, { payload: { data } }: any) {
      return { ...state, userCreaitAndLending: data ? data.body : state.userCreaitAndLending };
    },
    changeFund(state: any, { payload: { data } }: any) {
      return { ...state, fund: data ? data.body : state.fund };
    },
    changeProjectAll(state: any, { payload: { data } }: any) {
      return { ...state, projectAll: data ? data.body : state.projectAll };
    },
  },
  effects: {
    *getStatistic({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getData, payload);
      console.log(666, response)
      yield put({
        type: 'changeStatistic',
        payload: {
          data: response,
        },
      });
      if (callback) callback(response);
    },
    *getCreaitAndLending({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getCreaitAndLending, payload);
      yield put({
        type: 'changeCreaitAndLending',
        payload: {
          data: response,
        },
      });
      if (callback) callback(response);
    },
    *getLending({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getLending, payload);
      yield put({
        type: 'changeLending',
        payload: {
          data: response,
        },
      });
      if (callback) callback(response);
    },
    *getUserCreaitAndLending({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getUserCreaitAndLending, payload);
      yield put({
        type: 'changeUserCreaitAndLending',
        payload: {
          data: response,
        },
      });
      if (callback) callback(response);
    },
    *getFund({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getFund, payload);
      yield put({
        type: 'changeFund',
        payload: {
          data: response,
        },
      });
      if (callback) callback(response);
    },
    *getProjectAll({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getProjectAll, payload);
      yield put({
        type: 'changeProjectAll',
        payload: {
          data: response,
        },
      });
      if (callback) callback(response);
    },
  },

  subscriptions: {
    
  }
 }