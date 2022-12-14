/* eslint-disable no-unused-vars */
import { FormEvent, ReactElement, useState } from 'react';
import Image from 'next/image';
import { GiRoundStar } from 'react-icons/gi';

import Row from 'src/components/base/Row';
import Column from 'src/components/base/Column';

import { ProductType } from 'src/types';

import styles from './style.module.scss';

interface props {
  product: ProductType;
  funcBind?: [(productID: number) => void, (productID: number) => void];
  cartFuncBind?: [(productID: number) => void, (productID: number) => void];
  isCheckBoxShow?: boolean;
  onClick?: () => void;
}

function ProductPreset({
  product,
  funcBind,
  cartFuncBind,
  isCheckBoxShow,
  onClick,
}: props): ReactElement {
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
      <Row className={styles.Wrapper} onClick={onClick}>
        <Row className={styles.Flex3}>
          <Image src={`/image${product.imagePath}`} alt='product image' width={100} height={130} />
          <Column className={styles.DescriptionWrapper}>
            <Row className={styles.Title}>
              <p>[{product.company}]</p>
              <p>{product.productName}</p>
            </Row>
            <Row className={styles.Content}>
              {+product.weight > 0 && (
                <p>
                  {+product.weight / 1000 < 1
                    ? `${product.weight} g`
                    : `${+product.weight / 1000} kg`}
                </p>
              )}
              <p>{product.category}</p>
              <Row className={styles.ScoreWrapper}>
                <GiRoundStar color='#FFDC46' size={14} />
                <p>{product.score}</p>
              </Row>
            </Row>
          </Column>
        </Row>
        <Row className={styles.Flex1}>
          <p>{`${price.toLocaleString()}???`}</p>
        </Row>
      </Row>
    </>
  );
}

ProductPreset.defaultProps = {
  isCheckBoxShow: false,
  funcBind: [(presetId: number) => {}, (presetId: number) => {}],
  cartFuncBind: [(presetId: number) => {}, (presetId: number) => {}],
  onClick: () => {},
};

export default ProductPreset;
