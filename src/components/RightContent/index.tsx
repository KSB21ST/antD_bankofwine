import { Space } from 'antd';
import React from 'react';
import { SelectLang, useModel } from 'umi';
import HeaderSearch from '../HeaderSearch';
import Avatar from './AvatarDropdown';
import DBChoice from './DBChoiceDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <div className="proTableSidebar">
      <Space className={className}>
        <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder="Subin Kim"
          defaultValue="Subin Kim"
          options={[
            { label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui' },
            {
              label: <a href="next.ant.design">Ant Design</a>,
              value: 'Ant Design',
            },
            {
              label: <a href="https://protable.ant.design/">Pro Table</a>,
              value: 'Pro Table',
            },
            {
              label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
              value: 'Pro Layout',
            },
          ]}
          onSearch={(value) => {
            console.log('input', value);
          }}
        />
        <Avatar />
        <DBChoice />
        <SelectLang className={styles.action} />
      </Space>
    </div>
  );
};
export default GlobalHeaderRight;
