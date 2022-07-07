import { request } from 'umi';

const URL = {
  get: 'type',
  status: 'txStatus',
};

export async function depositRule(
  params: {
    current?: number;
    pageSize?: number;
    isDev?: string;
  },
  options?: Record<string, any>,
) {
  console.log("params in depositrule: ", params);
  let requestURL = '';
  if(params.isDev?.includes('PROD')){
    requestURL = `${PRO_REQUEST_URL}/?${URL.get}=DEPOSIT`;
  }else{
    requestURL = `${DEV_REQUEST_URL}/?${URL.get}=DEPOSIT`;
  }
  return request<API.DepositList>(requestURL, {
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
        if (val.transactionExpiryDt != undefined) {
          const tDate = new Date(val.transactionExpiryDt);
          tDate.setHours(tDate.getHours() - 9);
          val.transactionExpiryDt = tDate;
        }
        if (val.transactionRequestAt != undefined) {
          const tDate = new Date(val.transactionRequestAt);
          tDate.setHours(tDate.getHours() - 9);
          val.transactionRequestAt = tDate;
        }
        dataSource.push(val);
      });
      const keyValue = Object.keys(params).filter(
        (value) => value != 'current' && value != 'pageSize' && value != 'isDev' && params[value] != undefined,
      );

      if (keyValue.length > 0) {

        const newdata = dataSource.filter((item) => {
          let cnt = 0;
          keyValue.some((key) => {
            if (
              params[key] === '' ||
              (item[key] != null && item[key].toString().includes(params[key].toString()))
            ) {
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
    isDev?: string;
  },
  options?: Record<string, any>,
) {
  let requestURL = '';
  if(params.isDev?.includes('PROD')){
    requestURL = `${PRO_REQUEST_URL}/?${URL.get}=WITHDRAW`;
    const newdata = [{
      "isActive": true,
        "isDelete": false,
        "createdAt": "2022-06-27T04:21:16.645Z",
        "updatedAt": "2022-06-27T04:22:02.599Z",
        "uuid": "52113d81-79a0-4e02-bf9c-1d705e7159cf",
        "memberUid": "2JN3XzSSkveqjuCwxkeyZIwhLjO2",
        "depositCode": null,
        "depositTransactionType": "DEPOSIT",
        "depositRequestAmount": 111,
        "depositAmount": null,
        "transactionStatus": "DEPOSIT_REQUEST_CANCEL",
        "transactionRequestAt": "2022-06-21T07:18:19.773Z",
        "transactionExpiryDt": "2022-06-22T06:18:19.773Z",
        "transactionApproveAt": null,
        "depositAt": null,
        "fromAccountHolder": "방방방",
        "fromBankName": "신한은행",
        "fromBankAccountNumber": null,
        "toAccountHolder": "블링커스 주식회사",
        "toBankName": "신한은행",
        "toBankAccountNumber": "100-035-890450",
        "adminMemo": null,
        "description": null
    }];
    const result = {
      data: newdata,
      total: 1,
      success: true,
    };
    return result;
  }else{
    requestURL = `${DEV_REQUEST_URL}/?${URL.get}=WITHDRAW`;
  }
  console.log(requestURL);
  return request<API.DepositList>(requestURL, {
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
        if (val.transactionExpiryDt != undefined) {
          const tDate = new Date(val.transactionExpiryDt);
          tDate.setHours(tDate.getHours() - 9);
          val.transactionExpiryDt = tDate;
        }
        if (val.transactionRequestAt != undefined) {
          const tDate = new Date(val.transactionRequestAt);
          tDate.setHours(tDate.getHours() - 9);
          val.transactionRequestAt = tDate;
        }
        dataSource.push(val);
      });
      const keyValue = Object.keys(params).filter(
        (value) => value != 'current' && value != 'pageSize' && value != 'isDev' && params[value] != undefined,
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

export async function updateDepositRule(params: { uuid?: string; isDev?: string; }) {
  let requestURL = '';
  if(params.isDev?.includes('PROD')){
    requestURL = `${PRO_REQUEST_URL}/${params.uuid}?${URL.status}=DEPOSIT_REQUEST_COMPLETE`;
  }else{
    requestURL = `${DEV_REQUEST_URL}/${params.uuid}?${URL.status}=DEPOSIT_REQUEST_COMPLETE`
  }
  return request<API.DepositListItem>(
    requestURL,
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
