import { ChangeEvent, ReactElement, useState } from 'react';
import Button from 'src/components/base/Button';
// import Button from 'src/components/base/Button';
// import Input from 'src/components/base/Input';
import InputTitle from 'src/components/base/InputTitle';
import Title from 'src/components/base/Title';
import CategoryModal from 'src/components/Category/Modal';
import Product from 'src/components/Product';
import { ProductType } from 'src/types';

import styles from './style.module.scss';

function PresetInput(): ReactElement {
  const [presetName, setPresetName] = useState('');
  const [productArr, setProductArr] = useState<ProductType[]>([]);
  const [presetDescription, setPresetDescription] = useState('');
  const [isCategoryModalShow, setIsCategoryModalShow] = useState(false);
  const [presetCategoryList, setPresetCatergoryList] = useState<string[]>([]);

  const handleCategoryModalClose = () => {
    setIsCategoryModalShow(false);
  };
  const handleCategoryModalOpen = () => {
    setIsCategoryModalShow(true);
  };

  const handleClickCategory = () => {
    // 클릭해서 카테고리 안에 상품들 조회해서 보여줌.
    setProductArr([]);
  };

  const handleChangePresetName = (e: ChangeEvent) => {
    const { target } = e;
    setPresetName((target as HTMLInputElement).value);
  };

  const handleChangePresetDescript = (e: ChangeEvent) => {
    const { target } = e;
    setPresetDescription((target as HTMLInputElement).value);
  };

  const handleClickSave = () => {
    // 프리셋 세이브
  };

  return (
    <div className={styles.PresetCreate}>
      <div className={styles.PresetInfoSet}>
        <Title classname='BigTitle' text='모음집 만들기' />
        <hr style={{ margin: '0', marginBottom: '10px' }} />
        <InputTitle
          inputClassname='LongInput'
          title='모음집 이름'
          placeholder='모음집 이름을 입력해주세요'
          onChange={handleChangePresetName}
        />
        <InputTitle
          inputClassname='LongInput'
          title='설명'
          placeholder='만든 모음집을 설명해주세요. 설명은 300자로 제한됩니다.'
          inputMaxLen={300}
          onChange={handleChangePresetDescript}
        />
      </div>
      <div className={styles.SelectField}>
        <Title classname='BigTitle' text='카테고리 및 상품 선택' />
        <hr style={{ margin: '0', marginBottom: '10px' }} />
        <div className={styles.Select}>
          <div className={styles.SelectCategory}>
            <div onClick={handleCategoryModalOpen}>{'카테고리 선택 >'}</div>
            {presetCategoryList.map((categoryName) => {
              return (
                <div className={styles.CategoryBox} onClick={handleClickCategory}>
                  {categoryName}
                </div>
              );
            })}
          </div>
          <hr />
          <div className={styles.SelectItem}>
            {productArr.map((product) => (
              <Product product={product} />
            ))}
          </div>
        </div>
        <Button onClick={handleClickSave}>저장</Button>
      </div>
      {isCategoryModalShow && (
        <CategoryModal
          onClose={handleCategoryModalClose}
          presetCategoryList={presetCategoryList}
          setPresetCategoryList={setPresetCatergoryList}
        />
      )}
    </div>
  );
}

export default PresetInput;
