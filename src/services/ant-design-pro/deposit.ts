import moment from 'moment';
import { request } from 'umi';

const URL = {
  get: 'type',
  status: 'txStatus',
};

export async function proDepositRule(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<API.DepositList>(`${PRO_REQUEST_URL}/?${URL.get}=DEPOSIT`, {
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
          const tDate = moment(val.transactionExpiryDt);
          val.transactionExpiryDt = tDate;
        }
        if (val.transactionRequestAt != undefined) {
          const tDate = moment(val.transactionRequestAt);
          val.transactionRequestAt = tDate;
        }
        dataSource.push(val);
      });
      const keyValue = Object.keys(params).filter(
        (value) =>
          value != 'current' &&
          value != 'pageSize' &&
          value != 'isDev' &&
          params[value] != undefined,
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

export async function devDepositRule(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<API.DepositList>(`${DEV_REQUEST_URL}/?${URL.get}=DEPOSIT`, {
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
          const tDate = moment(val.transactionExpiryDt);
          val.transactionExpiryDt = tDate;
        }
        if (val.transactionRequestAt != undefined) {
          const tDate = moment(val.transactionRequestAt);
          val.transactionRequestAt = tDate;
        }
        dataSource.push(val);
      });
      const keyValue = Object.keys(params).filter(
        (value) =>
          value != 'current' &&
          value != 'pageSize' &&
          value != 'isDev' &&
          params[value] != undefined,
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

export async function devWithdrawRule(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<API.DepositList>(`${DEV_REQUEST_URL}/?${URL.get}=WITHDRAW`, {
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
        (value) =>
          value != 'current' &&
          value != 'pageSize' &&
          value != 'isDev' &&
          params[value] != undefined,
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

export async function proWithdrawRule(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<API.DepositList>(`${PRO_REQUEST_URL}/?${URL.get}=WITHDRAW`, {
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
        (value) =>
          value != 'current' &&
          value != 'pageSize' &&
          value != 'isDev' &&
          params[value] != undefined,
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

export async function updateDepositRule(params: { uuid?: string; isDev?: string }) {
  let requestURL = '';
  if (params.isDev?.includes('PROD')) {
    requestURL = `${PRO_REQUEST_URL}/${params.uuid}?${URL.status}=DEPOSIT_REQUEST_COMPLETE`;
  } else {
    requestURL = `${DEV_REQUEST_URL}/${params.uuid}?${URL.status}=DEPOSIT_REQUEST_COMPLETE`;
  }
  return request<API.DepositListItem>(requestURL, {
    method: 'PATCH',
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      return;
    });
}

export async function updateWithdrawRule(params: { uuid?: string; isDev?: string }) {
  let requestURL = '';
  if (params.isDev?.includes('PROD')) {
    requestURL = `${PRO_REQUEST_URL}/${params.uuid}?${URL.status}=WITHDRAW_REQUEST_COMPLETE`;
  } else {
    requestURL = `${DEV_REQUEST_URL}/${params.uuid}?${URL.status}=WITHDRAW_REQUEST_COMPLETE`;
  }
  return request<API.DepositListItem>(requestURL, {
    method: 'PATCH',
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      return;
    });
}

export async function cancelWithdrawRule(params: { uuid?: string; isDev?: string }) {
  let requestURL = '';
  if (params.isDev?.includes('PROD')) {
    requestURL = `${PRO_REQUEST_URL}/${params.uuid}?${URL.status}=WITHDRAW_REQUEST_CANCEL`;
  } else {
    requestURL = `${DEV_REQUEST_URL}/${params.uuid}?${URL.status}=WITHDRAW_REQUEST_CANCEL`;
  }
  return request<API.DepositListItem>(requestURL, {
    method: 'PATCH',
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      return;
    });
}
