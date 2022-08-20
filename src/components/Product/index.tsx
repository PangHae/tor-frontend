import { ReactElement, useState } from 'react';
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
  // eslint-disable-next-line no-unused-vars
  funcBind: [(productID: number) => void, (productID: number) => void];
}

function Product({ product, funcBind }: props): ReactElement {
  console.log(`product`);
  console.log(product);
  const [onTotalPriceAdd, onTotalPriceSub] = funcBind;
  const [price, setPrice] = useState(product.price);
  const [count, setCount] = useState(product.count);
  const handleAdd = () => {
    setPrice(price + product.price);
    setCount(count + 1);
    onTotalPriceAdd(product.productId);
  };
  const handleSub = () => {
    setPrice(price - product.price);
    setCount(count - 1);
    onTotalPriceSub(product.productId);
  };
  return (
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
  );
}

export default Product;
