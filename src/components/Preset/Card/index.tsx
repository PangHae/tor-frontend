import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoCartSharp } from 'react-icons/io5';

import Button from 'src/components/base/Button';
import { PresetType } from 'src/types';

import useAxios from 'src/hooks/useAxios';

import styles from './product.module.scss';

interface CardProps {
  preset: PresetType;
  // eslint-disable-next-line no-unused-vars
  onClickCart: (preset: PresetType) => void;
}

function PresetCard({ preset, onClickCart }: CardProps): React.ReactElement {
  const { fetchData: getProducts, res: productData } = useAxios({
    method: 'get',
    url: `/api/product/getProductList/`,
  });
  const [presetImagePath, setPresetImagePreset] = useState('');
  useEffect(() => {
    getProducts(preset.presetName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (productData !== null && productData.content.length > 0) {
      setPresetImagePreset(productData.content[0].imagePath);
    }
  }, [productData]);

  const handleClickCart = () => {
    onClickCart(preset);
  };
  return (
    <div className={styles.PresetCard}>
      <Link href={`/preset/${preset.presetName}`}>
        <a>
          {presetImagePath ? (
            <Image src={`/image${presetImagePath}`} width={160} height={160} />
          ) : (
            <div className={styles.ImageField}>image</div>
          )}
          <p className={styles.Producer}>{preset.producer} 님의</p>
          <p className={styles.PresetName}>{preset.presetName}</p>
          <p className={styles.CategoryName}>{`#${preset.categoryName}`}</p>
          <p className={styles.BuyerNumber}>
            <IoCartSharp size='15' color='#000' />
            <span className={styles.Recommend}>{`${preset.recommend}명 추천`}</span>
          </p>
        </a>
      </Link>
      <Button onClick={handleClickCart} classname='CartButton' value='장바구니'>
        <IoCartSharp size='28' color='#000' />
      </Button>
    </div>
  );
}

export default PresetCard;
