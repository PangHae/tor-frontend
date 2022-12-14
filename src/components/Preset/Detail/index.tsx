import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import cx from 'classnames';
import { IoCartSharp } from 'react-icons/io5';
import RedirectModal from 'src/components/RedirectModal';

import ProductCart from 'src/components/Product/Cart';
import Input from 'src/components/base/Input';
// import ShowItems from 'src/components/ShowItems';
import Button from 'src/components/base/Button';
import useAxios from 'src/hooks/useAxios';

import { PresetType } from 'src/types';

import { usePresetDispatch } from 'src/hooks/context/cartContext';
import { userState } from 'src/hooks/recoil/atoms/user';

import styles from './presetDetail.module.scss';

interface Props {
  originalPreset: PresetType;
}

function PresetDetail({ originalPreset }: Props): React.ReactElement {
  const [user] = useRecoilState(userState);
  // const router = useRouter();
  const presetDispatch = usePresetDispatch();
  const [preset, setPreset] = useState<PresetType>(originalPreset);
  const [openRedirectModal, setOpenRedirectModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(
    preset.products!.reduce((prev, curr) => prev + curr.price, 0),
  );
  const { fetchData: updateRecommend, res: updateRecommendRes } = useAxios({
    method: 'post',
    url: '/api/preset/updatePresetRecommend',
  });
  useEffect(() => {
    setTotalPrice(
      preset.products!.reduce(
        (prev, curr) => prev + (curr.checked ? curr.count * curr.price : 0),
        0,
      ),
    );
  }, [preset]);

  useEffect(() => {
    if (updateRecommendRes) {
      setPreset({ ...preset, recommend: updateRecommendRes.recommend });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateRecommendRes]);

  const handleTotalCheck = () => {
    setPreset({
      ...preset,
      checked: !preset.checked,
      products: preset.products!.map((product) => {
        return { ...product, checked: !preset.checked };
      }),
    });
  };

  const handleOnClickAdd = (productId: number) => {
    setPreset({
      ...preset,
      products: [...preset.products!].map((product) => {
        return product.productId === productId
          ? { ...product, count: product.count + 1 }
          : { ...product };
      }),
    });
  };

  const handleOnClickSub = (productId: number) => {
    setPreset({
      ...preset,
      products: [...preset.products!].map((product) => {
        return product.productId === productId
          ? { ...product, count: product.count - 1 }
          : { ...product };
      }),
    });
  };

  const handleProductCheck = (productId: number, checked: boolean) => {
    setPreset({
      ...preset,
      products: [...preset.products!].map((product) => {
        return product.productId === productId ? { ...product, checked } : { ...product };
      }),
    });
  };

  const handleAddCart = () => {
    presetDispatch!({
      type: 'ADD',
      preset: {
        ...preset,
        checked: true,
        products: [...preset.products!].filter((product) => product.checked && product.count > 0),
      },
    });
    setOpenRedirectModal(true);
  };

  const handleOnClickRecommend = () => {
    updateRecommend({
      userId: user.userId,
      presetId: preset.presetId,
    });
  };

  return (
    <>
      <div className={styles.PresetDetail}>
        <div className={styles.PresetInfo}>
          <Image
            src={`/image${preset.products![0].imagePath}`}
            alt='product image'
            width={240}
            height={300}
          />
          <div className={styles.PresetDescript}>
            <p className={styles.CategoryName}>#{preset.categoryName}</p>
            <p className={styles.Producer}>{preset.producer} ??????</p>
            <p className={styles.PresetName}>{preset.presetName}</p>
            <p className={styles.PresetContent}>
              {preset.presetContent || '?????? ????????? ???????????? ????????????'}
            </p>
            <div className={styles.PresetRecommend}>
              <IoCartSharp size='15' color='#000' />
              <p>{preset.recommend}</p>
              <Button classname='ReallySmallButton' onClick={handleOnClickRecommend}>
                ??????
              </Button>
            </div>
          </div>
        </div>
        <hr style={{ margin: '0', marginBottom: '10px' }} />
        <div className={styles.PresetProducts}>
          <div className={styles.TableHeader}>
            <Input
              classname='CheckBox'
              type='checkbox'
              checked={preset.checked}
              onClick={handleTotalCheck}
            />
            <div className={styles.TableText}>
              <p className={cx(styles.TableProductName, styles.Flex3)}>??????</p>
              <p className={cx(styles.TableQuantity, styles.Flex1)}>??????</p>
              <p className={cx(styles.TablePrice, styles.Flex1)}>??????</p>
            </div>
          </div>
          {preset.products!.map((product) => {
            return (
              <div className={styles.ProductCheck}>
                <ProductCart
                  key={product.productId}
                  product={product}
                  funcBind={[handleOnClickAdd, handleOnClickSub]}
                  onProductCheck={handleProductCheck}
                  isCheckBoxShow
                />
              </div>
            );
          })}
          <hr style={{ margin: '0', marginBottom: '10px' }} />
          {/* <ShowItems tabTitle='??? ????????? ??????????????? ????????? ????????? >' presetRanking={[]} />
          <ShowItems tabTitle='??? ???????????? ????????? ????????? >' presetRanking={[]} /> */}
        </div>
      </div>
      <div className={styles.TotalPrice}>
        <p className={styles.TotalQuantity}>??? {preset.products!.length}??? ??????</p>
        <p className={styles.TotalPriceDetail}>{totalPrice.toLocaleString()}???</p>
        <Button onClick={handleAddCart}>??????????????? ??????</Button>
      </div>
      {openRedirectModal && <RedirectModal onClose={setOpenRedirectModal} />}
    </>
  );
}

export default PresetDetail;
