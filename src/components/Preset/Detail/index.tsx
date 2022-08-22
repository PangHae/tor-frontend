import React, { useEffect, useState } from 'react';
import ProductType from 'src/types/product';
import Image from 'next/image';
import cx from 'classnames';
import ProductCart from 'src/components/Product/Cart';
import Input from 'src/components/base/Input';
// import ShowItems from 'src/components/ShowItems';
import Button from 'src/components/base/Button';
import { PresetType } from 'src/types';
import { IoCartSharp } from 'react-icons/io5';

import styles from './presetDetail.module.scss';

interface Props {
  products: ProductType[];
  presetInfo: PresetType;
}

function PresetDetail({ products, presetInfo }: Props): React.ReactElement {
  const [totalChecked, setTotalChecked] = useState(true);
  const [totalPrice, setTotalPrice] = useState(1);
  const [productList, setProductList] = useState<ProductType[]>(products);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const initPrice = products.reduce((priceSum, product) => priceSum + product.price, 0);
    setTotalPrice(initPrice);
    setProductList(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (productList) {
      let addTotalPrice = 0;
      let addProductCount = 0;
      // eslint-disable-next-line array-callback-return
      productList.map((product) => {
        if (product.checked) {
          addTotalPrice += product.price * product.count;
          addProductCount += product.count;
        }
      });
      setTotalPrice(addTotalPrice);
      setProductCount(addProductCount);
    }
  }, [productList, totalChecked]);

  const handleOnClickTotalCheck = () => {
    if (totalChecked) {
      setProductList(
        productList.map((product) => {
          product.checked = false;
          return product;
        }),
      );
    } else {
      setProductList(
        productList.map((product) => {
          product.checked = true;
          return product;
        }),
      );
    }
    setTotalChecked(!totalChecked);
  };

  const handleOnClickCheck = (index: number) => {
    const tmpProductList = [...productList];
    if (tmpProductList[index].checked) {
      tmpProductList[index].checked = false;
    } else {
      tmpProductList[index].checked = true;
    }
    setProductList(tmpProductList);
  };

  const handleOnClickAdd = (productId: number) => {
    setProductList(
      productList.map((product) => {
        if (product.productId === productId) {
          product.count += 1;
        }
        return product;
      }),
    );
  };

  const handleOnClickSub = (productId: number) => {
    setProductList(
      productList.map((product) => {
        if (product.productId === productId) {
          product.count -= 1;
        }
        return product;
      }),
    );
  };

  return (
    <>
      <div className={styles.PresetDetail}>
        <div className={styles.PresetInfo}>
          <Image src='/image/temp_preset.jpg' alt='product image' width={240} height={300} />
          <div className={styles.PresetDescript}>
            <p className={styles.CategoryName}>#{presetInfo.categoryName}</p>
            <p className={styles.Producer}>{presetInfo.producer} 님의</p>
            <p className={styles.PresetName}>{presetInfo.presetName}</p>
            <p className={styles.PresetContent}>
              {presetInfo.presetContent || '상품 설명이 존재하지 않습니다'}
            </p>
            <div className={styles.PresetRecommend}>
              <IoCartSharp size='15' color='#000' />
              <p>{presetInfo.recommend}</p>
            </div>
          </div>
        </div>
        <hr style={{ margin: '0', marginBottom: '10px' }} />
        <div className={styles.PresetProducts}>
          <div className={styles.TableHeader}>
            <Input
              classname='CheckBox'
              type='checkbox'
              checked={totalChecked}
              onClick={handleOnClickTotalCheck}
            />
            <div className={styles.TableText}>
              <p className={cx(styles.TableProductName, styles.Flex3)}>상품</p>
              <p className={cx(styles.TableQuantity, styles.Flex1)}>수량</p>
              <p className={cx(styles.TablePrice, styles.Flex1)}>가격</p>
            </div>
          </div>
          {productList &&
            productList.map((product, index) => {
              return (
                <div className={styles.ProductCheck}>
                  <Input
                    classname='CheckBox'
                    type='checkbox'
                    checked={product.checked}
                    onClick={() => handleOnClickCheck(index)}
                  />
                  <ProductCart
                    key={product.productId}
                    product={product}
                    funcBind={[handleOnClickAdd, handleOnClickSub]}
                  />
                </div>
              );
            })}
          <hr style={{ margin: '0', marginBottom: '10px' }} />
          {/* <ShowItems tabTitle='이 모음집 구매자들이 구매한 모음집 >' presetRanking={[]} />
          <ShowItems tabTitle='이 모음집과 비슷한 모음집 >' presetRanking={[]} /> */}
        </div>
      </div>
      <div className={styles.TotalPrice}>
        <p className={styles.TotalQuantity}>총 {productCount}개 상품</p>
        <p className={styles.TotalPriceDetail}>{totalPrice}원</p>
        <Button>장바구니에 담기</Button>
      </div>
    </>
  );
}

export default PresetDetail;
