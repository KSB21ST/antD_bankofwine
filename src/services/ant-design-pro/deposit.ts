import { request } from 'umi';

const requestURL =
  'https://bow-back-app-dev.n55jsrkd83734.ap-northeast-2.cs.amazonlightsail.com/api/admin/deposit';
const URL = {
  get: 'type',
  status: 'txStatus',
};

export async function depositRule(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<API.DepositList>(`${requestURL}/?${URL.get}=DEPOSIT`, {
    method: 'GET',
    ...(options || {}),
  })
    .then((response) => {
      const dataSource: API.DepositListItem[] = [];
      const data = response.data;
      if (data == undefined) {
        return;
      }
      data.transactions.forEach((val: API.DepositListItem) => {
        dataSource.push(val);
      });
      const keyValue = Object.keys(params).filter(
        (value) => value != 'current' && value != 'pageSize' && params[value] != undefined,
      );
      if (keyValue.length > 0) {
        const newdata = dataSource.filter((item) => {
          let cnt = 0;
          keyValue.some((key) => {
            // console.log(item[key].toString())
            if (params[key] === '' || params[key] === item[key].toString()) {
              cnt += 1;
            }
          });
          return cnt === keyValue.length;
        });
        const result = {
          data: newdata,
          total: newdata.length,
          success: true,
        };
        return result;
      }

      const result = {
        data: dataSource,
        total: dataSource.length,
        success: true,
      };
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function withdrawRule(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<API.DepositList>(`${requestURL}/?${URL.get}=WITHDRAW`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
    .then((response) => {
      const dataSource: API.DepositListItem[] = [];
      const data = response.data;
      if (data == undefined) {
        return;
      }
      data.transactions.forEach((val: API.DepositListItem) => {
        dataSource.push(val);
      });
      const keyValue = Object.keys(params).filter(
        (value) => value != 'current' && value != 'pageSize' && params[value] != undefined,
      );
      if (keyValue.length > 0) {
        const newdata = dataSource.filter((item) => {
          let cnt = 0;
          keyValue.some((key) => {
            if (params[key] === '' || params[key] === item[key].toString()) {
              cnt += 1;
            }
          });
          return cnt === keyValue.length;
        });
        const result = {
          data: newdata,
          total: newdata.length,
          success: true,
        };
        return result;
      }

      const result = {
        data: dataSource,
        total: dataSource.length,
        success: true,
      };
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function updateDepositRule(params: { uuid?: string }) {
  console.log(params.uuid);
  return request<API.DepositListItem>(
    `${requestURL}/${params.uuid}?${URL.status}=DEPOSIT_REQUEST_COMPLETE`,
    {
      method: 'PATCH',
    },
  )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      return;
    });
}

export async function updateWithdrawRule(params: { uuid?: string }) {
  console.log(params.uuid);
  return request<API.DepositListItem>(
    `${requestURL}/${params.uuid}?${URL.status}=WITHDRAW_REQUEST_COMPLETE`,
    {
      method: 'PATCH',
    },
  )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      return;
    });
}

export async function cancelWithdrawRule(params: { uuid?: string }) {
  console.log(params.uuid);
  return request<API.DepositListItem>(
    `${requestURL}/${params.uuid}?${URL.status}=WITHDRAW_REQUEST_CANCEL`,
    {
      method: 'PATCH',
    },
  )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      return;
    });
}
