import React from 'react';
import ProductType from 'src/types/product';
import Image from 'next/image';
import cx from 'classnames';
import Product from 'src/components/Product';
import Input from 'src/components/base/Input';
import ShowItems from 'src/components/ShowItems';
import Button from 'src/components/base/Button';

import styles from './presetDetail.module.scss';

interface Props {
  products: ProductType[];
}

function PresetDetail({ products }: Props): React.ReactElement {
  const preset = {
    presetId: 0,
    presetName: '야 너두 집밥 뚝딱',
    presetContent:
      '집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ',
    categoryName: 'category1',
    recommend: 24,
    producer: '응호애현',
  };

  return (
    <>
      <div className={styles.PresetDetail}>
        <div className={styles.PresetInfo}>
          <Image src='/image/temp_preset.jpg' alt='product image' width={240} height={300} />
          <div className={styles.PresetDescript}>
            <p className={styles.CategoryName}>#{preset.categoryName}</p>
            <p className={styles.Producer}>{preset.producer} 님의</p>
            <p className={styles.PresetName}>{preset.presetName}</p>
            <p className={styles.PresetContent}>{preset.presetContent}</p>
          </div>
        </div>
        <hr style={{ margin: '0', marginBottom: '10px' }} />
        <div className={styles.PresetProducts}>
          <div className={styles.TableHeader}>
            <Input classname='CheckBox' type='checkbox' />
            <div className={styles.TableText}>
              <p className={cx(styles.TableProductName, styles.Flex3)}>상품</p>
              <p className={cx(styles.TableQuantity, styles.Flex1)}>수량</p>
              <p className={cx(styles.TablePrice, styles.Flex1)}>가격</p>
            </div>
          </div>
          {products.map((product) => {
            return (
              <div className={styles.ProductCheck}>
                <Input classname='CheckBox' type='checkbox' />
                <Product product={product} />
              </div>
            );
          })}
          <hr style={{ margin: '0', marginBottom: '10px' }} />
          <ShowItems tabTitle='이 모음집 구매자들이 구매한 모음집 >' />
          <ShowItems tabTitle='이 모음집과 비슷한 모음집 >' />
        </div>
      </div>
      <div className={styles.TotalPrice}>
        <p className={styles.TotalQuantity}>총 10개 상품</p>
        <p className={styles.TotalPriceDetail}>113400원</p>
        <Button>장바구니에 담기</Button>
      </div>
    </>
  );
}

export default PresetDetail;
