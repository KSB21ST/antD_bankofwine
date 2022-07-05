import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/login';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Alert, message } from 'antd';
import { useState } from 'react';
import { history, useModel } from 'umi';
import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = () => {
  const [userLoginState, setUserLoginState] = useState({});
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async (idToken) => {
    const userInfo = await initialState?.fetchUserInfo?.(idToken);

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const saveTokensInInitialState = async (idToken, refreshToken) => {
    await setInitialState((s) => ({ ...s, idToken: idToken, refreshToken: refreshToken }));
  };

  const saveTokenInLocalStorage = (key, value) => {
    window.localStorage.setItem(key, value);
  };

  const handleSubmit = async ({ email, password }) => {
    try {
      const { idToken, refreshToken } = await login({
        email,
        password,
      });

      if (idToken || refreshToken) {
        const defaultLoginSuccessMessage = 'Login successful!';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo(idToken); // set id token and refresh token

        await saveTokensInInitialState(idToken, refreshToken);
        saveTokenInLocalStorage('idToken', idToken);
        saveTokenInLocalStorage('refreshToken', refreshToken);
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query;
        history.push(redirect || '/balance');
        return;
      }

      console.log(msg); // 如果失败去设置用户错误信息

      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = 'Login failed, please try again!';
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="Bank Of Wine Admin"
          subTitle={'Bank Of Wine Admin Page'}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'Email'}
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'Password'}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            />
          </>
          <div
            style={{
              marginBottom: 24,
            }}
          />
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
