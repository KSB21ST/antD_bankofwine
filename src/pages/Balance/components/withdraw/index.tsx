import { removeRule } from '@/services/ant-design-pro/api';
import {
  cancelWithdrawRule,
  updateWithdrawRule,
  withdrawRule,
} from '@/services/ant-design-pro/deposit';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { FooterToolbar, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';

const handleWithdrawRequest = async (record: any) => {
  const hide = message.loading('updating');
  try {
    await updateWithdrawRule({
      uuid: record.uuid.toString(),
    });
    hide();
    location.reload();
    message.success('Update is successful');
    return true;
  } catch (error) {
    message.error('error in allowing Deposit request!');
    return false;
  }
};

const handleCancelWithdrawRequest = async (record: any) => {
  const hide = message.loading('updating');
  try {
    await cancelWithdrawRule({
      uuid: record.uuid.toString(),
    });
    hide();
    location.reload();
    message.success('Update is successful');
    return true;
  } catch (error) {
    message.error('error in allowing Deposit request!');
    return false;
  }
};

const handleRemove = async (selectedRows: API.DepositListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const WithdrawList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.DepositListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.DepositListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.DepositListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.ruleName.nameLabel"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'uuid',
      tip: 'The uuid is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="신청인" />,
      dataIndex: 'toAccountHolder',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleCallNo" defaultMessage="금액" />,
      dataIndex: 'depositRequestAmount',
      sorter: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.account" defaultMessage="계좌번호" />,
      dataIndex: 'fromBankAccountNumber',
      sorter: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.bank" defaultMessage="은행" />,
      dataIndex: 'fromBankName',
      sorter: true,
      hideInForm: true,
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleUpdatedAt"
          defaultMessage="Last scheduled time"
        />
      ),
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return (
            <Input
              {...rest}
              placeholder={intl.formatMessage({
                id: 'pages.searchTable.exception',
                defaultMessage: 'Please enter the reason for the exception!',
              })}
            />
          );
        }
        return defaultRender(item);
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status" />,
      dataIndex: 'transactionStatus',
      hideInForm: true,
      valueEnum: {
        WITHDRAW_REQUEST_COMPLETE: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.default" defaultMessage="Complete" />
          ),
          status: 'Processing',
        },
        WITHDRAW_REQUEST_PENDING: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="Pending" />
          ),
          status: 'Success',
        },
        WITHDRAW_REQUEST_CANCEL: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.online" defaultMessage="Cancelled" />
          ),
          status: 'Default',
        },
        3: {
          text: (
            <FormattedMessage
              id="pages.searchTable.nameStatus.abnormal"
              defaultMessage="Abnormal"
            />
          ),
          status: 'Error',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption2" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        record.transactionStatus === 'WITHDRAW_REQUEST_PENDING' && (
          <a
            key="withdrawComplete"
            onClick={() => {
              handleWithdrawRequest(record);
            }}
          >
            <FormattedMessage id="pages.searchTable.withdrawConfig" defaultMessage="확인" />
          </a>
        ),
        record.transactionStatus === 'WITHDRAW_REQUEST_COMPLETE' && (
          <a
            key="withdrawCancel"
            onClick={() => {
              handleCancelWithdrawRequest(record);
            }}
          >
            <FormattedMessage id="pages.searchTable.WithdrawCancel" defaultMessage="취소" />
          </a>
        ),
      ],
    },
  ];

  return (
    <div>
      <ProTable<API.DepositListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={withdrawRule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.depositRequestAmount!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.uuid && (
          <ProDescriptions<API.DepositListItem>
            column={2}
            title={currentRow?.uuid}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.uuid,
            }}
            columns={columns as ProDescriptionsItemProps<API.DepositListItem>[]}
          />
        )}
      </Drawer>
    </div>
  );
};

export default WithdrawList;
