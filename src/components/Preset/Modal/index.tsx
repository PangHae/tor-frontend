import { ReactElement, useState, useEffect } from 'react';
import { BsHeartFill } from 'react-icons/bs';

import ProductCart from 'src/components/Product/Cart';
import Column from 'src/components/base/Column/index';
import Row from 'src/components/base/Row';
import Button from 'src/components/base/Button';

import { PresetType, ProductType } from 'src/types';

import { usePresetDispatch } from 'src/hooks/context/cartContext';

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

  const presetDispatch = usePresetDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [productList, setProductList] = useState<ProductType[]>([]);
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
      setProductList(
        productData.content.map((product: ProductType) => {
          return { ...product, checked: true, count: 1 };
        }),
      );
      setLoading(true);
    }
  }, [productData]);

  const getTotalPrice = () =>
    productList.reduce((prev, curr) => prev + (curr.checked ? curr.price * curr.count : 0), 0);

  const handleTotalPriceAdd = (productID: number) => {
    setProductList(
      productList.map((product) => {
        if (product.productId === productID) {
          product.count += 1;
          setTotalPrice(getTotalPrice());
        }
        return product;
      }),
    );
  };

  const handleTotalPriceSub = (productID: number) => {
    setProductList(
      productList.map((product) => {
        if (product.productId === productID) {
          product.count -= 1;
          setTotalPrice(getTotalPrice());
        }
        return product;
      }),
    );
  };

  const handleProductCheck = (productId: number, checked: boolean) => {
    setProductList(
      productList.map((product) => {
        if (product.productId === productId) {
          product.checked = checked;
          setTotalPrice(getTotalPrice());
        }
        return { ...product };
      }),
    );
  };

  const handleAddCart = () => {
    const productListToCart = productList.filter((product) => product.checked && product.count > 0);
    presetDispatch!({
      type: 'ADD',
      preset: { ...preset, checked: true, products: productListToCart },
    });
    // if ('cart' in cookie) {
    //   productListToCart.push(JSON.parse(cookie.cart));
    //   destroyCookie(null, 'cart');
    // }
    onClose();
  };

  return (
    <>
      <div className={styles.Background} onClick={onClose} />
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
              {productList.map((product: ProductType) => (
                <ProductCart
                  key={product.productId}
                  funcBind={[handleTotalPriceAdd, handleTotalPriceSub]}
                  onProductCheck={handleProductCheck}
                  product={product}
                  isCheckBoxShow
                />
              ))}
            </div>
            <Row className={styles.TotalRow}>
              <Row className={styles.TotalCountWrapper}>
                <p>총</p>
                <p className={styles.ProductCount}>
                  {productList.filter((product) => product.checked && product.count > 0).length}
                </p>
                <p>개 상품</p>
              </Row>
              <p className={styles.ProductTotalPrice}>{` ${totalPrice} 원`}</p>
            </Row>
          </>
        )}
        <Row className={styles.ButtonWrapper}>
          <Button classname='CloseModalButton' onClick={onClose}>
            취소
          </Button>
          <Button classname='AddCartButton' onClick={handleAddCart}>
            전체 장바구니 담기
          </Button>
        </Row>
      </Column>
    </>
  );
}

export default PresetModal;
