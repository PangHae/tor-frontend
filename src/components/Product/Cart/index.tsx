/* eslint-disable no-unused-vars */
import { FormEvent, ReactElement, useState } from 'react';
import Image from 'next/image';
import { GiRoundStar } from 'react-icons/gi';
import cx from 'classnames';

import Row from 'src/components/base/Row';
import Column from 'src/components/base/Column';
import Button from 'src/components/base/Button';

import { ProductType } from 'src/types';

import styles from './style.module.scss';

interface props {
  product: ProductType;
  presetChecked?: boolean;
  funcBind?: [(productID: number) => void, (productID: number) => void];
  onProductCheck?: (productID: number, checked: boolean) => void;
  isCheckBoxShow?: boolean;
}

function ProductCart({
  product,
  presetChecked,
  funcBind,
  onProductCheck,
  isCheckBoxShow,
}: props): ReactElement {
  const [onTotalPriceAdd, onTotalPriceSub] = funcBind || [
    (productID: number) => {},
    (productID: number) => {},
  ];

  // const [price, setPrice] = useState(product.price);
  // const [count, setCount] = useState(product.count);
  // const [checked, setChecked] = useState(true);
  const handleAdd = () => {
    // setPrice(price + product.price);
    // setCount(count + 1);
    onTotalPriceAdd(product.productId);
  };
  const handleSub = () => {
    if (product.count > 0) {
      // setPrice(price - product.price);
      // setCount(count - 1);
      onTotalPriceSub(product.productId);
    }
  };

  const handleChecked = () => {
    onProductCheck!(product.productId, !product.checked);
    // setChecked(!checked);
  };

  return (
    <Row
      className={cx(
        styles.Wrapper,
        !(product.checked && product.count > 0 && presetChecked) && styles.Checked,
      )}
    >
      {isCheckBoxShow && (
        <input type='checkbox' checked={product.checked} onChange={handleChecked} />
      )}
      <Row className={styles.Flex3}>
        <Image src='/image/temp_preset.jpg' alt='product image' width={100} height={130} />
        <Column className={styles.DescriptionWrapper}>
          <Row className={styles.Title}>
            <p>[{product.company}]</p>
            <p>{product.productName}</p>
          </Row>
          <Row className={styles.Content}>
            <p>
              {+product.weight / 1000 < 1 ? `${product.weight} g` : `${+product.weight / 1000} kg`}
            </p>
            <p>{product.category}</p>
            <Row className={styles.ScoreWrapper}>
              <GiRoundStar color='#FFDC46' size={14} />
              <p>{product.score}</p>
            </Row>
          </Row>
        </Column>
      </Row>
      <Row className={cx(styles.Flex1, styles.ButtonWrapper)}>
        <Button classname='ModalProductButton' onClick={handleSub}>
          -
        </Button>
        <p>{product.count}</p>
        <Button classname='ModalProductButton' onClick={handleAdd}>
          +
        </Button>
      </Row>
      <Row className={styles.Flex1}>
        <p>{`${product.price.toLocaleString()}원`}</p>
      </Row>
    </Row>
  );
}

ProductCart.defaultProps = {
  isCheckBoxShow: false,
  presetChecked: true,
  funcBind: [(productID: number) => {}, (productID: number) => {}],
  onProductCheck: (productID: number) => {},
};

export default ProductCart;
