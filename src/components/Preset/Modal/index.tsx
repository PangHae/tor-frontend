import { ReactElement, useState, useEffect } from 'react';
import { BsHeartFill } from 'react-icons/bs';

import ProductCart from 'src/components/Product/Cart';
import Column from 'src/components/base/Column/index';
import Row from 'src/components/base/Row';
import Button from 'src/components/base/Button';

import { PresetType, ProductType } from 'src/types';

import useAxios from 'src/hooks/useAxios';

import styles from './style.module.scss';

interface props {
  preset: PresetType;
  onClose: () => void;
}

function PresetModal({ preset, onClose }: props): ReactElement {
  const { fetchData: getProducts, res: productData } = useAxios({
    method: 'get',
    url: `/api/product/getProductList/`,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts(preset.presetName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (productData) {
      setTotalPrice(
        productData.content.reduce(
          (priceSum: number, product: ProductType) => priceSum + product.price,
          0,
        ),
      );
      setCartProducts(
        productData.content.map((product: ProductType) => {
          return { ...product };
        }),
      );
      setLoading(true);
    }
  }, [productData]);

  const handleTotalPriceAdd = (productID: number) => {
    console.log(cartProducts);
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
          console.log(totalPrice);
        }
        return product;
      }),
    );
  };

  const handleClose = () => {
    onClose();
    setCartProducts(preset.products!);
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
        {loading && (
          <>
            <div className={styles.ProductList}>
              {productData.content.map((product: ProductType) => (
                <ProductCart
                  key={product.productId}
                  funcBind={[handleTotalPriceAdd, handleTotalPriceSub]}
                  product={product}
                />
              ))}
            </div>
            <Row className={styles.TotalRow}>
              <Row className={styles.TotalCountWrapper}>
                <p>총</p>
                <p className={styles.ProductCount}>{productData.content.length}</p>
                <p>개 상품</p>
              </Row>
              <p className={styles.ProductTotalPrice}>{` ${totalPrice} 원`}</p>
            </Row>
          </>
        )}
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
