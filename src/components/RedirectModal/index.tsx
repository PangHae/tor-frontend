import React, { SetStateAction } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import Button from '../base/Button';
import Column from '../base/Column';

import styles from './redirectModal.module.scss';
import { Title } from '../base/Title';
import Row from '../base/Row';

interface Props {
  onClose: React.Dispatch<SetStateAction<boolean>>;
}

function RedirectModal({ onClose }: Props): React.ReactElement {
  const router = useRouter();

  const handleRedirectMain = () => {
    onClose(false);
    router.push('/');
  };

  const handleRedirectCart = () => {
    onClose(false);
    router.push('/cart');
  };

  return (
    <>
      <div className={styles.Background} />
      <Column className={cx(styles.Modal, styles.Center)}>
        <Title text='어디로 이동할까요?' />
        <Row className={styles.Buttons}>
          <Button onClick={handleRedirectMain}>메인으로 돌아가기</Button>
          <Button onClick={handleRedirectCart}>장바구니로 가기</Button>
        </Row>
      </Column>
    </>
  );
}

export default RedirectModal;
