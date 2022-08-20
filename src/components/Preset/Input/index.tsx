import { ReactElement, useState } from 'react';

import Button from 'src/components/base/Button';
import Row from 'src/components/base/Row';
import Column from 'src/components/base/Column';
import Input from 'src/components/base/Input';
import Product from 'src/components/Product';
import CategoryModal from 'src/components/Category/Modal/index';

import { ProductType } from 'src/types';

import styles from './style.module.scss';

const tempProductList: ProductType[] = [
  {
    productId: 1,
    productName: '갈비탕',
    category: 'korean',
    company: '사미헌',
    price: 12000,
    weight: '400g',
    score: 4.5,
    imagePath: 'hihi',
    checked: true,
    count: 1,
  },
  {
    productId: 2,
    productName: '깍둑이',
    category: 'korean',
    company: '사미헌',
    price: 7500,
    weight: '200g',
    score: 2.0,
    imagePath: 'hihi',
    checked: true,
    count: 1,
  },
  {
    productId: 3,
    productName: 'productname3',
    category: 'korean',
    company: '사미헌',
    price: 7500,
    weight: '200g',
    score: 2.0,
    imagePath: 'hihi',
    checked: true,
    count: 1,
  },
];

function PresetInput(): ReactElement {
  const [isCategoryModalShow, setIsCategoryModalShow] = useState(false);

  const handleCategoryModalClose = () => {
    setIsCategoryModalShow(false);
  };
  const handleCategoryModalOpen = () => {
    setIsCategoryModalShow(true);
  };

  return (
    <>
      <Column className={styles.wrapper}>
        <Row className={styles.InputWrapper}>
          <p className={styles.InputType}>Preset Title</p>
          <Input classname='PresetCreateInput' />
        </Row>
        <Row className={styles.InputWrapper}>
          <p className={styles.InputType}>Category</p>
          <Input classname='PresetCreateInput' isReadOnly />
          <Button classname='PresetCreateButton' onClick={handleCategoryModalOpen}>
            찾기
          </Button>
        </Row>
        <Row className={styles.InputWrapper}>
          <p className={styles.InputType}>Content</p>
          <textarea className={styles.ContentInput} />
        </Row>
        <Row className={styles.InputWrapper}>
          <p className={styles.InputType}>Product</p>
          <Input classname='PresetCreateInput' />
          <Button classname='PresetCreateButton'>추가</Button>
        </Row>
        <div className={styles.Row} />
        <div>
          {tempProductList.map((product) => (
            <Product key={product.productId} product={product} />
          ))}
        </div>
      </Column>
      {isCategoryModalShow && <CategoryModal onClose={handleCategoryModalClose} />}
    </>
  );
}

export default PresetInput;
