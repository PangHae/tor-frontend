/* eslint-disable no-unused-vars */
import { ReactElement, useState, FormEvent } from 'react';
import cx from 'classnames';

import Column from 'src/components/base/Column';
import Product from 'src/components/Product';

import { PresetType, ProductType } from 'src/types';

import Row from 'src/components/base/Row';
import styles from './style.module.scss';

interface props {
  originalPreset: PresetType;
  funcBind: [
    (presetId: number) => void,
    (presetId: number) => void,
    (price: number) => void,
    (price: number) => void,
  ];
}

function PresetCartCard({ originalPreset, funcBind }: props): ReactElement {
  const [handlePresetAdd, handlePresetRemove, handleTotalPriceAdd, handleTotalPriceSub] = funcBind;
  const [products, setProducts] = useState<ProductType[]>([...originalPreset.products!]);
  const [checked, setChecked] = useState(true);

  const handlePresetChange = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setChecked(true);
      handlePresetAdd(originalPreset.presetId);
    } else {
      setChecked(false);
      handlePresetRemove(originalPreset.presetId);
    }
  };

  const handleProductChange = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setChecked(true);
      handlePresetAdd(originalPreset.presetId);
    } else {
      setChecked(false);
      handlePresetRemove(originalPreset.presetId);
    }
  };

  const handleProductAdd = (productId: number) => {
    setProducts(
      [...products].map((product) => {
        if (productId === product.productId) {
          product.count += 1;
          handleTotalPriceAdd(product.price);
        }
        return product;
      }),
    );
  };
  const handleProductSub = (productId: number) => {
    setProducts(
      [...products].map((product) => {
        if (productId === product.productId) {
          product.count -= 1;
          handleTotalPriceSub(product.price);
        }
        return product;
      }),
    );
  };

  const handleProductChecked = (productId: number) => {
    setProducts(
      [...products].map((product) => {
        if (productId === product.productId) {
          product.checked = true;
          handleTotalPriceAdd(product.price * product.count);
        }
        return product;
      }),
    );
  };

  const handleProductUnchecked = (productId: number) => {
    setProducts(
      [...products].map((product) => {
        if (productId === product.productId) {
          product.checked = false;
          handleTotalPriceSub(product.price * product.count);
        }
        return product;
      }),
    );
  };

  return (
    <Column className={styles.Wrapper}>
      <Row className={styles.TitleWrapper}>
        <input
          type='checkbox'
          checked={checked}
          onChange={handlePresetChange}
          className={styles.EntireCheckbox}
        />
        <p className={styles.Title}>{originalPreset.presetName}</p>
      </Row>
      <div className={styles.Horizontal} />
      {products!.map((product) => (
        <Row
          className={cx(styles.ProductWrapper, !product.checked && styles.Checked)}
          key={product.productId}
        >
          <Product
            product={product}
            funcBind={[handleProductAdd, handleProductSub]}
            cartFuncBind={[handleProductChecked, handleProductUnchecked]}
            isCheckBoxShow
          />
        </Row>
      ))}
    </Column>
  );
}

export default PresetCartCard;
