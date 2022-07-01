// @ts-ignore

/* eslint-disable */
import { request } from 'umi';

const API_KEY = 'AIzaSyBKEGFkNyAkMjQaMxYfdVMeHJS33HYQv0Y';

export async function currentUser(body) {
  return request(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      ...body,
    },
  });
}

export async function login(body) {
  return request(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...body,
        returnSecureToken: true,
      },
    },
  );
}
