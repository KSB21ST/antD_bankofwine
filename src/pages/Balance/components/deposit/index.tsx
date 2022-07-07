import { removeRule } from '@/services/ant-design-pro/api';
import { depositRule, updateDepositRule } from '@/services/ant-design-pro/deposit';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { FooterToolbar, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import styles from './index.less';

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
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

const DepositList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.DepositListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.DepositListItem[]>([]);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const handleDepositRequest = async (record: any) => {
    const hide = message.loading('updating');
    try {
      await updateDepositRule({
        uuid: record.uuid.toString(),
        isDev: props.isDev,
      });
      hide();
      message.success('Update is successful');
      return true;
    } catch (error) {
      message.error('error in allowing Deposit request!');
      return false;
    }
  };

  const columns: ProColumns<API.DepositListItem>[] = [
    {
      title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status" />,
      dataIndex: 'transactionStatus',
      hideInForm: true,
      valueEnum: {
        DEPOSIT_REQUEST_COMPLETE: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.default" defaultMessage="Complete" />
          ),
          status: 'Processing',
        },
        DEPOSIT_REQUEST_PENDING: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="Pending" />
          ),
          status: 'Success',
        },
        DEPOSIT_REQUEST_CANCEL: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.online" defaultMessage="Cancelled" />
          ),
          status: 'Default',
        },
        3: {
          text: (
            <FormattedMessage
              id="pages.searchTable.nameStatus.abnormal"
              defaultMessage="abnormal"
            />
          ),
          status: 'Error',
        },
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.ruleName.nameLabel"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'uuid',
      tip: 'The rule name is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
            className={styles.content}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="신청인" />,
      dataIndex: 'depositCode',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleCallNo" defaultMessage="금액" />,
      dataIndex: 'depositRequestAmount',
      sorter: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleUpdatedAt" defaultMessage="신청일시" />,
      sorter: true,
      dataIndex: 'transactionRequestAt',
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
      title: <FormattedMessage id="pages.searchTable.titleFinishAt" defaultMessage="만료일시" />,
      sorter: true,
      dataIndex: 'transactionExpiryDt',
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
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="입금 확인" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) =>
        record.transactionStatus === 'DEPOSIT_REQUEST_PENDING' && [
          <a
            key="toBankName"
            onClick={() => {
              handleDepositRequest(record);
            }}
            className={styles.content}
          >
            <FormattedMessage id="pages.searchTable.config" defaultMessage="Configuration" />
          </a>,
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
        request={depositRule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        className={styles.protable}
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
                <FormattedMessage id="pages.searchTable.totalServiceCalls" defaultMessage="금액" />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.depositRequestAmount!, 0)}{' '}
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

export default DepositList;
