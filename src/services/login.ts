import { request } from '@/utils/request';
import qs from 'qs';
import { API } from './api';

export async function login (value: any) {
  return request(`/${API}/sys/login`, {
    method: 'POST',
    body: value
  });
}

export async function changePassword (value: any) {
  return request('/api/users/changePassword', {
    method: 'POST',
    body: value
  });
}

export async function register (value: any) {
  return request('/api/users/register', {
    method: 'POST',
    body: value
  });
}

export async function queryUsers (value: any) {
  const params = qs.stringify(value)
  return request(`/api/users/user?${params}`, {});
}

export async function changeStatus (value: any) {
  return request('/api/users/status', {
    method: 'POST',
    body: value
  });
}

export async function update (value: any) {
  return request('/api/users/update', {
    method: 'POST',
    body: value
  });
}

export async function restUserPass (value: any) {
  return request('/api/users/restPassword', {
    method: 'POST',
    body: value
  });
}

export async function  roleList (value: any) {
  const params = qs.stringify(value)
  return request(`/api/users/role?${params}`, {});
}

export async function roleChangeStatus (value: any) {
  return request('/api/users/roleStatus', {
    method: 'POST',
    body: value
  });
}

export async function queryAllPer (value: any) {
  const params = qs.stringify(value)
  return request(`/api/users/allPer?${params}`, {});
}

export async function createRoles (value: any) {
  return request('/api/users/createRole', {
    method: 'POST',
    body: value
  });
}

export async function changeRolePers (value: any) {
  return request('/api/users/changeRolePer', {
    method: 'POST',
    body: value
  });
}

export async function queryUser (value: any) {
  const params = qs.stringify(value)
  return request(`/${API}/sys/user/info`, {});
}