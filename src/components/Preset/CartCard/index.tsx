/* eslint-disable no-unused-vars */
import { ReactElement, useState, FormEvent } from 'react';
import cx from 'classnames';

import Column from 'src/components/base/Column';
import ProductCart from 'src/components/Product/Cart';

import { PresetType, ProductType } from 'src/types';

import Row from 'src/components/base/Row';
import styles from './style.module.scss';

interface props {
  preset: PresetType;
  funcBind: [
    (presetId: number) => void,
    (presetId: number, productId: number, checked: boolean) => void,
    (presetId: number, productId: number) => void,
    (presetId: number, productId: number) => void,
  ];
}

function PresetCartCard({ preset, funcBind }: props): ReactElement {
  const [onPresetCheck, onProductCheck, onProductAdd, onProductSub] = funcBind;
  const [products, setProducts] = useState<ProductType[]>([...preset.products!]);
  // const [checked, setChecked] = useState(true);

  const handlePresetCheck = (e: FormEvent<HTMLInputElement>) => {
    onPresetCheck(preset.presetId);
    // setChecked(e.currentTarget.checked);
  };

  const handleProductCheck = (productId: number, checked: boolean) => {
    onProductCheck(preset.presetId, productId, checked!);
  };

  const handleProductAdd = (productId: number) => {
    onProductAdd(preset.presetId, productId);
  };

  const handleProductSub = (productId: number) => {
    onProductSub(preset.presetId, productId);
  };

  return (
    <Column className={styles.Wrapper}>
      <Row className={styles.TitleWrapper}>
        <input
          type='checkbox'
          checked={preset.checked}
          onChange={handlePresetCheck}
          className={styles.EntireCheckbox}
        />
        <p className={styles.Title}>{preset.presetName}</p>
      </Row>
      <div className={styles.Horizontal} />
      {preset.products!.map((product) => (
        <ProductCart
          product={product}
          presetChecked={preset.checked}
          funcBind={[handleProductAdd, handleProductSub]}
          onProductCheck={handleProductCheck}
          isCheckBoxShow
          key={product.productId}
        />
      ))}
    </Column>
  );
}

export default PresetCartCard;
