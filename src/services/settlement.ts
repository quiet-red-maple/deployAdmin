// import request from '@/utils/request';
import { request, exportsFile } from '@/utils/request';
import qs from 'qs';
import { API } from './api';

export async function changeUnsettledList (value: any) {
  const params = qs.stringify(value)
  return request(`/${API}/settlement/settle-bill/unsettled/list?${params}`, {});
}

export async function changeDetailList (value: any) {
  const params = qs.stringify(value)
  return request(`/${API}/settlement/settle-bill/detail?${params}`, {});
}

export async function unsettledExport (value: any) {
  const params = qs.stringify(value)
  return exportsFile(`/${API}/biz/home/export-data-statistics-list?${params}`, {
    name: value.name
  });
}

export async function changePayList (value: any) {
  const params = qs.stringify(value)
  return request(`/${API}/settlement/settle-bill/pay/list?${params}`, {});
}

export async function changePutOutList (value: any) {
  const params = qs.stringify(value)
  return request(`/${API}/settlement/settle-bill/putout/list?${params}`, {});
}

export async function changeStatusList (value: any) {
  const params = qs.stringify(value)
  return request(`/${API}/settlement/settle-bill/status/list?${params}`, {});
}

export async function changeSubscriberList (value: any) {
  const params = qs.stringify(value)
  return request(`/${API}/settlement/settle-bill/subscriber/list?${params}`, {});
}

export async function changeActModel (value: any) {
  const params = qs.stringify(value)
  return request(`/${API}/settlement/settle-flowbus/query/actModel?${params}`, {});
}

export async function changeInfoList (value: any) {
  const params: any = qs.stringify(value)
  const { id } = value;
  return request(`/${API}/settlement/settle-bill/info/${id}?${params}`, {});
}

export async function changelaunchApply (value: any) {
  return request(`/${API}/settlement/settle-flowbus/apply`, {
    method: 'POST',
    body: value,
  });
}

export async function changeItemList (value: any) {
  const params = qs.stringify(value)
  return request(`/${API}/settlement/settle-bill/item?${params}`, {});
}

export async function changeReceiveRevert (value: any) {
  return request(`/${API}/settlement/settle-flowbus/receive/revert`, {
    method: 'POST',
    body: value,
  });
}

export async function changeReceiveSuccess (value: any) {
  return request(`/${API}/settlement/settle-flowbus/receive/success`, {
    method: 'POST',
    body: value,
  });
}

export async function changePayFail (value: any) {
  return request(`/${API}/settlement/settle-flowbus/pay/fail`, {
    method: 'POST',
    body: value,
  });
}

export async function changePaySuccess (value: any) {
  console.log(value)
  return request(`/${API}/settlement/settle-flowbus/pay/success`, {
    method: 'POST',
    body: value,
  });
}
