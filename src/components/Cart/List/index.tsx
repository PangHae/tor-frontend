import { ReactElement, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import Button from 'src/components/base/Button';
import Column from 'src/components/base/Column';
import Row from 'src/components/base/Row';
import PresetCartCard from 'src/components/Preset/CartCard';
// import ShowItems from 'src/components/ShowItems';

import { PresetType, CartItemType } from 'src/types';

import useAxios from 'src/hooks/useAxios';

import { usePresetState, usePresetDispatch } from 'src/hooks/context/cartContext';
import { userState } from 'src/hooks/recoil/atoms/user';

import styles from './style.module.scss';

function CartList(): ReactElement {
  const [user] = useRecoilState(userState);
  const presetState = usePresetState();
  const presetReducer = usePresetDispatch();
  const { fetchData: buyPreset } = useAxios({
    method: 'post',
    url: '/api/preset/updatePurchaseHistory',
  });
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState(
    presetState.reduce((priceSum, preset) => {
      const presetTotalPrice = preset.products!.reduce((prev, product) => prev + product.price, 0);
      return priceSum + presetTotalPrice;
    }, 0),
  );
  const [presetList, setPresetList] = useState<PresetType[]>(presetState);
  const [done, setDone] = useState(false);
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

  useEffect(() => {
    if (done) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

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

  const handleBuy = () => {
    presetList.forEach((preset) => {
      const items: CartItemType = {};
      preset.products!.forEach((product) => {
        if (product.checked && product.count > 0) {
          items[product.productId.toString()] = product.count;
        }
      });
      const requestData = {
        userId: user.userId,
        presetId: preset.presetId,
        items,
      };
      buyPreset(requestData);
    });
    setDone(true);
    presetReducer!({ type: 'REMOVE', preset: presetList[0] });
  };

  return (
    <Column className={styles.Wrapper}>
      <p className={styles.Title}>????????????</p>
      {presetList.length ? (
        presetList.map((preset) => (
          <PresetCartCard
            key={preset.presetId}
            preset={preset}
            funcBind={[handlePresetCheck, handleProductCheck, handleProductAdd, handleProductSub]}
          />
        ))
      ) : (
        <p>??????????????? ????????? ????????????.</p>
      )}
      {/* <ShowItems tabTitle='??? ????????? ??????????????? ????????? ????????? >' />
      <ShowItems tabTitle='??? ???????????? ????????? ????????? >' /> */}
      <div className={styles.Horizontal} />
      {presetList.length ? (
        <>
          <Row className={styles.PriceWrapper}>
            <Row>
              <p>??? ??????</p>
              <p className={styles.Price}>{totalPrice.toLocaleString()}</p>
              <p>???</p>
            </Row>
            <Button onClick={handleBuy}>??????</Button>
          </Row>
          <div className={styles.TotalPrice}>
            <p className={styles.TotalQuantity}>
              {`??? ${presetList.reduce(
                (totalCount, currPreset) =>
                  totalCount +
                  currPreset.products!.reduce(
                    (prev, currProduct) => prev + (currProduct.checked ? currProduct.count : 0),
                    0,
                  ),
                0,
              )}
              ??? ??????`}
            </p>
            <p className={styles.TotalPriceDetail}>{totalPrice.toLocaleString()}???</p>
            <Button onClick={handleBuy}>??????</Button>
          </div>
        </>
      ) : null}
    </Column>
  );
}

export default CartList;
