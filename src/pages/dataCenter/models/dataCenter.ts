import { 
  getStatistics,
  getFundStatistics,
  getFundList,
  getFundDetailStatistics,
  getApplication,
  getFundCharLending,
  getOrderList,
  getCorpbasicInfo,
  getMonthorderList,
  getCreditList,
  getLendingList,
  getRepayList,
  getOrderStatisticList,
  getRepaymenplanList,
  getDetailClientList,
  getAssetList,
  getAssetDetailStatistics,
  getCorpbasicList,
  getFundDetailClientList,
  getProjectList,
  getProjectClientList,
  getCharApplication,
  getCharLending,
  getCharmaxLending,
  getCharLoan,
  getCharPassPercent,
  getProjectDetailStatistics,
  getFundAll,
  corpbasicExport,
  orderExport,
  monthorderExport,
  creditExport,
  lendingExport,
  repayExport,
  orderStatisticExport,
 } from '@/services/datacenter';

 import { 
  getProjectAll,
 } from '@/services/index';

export default {
  namespace: 'dataCenter',
  state: {
    statistics: {},
    fundStatistics: {},
    fundList: {
      list: []
    },
    fundDetailStatistics: {},
    application: {
      data: []
    },
    fundCharLending: [],
    orderList: {
      list: []
    },
    corpbasicInfo: {},
    monthorderList: {
      list: []
    },
    creditList: {
      list: []
    },
    lendingList: {
      list: []
    },
    repayList: {
      list: []
    },
    orderStatisticList: {
      list: []
    },
    repaymenplanList: {
      list: []
    },
    detailClientList: {
      list: []
    },
    assetClientList: {
      list: []
    },
    assetList: {
      list: []
    },
    assetDetailStatistics: {},
    corpbasicList: {
      list: []
    },
    fundDetailClientList: {
      list: []
    },
    projectList: {
      list: []
    },
    projectClientList: {
      list: []
    },
    charApplication: {},
    charLending: {},
    charmaxLending: {},
    charLoan: {},
    charPassPercent: {},
    projectDetailStatistics: {},
    fundAll: [],
    projectAll: []
  },

  reducers: {
    changeStatistics(state: any, { payload: { data } }: any) {
      return { ...state, statistics: data && data.body ? data.body : state.statistics  };
    },
    changeFundStatistics(state: any, { payload: { data } }: any) {
      return { ...state, fundStatistics: data && data.body ? data.body : state.fundStatistics  };
    },
    changeFundList(state: any, { payload: { data } }: any) {
      return { ...state, fundList: data && data.body ? data.body : state.fundList  };
    },
    changeFundDetailStatistics(state: any, { payload: { data } }: any) {
      return { ...state, fundDetailStatistics: data && data.body ? data.body : state.fundDetailStatistics  };
    },
    changeApplication(state: any, { payload: { data } }: any) {
      return { ...state, application: data && data.body ? data.body : state.application  };
    },
    changeFundCharLending(state: any, { payload: { data } }: any) {
      return { ...state, fundCharLending: data && data.body ? data.body : state.fundCharLending  };
    },
    changeOrderList(state: any, { payload: { data } }: any) {
      return { ...state, orderList: data && data.body ? data.body : state.orderList  };
    },
    changeCorpbasicInfo(state: any, { payload: { data } }: any) {
      return { ...state, corpbasicInfo: data && data.body ? data.body : state.corpbasicInfo  };
    },
    changeMonthorderList(state: any, { payload: { data } }: any) {
      return { ...state, monthorderList: data && data.body ? data.body : state.monthorderList  };
    },
    changeCreditList(state: any, { payload: { data } }: any) {
      return { ...state, creditList: data && data.body ? data.body : state.creditList  };
    },
    changeLendingList(state: any, { payload: { data } }: any) {
      return { ...state, lendingList: data && data.body ? data.body : state.lendingList  };
    },
    changeRepayList(state: any, { payload: { data } }: any) {
      return { ...state, repayList: data && data.body ? data.body : state.repayList  };
    },
    changeOrderStatisticList(state: any, { payload: { data } }: any) {
      return { ...state, orderStatisticList: data && data.body ? data.body : state.orderStatisticList  };
    },
    changeRepaymenplanList(state: any, { payload: { data } }: any) {
      return { ...state, repaymenplanList: data && data.body ? data.body : state.repaymenplanList  };
    },
    changeDetailClientList(state: any, { payload: { data } }: any) {
      return { ...state, detailClientList: data && data.body ? data.body : state.detailClientList  };
    },
    changeAssetList(state: any, { payload: { data } }: any) {
      return { ...state, assetList: data && data.body ? data.body : state.assetList  };
    },
    changeAssetDetailStatistics(state: any, { payload: { data } }: any) {
      return { ...state, assetDetailStatistics: data && data.body ? data.body : state.assetDetailStatistics  };
    },
    changeCorpbasicList(state: any, { payload: { data } }: any) {
      return { ...state, corpbasicList: data && data.body ? data.body : state.corpbasicListt  };
    },
    changeFundDetailClientList(state: any, { payload: { data } }: any) {
      return { ...state, fundDetailClientList: data && data.body ? data.body : state.fundDetailClientList  };
    },
    changeProjectList(state: any, { payload: { data } }: any) {
      return { ...state, projectList: data && data.body ? data.body : state.projectList  };
    },
    changeProjectClientList(state: any, { payload: { data } }: any) {
      return { ...state, projectClientList: data && data.body ? data.body : state.projectClientList  };
    },
    changeCharApplication(state: any, { payload: { data } }: any) {
      return { ...state, charApplication: data && data.body ? data.body : state.charApplication  };
    },
    changeCharLending(state: any, { payload: { data } }: any) {
      return { ...state, charLending: data && data.body ? data.body : state.charLending  };
    },
    changeCharmaxLending(state: any, { payload: { data } }: any) {
      return { ...state, charmaxLending: data && data.body ? data.body : state.charmaxLending  };
    },
    changeCharLoan(state: any, { payload: { data } }: any) {
      return { ...state, charLoan: data && data.body ? data.body : state.charLoan  };
    },
    changeCharPassPercent(state: any, { payload: { data } }: any) {
      return { ...state, charPassPercent: data && data.body ? data.body : state.charPassPercent  };
    },
    changeProjectDetailStatistics(state: any, { payload: { data } }: any) {
      return { ...state, projectDetailStatistics: data && data.body ? data.body : state.projectDetailStatistics  };
    },
    changeFundAll(state: any, { payload: { data } }: any) {
      return { ...state, fundAll: data && data.body ? data.body : state.fundAll  };
    },
    changeProjectAll(state: any, { payload: { data } }: any) {
      return { ...state, projectAll: data ? data.body : state.projectAll };
    },
  },

  effects: {
    *getStatistics({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getStatistics, payload);
      yield put({
        type: 'changeStatistics',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getFundStatistics({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getFundStatistics, payload);
      yield put({
        type: 'changeFundStatistics',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getFundList({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getFundList, payload);
      yield put({
        type: 'changeFundList',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getFundDetailStatistics({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getFundDetailStatistics, payload);
      yield put({
        type: 'changeFundDetailStatistics',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getApplication({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getApplication, payload);
      yield put({
        type: 'changeApplication',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getFundCharLending({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getFundCharLending, payload);
      yield put({
        type: 'changeFundCharLending',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getOrderList({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getOrderList, payload);
      yield put({
        type: 'changeOrderList',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getCorpbasicInfo({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getCorpbasicInfo, payload);
      yield put({
        type: 'changeCorpbasicInfo',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getMonthorderList({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getMonthorderList, payload);
      yield put({
        type: 'changeMonthorderList',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getCreditList({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getCreditList, payload);
      yield put({
        type: 'changeCreditList',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getLendingList({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getLendingList, payload);
      yield put({
        type: 'changeLendingList',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getRepayList({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getRepayList, payload);
      yield put({
        type: 'changeRepayList',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getOrderStatisticList({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getOrderStatisticList, payload);
      yield put({
        type: 'changeOrderStatisticList',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getRepaymenplanList({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getRepaymenplanList, payload);
      yield put({
        type: 'changeRepaymenplanList',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getDetailClientList({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getDetailClientList, payload);
      yield put({
        type: 'changeDetailClientList',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getAssetList({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getAssetList, payload);
      yield put({
        type: 'changeAssetList',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getAssetDetailStatistics({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getAssetDetailStatistics, payload);
      yield put({
        type: 'changeAssetDetailStatistics',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getCorpbasicList({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getCorpbasicList, payload);
      yield put({
        type: 'changeCorpbasicList',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getFundDetailClientList({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getFundDetailClientList, payload);
      yield put({
        type: 'changeFundDetailClientList',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getProjectList({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getProjectList, payload);
      yield put({
        type: 'changeProjectList',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getProjectClientList({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getProjectClientList, payload);
      yield put({
        type: 'changeProjectClientList',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getCharApplication({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getCharApplication, payload);
      yield put({
        type: 'changeCharApplication',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getCharLending({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getCharLending, payload);
      yield put({
        type: 'changeCharLending',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getCharmaxLending({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getCharmaxLending, payload);
      yield put({
        type: 'changeCharmaxLending',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getCharLoan({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getCharLoan, payload);
      yield put({
        type: 'changeCharLoan',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getCharPassPercent({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getCharPassPercent, payload);
      yield put({
        type: 'changeCharPassPercent',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },
    *getProjectDetailStatistics({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getProjectDetailStatistics, payload);
      yield put({
        type: 'changeProjectDetailStatistics',
        payload: {
          data: response
        }
      });
      if (callback) callback(response);
    },

    *getFundAll({ payload, callback }: any, { call, put }: any) {
      const response = yield call(getFundAll, payload);
      yield put({
        type: 'changeFundAll',
        payload: {
          data: response
        }
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

    *corpbasicExport({payload, callback}: any, { call, put}: any) {
      yield call(corpbasicExport, payload);
    },

    *orderExport({payload, callback}: any, { call, put}: any) {
      yield call(orderExport, payload);
    },

    *monthorderExport({payload, callback}: any, { call, put}: any) {
      yield call(monthorderExport, payload);
    },

    *creditExport({payload, callback}: any, { call, put}: any) {
      yield call(creditExport, payload);
    },

    *lendingExport({payload, callback}: any, { call, put}: any) {
      yield call(lendingExport, payload);
    },

    *repayExport({payload, callback}: any, { call, put}: any) {
      yield call(repayExport, payload);
    },
    *orderStatisticExport({payload, callback}: any, { call, put}: any) {
      yield call(orderStatisticExport, payload);
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