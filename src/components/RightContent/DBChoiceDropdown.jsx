import { BarcodeOutlined, CodeSandboxOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { useModel } from 'umi';

const App = () => {
  const { db, changedbtoDEV, changedbtoPROD } = useModel('dbchoice', (ret) => ({
    db: ret.dbchoice,
    changedbtoDEV: ret.changeDBtoDEV,
    changedbtoPROD: ret.changeDBtoPROD,
  }));

  const menu = () => {
    return (
      <Menu
        items={[
          {
            key: '1',
            icon: <CodeSandboxOutlined />,
            label: (
              <a target="_blank" rel="noopener noreferrer" onClick={changedbtoDEV}>
                dev
              </a>
            ),
          },
          {
            key: '2',
            icon: <BarcodeOutlined />,
            label: (
              <a target="_blank" rel="noopener noreferrer" onClick={changedbtoPROD}>
                product
              </a>
            ),
          },
        ]}
      />
    );
  };

  return (
    <Dropdown overlay={menu}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {db}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default App;
