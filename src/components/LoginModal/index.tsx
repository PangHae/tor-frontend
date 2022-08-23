import { ChangeEventHandler, ReactElement, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import cx from 'classnames';

import Column from 'src/components/base/Column';
import Input from 'src/components/base/Input';
import Button from 'src/components/base/Button';

import useAxios from 'src/hooks/useAxios';
import { userState } from 'src/hooks/recoil/atoms/user';

import styles from './style.module.scss';

function LoginModal(): ReactElement {
  const [, setUser] = useRecoilState(userState);
  const { fetchData: signUp, res: signUpRes } = useAxios({
    method: 'post',
    url: '/api/login/signUp',
  });
  const { fetchData: getLogin, res: loginRes } = useAxios({
    method: 'get',
    url: '/api/login/checkDuplicated',
  });
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (loginRes) {
      setUser(loginRes);
    }
    if (loginRes === '') {
      const requestData = {
        userName: userInput,
        userId: userInput,
        password: 'kurly',
        email: 'example@example.com',
      };
      signUp(requestData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginRes]);

  useEffect(() => {
    if (signUpRes) {
      setUser(signUpRes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signUpRes]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleLogin = () => {
    getLogin(`/${userInput}`);
  };

  return (
    <>
      <div className={styles.Background} />
      <Column className={cx(styles.Modal, styles.Center)}>
        <Input
          value={userInput}
          onChange={handleChange}
          placeholder='유저명을 입력하세요.'
          classname='UserInput'
        />
        <Button onClick={handleLogin}>제출</Button>
      </Column>
    </>
  );
}

export default LoginModal;
