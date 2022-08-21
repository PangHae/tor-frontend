/* eslint-disable no-unused-vars */
import { FormEvent, ReactElement, useState } from 'react';
import Image from 'next/image';
import { GiRoundStar } from 'react-icons/gi';
import cx from 'classnames';

import Row from 'src/components/base/Row';
import Column from 'src/components/base/Column';
import Button from 'src/components/base/Button';

import { ProductType } from 'src/types';

import styles from '../style.module.scss';

interface props {
  product: ProductType;
  funcBind?: [(productID: number) => void, (productID: number) => void];
  cartFuncBind?: [(productID: number) => void, (productID: number) => void];
  isCheckBoxShow?: boolean;
}

function ProductCart({ product, funcBind, cartFuncBind, isCheckBoxShow }: props): ReactElement {
  const [onTotalPriceAdd, onTotalPriceSub] = funcBind || [
    (presetId: number) => {},
    (presetId: number) => {},
  ];
  const [handleProductChecked, handleProductUnchecked] = cartFuncBind || [
    (presetId: number) => {},
    (presetId: number) => {},
  ];
  const [price, setPrice] = useState(product.price);
  const [count, setCount] = useState(product.count);
  const handleAdd = () => {
    setPrice(price + product.price);
    setCount(count + 1);
    onTotalPriceAdd(product.productId);
  };
  const handleSub = () => {
    if (count > 0) {
      setPrice(price - product.price);
      setCount(count - 1);
      onTotalPriceSub(product.productId);
    }
  };

  const handleChecked = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      handleProductChecked(product.productId);
    } else {
      handleProductUnchecked(product.productId);
    }
  };

  return (
    <>
      {isCheckBoxShow && (
        <input type='checkbox' checked={product.checked} onChange={handleChecked} />
      )}
      <Row className={styles.Wrapper}>
        <Row className={styles.Flex3}>
          <Image src='/image/temp_preset.jpg' alt='product image' width={100} height={130} />
          <Column className={styles.DescriptionWrapper}>
            <Row className={styles.Title}>
              <p>[{product.company}]</p>
              <p>{product.productName}</p>
            </Row>
            <Row className={styles.Content}>
              <p>{product.weight}</p>
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
          <p>{count}</p>
          <Button classname='ModalProductButton' onClick={handleAdd}>
            +
          </Button>
        </Row>
        <Row className={styles.Flex1}>
          <p>{`${price.toLocaleString()}원`}</p>
        </Row>
      </Row>
    </>
  );
}

ProductCart.defaultProps = {
  isCheckBoxShow: false,
  funcBind: [(presetId: number) => {}, (presetId: number) => {}],
  cartFuncBind: [(presetId: number) => {}, (presetId: number) => {}],
};

export default ProductCart;
