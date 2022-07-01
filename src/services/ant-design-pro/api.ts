// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

const requestURL =
  'https://bow-back-app-dev.n55jsrkd83734.ap-northeast-2.cs.amazonlightsail.com/api/admin/deposit';
const depositURL = '?type=DEPOSIT';
const withdrawURL = '?type=WITHDRAW';

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
// export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
//   return request<API.LoginResult>('/api/login/account', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule2', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function depositRule(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.DepositList>('/api/deposit', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

// export async function depositRule(
//   params: {
//     current?: number;
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<API.DepositList>(`${requestURL}/${depositURL}`, {
//     method: 'GET',
//     ...(options || {}),
//   })
//   .then((response) => {
//     console.log(response);
//     const temp = response.data;
//     console.log(temp);
//   })
// }

export async function withdrawRule(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.DepositList>('/api/withdraw', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(
  params: {
    uuid?: string;
  },
  options?: { [key: string]: string },
) {
  return request<API.DepositListItem>('/api/deposit', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
