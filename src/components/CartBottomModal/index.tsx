import { ReactElement } from 'react';
import Row from 'src/components/base/Row';
import Button from 'src/components/base/Button';

import styles from './style.module.scss';

interface props {
  totalPrice: number;
}

function CartBottomModal({ totalPrice }: props): ReactElement {
  return (
    <Row className={styles.Wrapper}>
      <Row className={styles.PriceWrapper}>
        <p>총 금액</p>
        <p className={styles.Price}>{totalPrice.toLocaleString()}</p>
        <p>원</p>
      </Row>
      <Row>
        <Button>구매</Button>
      </Row>
    </Row>
  );
}

export default CartBottomModal;
