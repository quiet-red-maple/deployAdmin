// import request from '@/utils/request';
import { request, exportsFile } from '@/utils/request';
// import exportsFile from '@/utils/export';
import qs from 'qs';
import { EDI } from './api';


export async function getStatistics (value: any) {
  const params = qs.stringify(value)
  return request(`/${EDI}/asset/statistics?${params}`, {});
}

export async function getFundStatistics (value: any) {
  const params = qs.stringify(value)
  return request(`/${EDI}/fund/statistic?${params}`, {});
}

export async function getFundList (value: any) {
  return request(`/${EDI}/fund/list`, {
    method: 'POST',
    body: value
  });
}

export async function getFundDetailStatistics (value: any) {
  const params = qs.stringify(value)
  return request(`/${EDI}/fund/detail/statistics?${params}`, {});
}

export async function getApplication (value: any) {
  const params = qs.stringify(value)
  return request(`/${EDI}/asset/char/application?${params}`, {});
}

export async function getFundCharLending (value: any) {
  const params = qs.stringify(value)
  return request(`/${EDI}/fund/char/lending?${params}`, {});
}

export async function getOrderList (value: any) {
  return request(`/${EDI}/order/list`, {
    method: 'POST',
    body: value
  });
}

export async function getCorpbasicInfo (value: any) {
  const id = value.id;
  return request(`/${EDI}/corpbasic/info/${id}`, {});
}

export async function getMonthorderList (value: any) {
  return request(`/${EDI}/monthorder/list`, {
    method: 'POST',
    body: value
  });
}

export async function getCreditList (value: any) {
  return request(`/${EDI}/credit/list`, {
    method: 'POST',
    body: value
  });
}

export async function getLendingList (value: any) {
  return request(`/${EDI}/lending/list`, {
    method: 'POST',
    body: value
  });
}

export async function getRepayList (value: any) {
  return request(`/${EDI}/repay/list`, {
    method: 'POST',
    body: value
  });
}

export async function getOrderStatisticList (value: any) {
  return request(`/${EDI}/order/statistic`, {
    method: 'POST',
    body: value
  });
}

export async function getRepaymenplanList (value: any) {
  return request(`/${EDI}/repaymenplan/list`, {
    method: 'POST',
    body: value
  });
}

export async function getDetailClientList (value: any) {
  return request(`/${EDI}/asset/detail/clientList`, {
    method: 'POST',
    body: value
  });
}

export async function getAssetList (value: any) {
  return request(`/${EDI}/asset/list`, {
    method: 'POST',
    body: value
  });
}

export async function getAssetDetailStatistics (value: any) {
  const params = qs.stringify(value)
  return request(`/${EDI}/asset/detail/statistics?${params}`, {});
}

export async function getCorpbasicList (value: any) {
  return request(`/${EDI}/corpbasic/list`, {
    method: 'POST',
    body: value
  });
}

export async function getFundDetailClientList (value: any) {
  return request(`/${EDI}/fund/detail/clientList`, {
    method: 'POST',
    body: value
  });
}

export async function getProjectList (value: any) {
  return request(`/${EDI}/project/list`, {
    method: 'POST',
    body: value
  });
}

export async function getProjectClientList (value: any) {
  return request(`/${EDI}/project/clientList`, {
    method: 'POST',
    body: value
  });
}

export async function getCharApplication (value: any) {
  return request(`/${EDI}/project/char/application`, {});
}

export async function getCharLending (value: any) {
  return request(`/${EDI}/project/char/lending`, {});
}

export async function getCharmaxLending (value: any) {
  return request(`/${EDI}/project/char/maxLending`, {});
}

export async function getCharLoan (value: any) {
  return request(`/${EDI}/asset/char/loan`, {});
}

export async function getCharPassPercent (value: any) {
  return request(`/${EDI}/asset/char/passPercent`, {});
}

export async function getProjectDetailStatistics (value: any) {
  const params = qs.stringify(value)
  return request(`/${EDI}/project/detail/statistics?${params}`, {});
}

export async function getFundAll (value: any) {
  const params = qs.stringify(value)
  return request(`/${EDI}/fund/all?${params}`, {});
}

export async function corpbasicExport (value: any) {
  return exportsFile(`/${EDI}/corpbasic/export`, {
    method: 'POST',
    name: value.name,
    body: value
  });
}

export async function orderExport (value: any) {
  return exportsFile(`/${EDI}/order/export`, {
    method: 'POST',
    name: value.name,
    body: value
  });
}

export async function monthorderExport (value: any) {
  return exportsFile(`/${EDI}/monthorder/export`, {
    method: 'POST',
    name: value.name,
    body: value
  });
}

export async function creditExport (value: any) {
  return exportsFile(`/${EDI}/credit/export`, {
    method: 'POST',
    name: value.name,
    body: value
  });
}

export async function lendingExport (value: any) {
  return exportsFile(`/${EDI}/lending/export`, {
    method: 'POST',
    name: value.name,
    body: value
  });
}

export async function repayExport (value: any) {
  return exportsFile(`/${EDI}/repay/export`, {
    method: 'POST',
    name: value.name,
    body: value
  });
}

export async function orderStatisticExport (value: any) {
  return exportsFile(`/${EDI}/order/statistic/export`, {
    method: 'POST',
    name: value.name,
    body: value
  });
}
