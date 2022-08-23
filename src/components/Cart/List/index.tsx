import { ReactElement, useState, useEffect } from 'react';

import Button from 'src/components/base/Button';
import Column from 'src/components/base/Column';
import Row from 'src/components/base/Row';
import CartBottomModal from 'src/components/CartBottomModal';
import PresetCartCard from 'src/components/Preset/CartCard';
// import ShowItems from 'src/components/ShowItems';

import { PresetType } from 'src/types';

import { usePresetState } from 'src/hooks/context/cartContext';

import styles from './style.module.scss';

function CartList(): ReactElement {
  const presetState = usePresetState();

  const [totalPrice, setTotalPrice] = useState(
    presetState.reduce((priceSum, preset) => {
      const presetTotalPrice = preset.products!.reduce((prev, product) => prev + product.price, 0);
      return priceSum + presetTotalPrice;
    }, 0),
  );
  const [presetList, setPresetList] = useState<PresetType[]>(presetState);

  useEffect(() => {
    setTotalPrice(
      [...presetList].reduce(
        (prev, curr) =>
          prev +
          curr.products!.reduce(
            (total, product) => total + (product.checked ? product.price * product.count : 0),
            0,
          ),
        0,
      ),
    );
  }, [presetList]);

  const handlePresetCheck = (presetId: number) => {
    setPresetList(
      [...presetList].map((preset) =>
        presetId === preset.presetId
          ? {
              ...preset,
              checked: !preset.checked,
              products: [...preset.products!].map((product) => {
                return { ...product, checked: !preset.checked };
              }),
            }
          : { ...preset },
      ),
    );
  };

  const handleProductCheck = (presetId: number, productId: number, checked: boolean) => {
    setPresetList(
      [...presetList].map((preset) =>
        presetId === preset.presetId
          ? {
              ...preset,
              checked,
              products: preset.products!.map((product) =>
                productId === product.productId
                  ? {
                      ...product,
                      checked,
                    }
                  : { ...product },
              ),
            }
          : { ...preset },
      ),
    );
  };

  const handleProductAdd = (presetId: number, productId: number) => {
    setPresetList(
      [...presetList].map((preset) => {
        if (presetId === preset.presetId) {
          return {
            ...preset,
            products: preset.products!.map((product) =>
              productId === product.productId
                ? {
                    ...product,
                    count: product.count + 1,
                  }
                : { ...product },
            ),
          };
        }
        return { ...preset };
      }),
    );
  };

  const handleProductSub = (presetId: number, productId: number) => {
    setPresetList(
      [...presetList].map((preset) => {
        if (presetId === preset.presetId) {
          return {
            ...preset,
            products: preset.products!.map((product) =>
              productId === product.productId
                ? {
                    ...product,
                    count: product.count - 1,
                  }
                : { ...product },
            ),
          };
        }
        return { ...preset };
      }),
    );
  };

  return (
    <Column className={styles.Wrapper}>
      <p className={styles.Title}>장바구니</p>
      {presetList.length ? (
        presetList.map((preset) => (
          <PresetCartCard
            key={preset.presetId}
            preset={preset}
            funcBind={[handlePresetCheck, handleProductCheck, handleProductAdd, handleProductSub]}
          />
        ))
      ) : (
        <p>장바구니에 상품이 없습니다.</p>
      )}
      {/* <ShowItems tabTitle='이 모음집 구매자들이 구매한 모음집 >' />
      <ShowItems tabTitle='이 모음집과 비슷한 모음집 >' /> */}
      <div className={styles.Horizontal} />
      {presetList.length ? (
        <>
          <Row className={styles.PriceWrapper}>
            <Row>
              <p>총 금액</p>
              <p className={styles.Price}>{totalPrice.toLocaleString()}</p>
              <p>원</p>
            </Row>
            <Button>구매</Button>
          </Row>
          <CartBottomModal totalPrice={totalPrice} />
        </>
      ) : null}
    </Column>
  );
}

export default CartList;
