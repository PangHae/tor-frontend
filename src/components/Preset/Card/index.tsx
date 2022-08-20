import React from 'react';
import Button from 'src/components/base/Button';
import { IoCartSharp } from 'react-icons/io5';

import { PresetType } from 'src/types';

import styles from './product.module.scss';

interface CardProps {
  preset: PresetType;
  // eslint-disable-next-line no-unused-vars
  onClickCart: (preset: PresetType) => void;
}

function PresetCard({ preset, onClickCart }: CardProps): React.ReactElement {
  // url props 추가해서 Link 연결해야함.
  const handleClickCart = () => {
    onClickCart(preset);
  };
  return (
    <div className={styles.PresetCard}>
      <div className={styles.ImageField}>image</div>
      <p className={styles.Producer}>{preset.producer} 님의</p>
      <p className={styles.PresetName}>{preset.presetName}</p>
      <p className={styles.CategoryName}>{`#${preset.categoryName}`}</p>
      <p className={styles.BuyerNumber}>
        <IoCartSharp size='15' color='#000' />
        <span className={styles.Recommend}>{`${preset.recommend}명 추천`}</span>
      </p>
      <Button onClick={handleClickCart} classname='CartButton' value='장바구니'>
        <IoCartSharp size='28' color='#000' />
      </Button>
    </div>
  );
}

export default PresetCard;
