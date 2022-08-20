import { ReactElement, useState } from 'react';
import { BsHeartFill } from 'react-icons/bs';

import Product from 'src/components/Product';
import Column from 'src/components/base/Column/index';
import Row from 'src/components/base/Row';
import Button from 'src/components/base/Button';

import { PresetType, ProductType } from 'src/types';

import styles from './style.module.scss';

interface props {
  preset: PresetType;
  onClose: () => void;
}

function PresetModal({ preset, onClose }: props): ReactElement {
  console.log(`preset`);
  console.log(preset);
  const [cartProducts, setCartProducts] = useState<ProductType[]>(
    preset.products!.map((product) => {
      return { ...product };
    }),
  );
  const [totalPrice, setTotalPrice] = useState(
    preset.products!.reduce((priceSum, product) => priceSum + product.price, 0),
  );

  const handleTotalPriceAdd = (productID: number) => {
    setCartProducts(
      cartProducts.map((product) => {
        if (product.productId === productID) {
          product.count += 1;
          setTotalPrice(totalPrice + product.price);
        }
        return product;
      }),
    );
  };

  const handleTotalPriceSub = (productID: number) => {
    setCartProducts(
      cartProducts.map((product) => {
        if (product.productId === productID) {
          product.count -= 1;
          setTotalPrice(totalPrice - product.price);
        }
        return product;
      }),
    );
  };

  const handleClose = () => {
    onClose();
    setCartProducts(preset.products!);
    console.log(preset.products!);
  };

  return (
    <>
      <div className={styles.Background} onClick={handleClose} />
      <Column className={styles.Modal}>
        <Column>
          <p className={styles.Producer}>{preset.producer} 님의</p>
          <p className={styles.PresetName}>{preset.presetName}</p>
          <Row>
            <p>{preset.categoryName}</p>
            <Row className={styles.RecommendWrapper}>
              <BsHeartFill color='#999' size={20} />
              <p>{preset.recommend}</p>
            </Row>
          </Row>
          <p>{preset.presetContent}</p>
        </Column>
        <div className={styles.ProductList}>
          {preset.products!.map((product) => (
            <Product
              key={product.productId}
              funcBind={[handleTotalPriceAdd, handleTotalPriceSub]}
              product={product}
            />
          ))}
        </div>
        <Row className={styles.TotalRow}>
          <Row className={styles.TotalCountWrapper}>
            <p>총</p>
            <p className={styles.ProductCount}>{preset.products!.length}</p>
            <p>개 상품</p>
          </Row>
          <p className={styles.ProductTotalPrice}>{` ${totalPrice} 원`}</p>
        </Row>
        <Row className={styles.ButtonWrapper}>
          <Button classname='CloseModalButton' onClick={handleClose}>
            취소
          </Button>
          <Button classname='AddCartButton'>전체 장바구니 담기</Button>
        </Row>
      </Column>
    </>
  );
}

export default PresetModal;
