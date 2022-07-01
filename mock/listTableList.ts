import axios from 'axios';
import { Request, Response } from 'express';
import moment from 'moment';
import { parse } from 'url';

const requestURL =
  'https://bow-back-app-dev.n55jsrkd83734.ap-northeast-2.cs.amazonlightsail.com/api/admin/deposit/';
const depositURL = '?type=DEPOSIT';
const withdrawURL = '?type=WITHDRAW';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: API.DepositListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      key: index,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      ][i % 2],
      name: `TradeCode ${index}`,
      owner: '曲丽丽',
      desc: 'whatever',
      callNo: Math.floor(Math.random() * 1000),
      status: Math.floor(Math.random() * 10) % 4,
      updatedAt: moment().format('YYYY-MM-DD'),
      finishedAt: moment().format('YYYY-MM-DD'),
      progress: Math.ceil(Math.random() * 100),
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRule(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    API.DepositListItem & {
      sorter: any;
      filter: any;
    };

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data?.name?.includes(params.name || ''));
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };
  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule: API.RuleListItem = {
          key: tableListDataSource.length,
          href: 'https://ant.design',
          avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          name,
          owner: '曲丽丽',
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 2,
          updatedAt: moment().format('YYYY-MM-DD'),
          createdAt: moment().format('YYYY-MM-DD'),
          progress: Math.ceil(Math.random() * 100),
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'update':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

async function getDepositRule(req: Request, res: Response, u: string) {
  console.log('Backend getDepositRule', req.url);
  axios
    .get(requestURL.concat(depositURL))
    .then((response) => {
      var dataSource: API.DepositListItem[] = [];
      response.data['data']['transactions'].forEach((val: API.DepositListItem) => {
        dataSource.push(val);
      });
      let realUrl = u;
      if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
        realUrl = req.url;
      }
      // const { current = 1, pageSize = 10 } = req.query;
      const params = parse(realUrl, true).query as unknown as API.PageParams &
        API.DepositListItem & {
          sorter: any;
          filter: any;
        };

      const keyValue = Object.keys(params).filter(
        (value) => value != 'current' && value != 'pageSize' && params[value] != undefined,
      );
      if (keyValue.length > 0) {
        // console.log(keyValue);
        // const newdata: API.DepositListItem[] = [];
        const newdata = dataSource.filter((item) => {
          var cnt = 0;
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
        return res.json(result);
      }
      const result = {
        data: dataSource,
        total: dataSource.length,
        success: true,
      };
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getWithdrawRule(req: Request, res: Response, u: string) {
  console.log('Backend getWithdrawRule', requestURL.concat(withdrawURL));
  axios
    .get(requestURL.concat(withdrawURL))
    .then((response) => {
      const dataSource: API.DepositListItem[] = [];
      response.data['data']['transactions'].forEach((val: API.DepositListItem) => {
        dataSource.push(val);
      });
      // console.log(dataSource);
      const result = {
        data: dataSource,
        total: response.data['data']['transactions'].length,
        success: true,
      };
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function postDepositRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const params = parse(realUrl, true).query;
  if (params['uuid'] === undefined) {
    return res.status(404);
  }
  const _uuid: string = params['uuid'].toString();
  const _url = requestURL.concat(_uuid).concat('?txStatus=DEPOSIT_REQUEST_COMPLETE');
  console.log('Backend updateRule ', _url);
  axios
    .patch(_url)
    .then((response) => {
      const dataSource: API.DepositListItem[] = [];
      response.data['data']['transactions'].forEach((val: API.DepositListItem) => {
        dataSource.push(val);
      });
      const result = {
        data: dataSource,
        total: response.data['data']['transactions'].length,
        success: true,
      };
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.status(404);
    });
  return res.status(404);
}

export default {
  'GET /api/rule2': getRule,
  'POST /api/rule': postRule,
  'GET /api/deposit': getDepositRule,
  'POST /api/deposit': postDepositRule,
  'GET /api/withdraw': getWithdrawRule,
};
