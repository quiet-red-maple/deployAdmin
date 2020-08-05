import { request } from '@/utils/request';
import qs from 'qs';
import { EDI } from './api';

export async function getData (value: any) {
  const params = qs.stringify(value)
  return request(`/${EDI}/index/statistic?${params}`, {});
}

export async function getCreaitAndLending (value: any) {
  const params = qs.stringify(value)
  return request(`/${EDI}/index/char/creaitAndLending?${params}`, {});
}

export async function getLending (value: any) {
  const params = qs.stringify(value)
  return request(`/${EDI}/index/char/lending?${params}`, {});
}

export async function getUserCreaitAndLending (value: any) {
  const params = qs.stringify(value)
  return request(`/${EDI}/index/char/user/creaitAndLending?${params}`, {});
}

export async function getFund (value: any) {
  const params = qs.stringify(value)
  return request(`/${EDI}/index/char/fund?${params}`, {});
}
export async function getProjectAll (value: any) {
  const params = qs.stringify(value)
  return request(`/${EDI}/project/all?${params}`, {});
}