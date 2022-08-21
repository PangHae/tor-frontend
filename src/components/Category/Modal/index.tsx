import React, { ChangeEvent, ReactElement, SetStateAction, useState } from 'react';
import Button from 'src/components/base/Button';
import InputTitle from 'src/components/base/InputTitle';
import { IoSearchSharp } from 'react-icons/io5';
import Title from 'src/components/base/Title';

import styles from './style.module.scss';

interface props {
  presetCategoryList: string[];
  setPresetCategoryList: React.Dispatch<SetStateAction<string[]>>;
  onClose: () => void;
}

const categories = ['라면', '김치'];

function CategoryModal({
  presetCategoryList,
  setPresetCategoryList,
  onClose,
}: props): ReactElement {
  // category List를 미리 받아서 가지고 있다가 검색해서 있으면 보여주는 식!
  const [searchCategory, setSearchCategory] = useState('');
  const [buttonTag, setButtonTag] = useState('');

  const handleClickSearch = () => {
    if (categories.includes(searchCategory)) {
      setButtonTag(searchCategory);
    }
  };

  const handleOnChange = (e: ChangeEvent) => {
    const { target } = e;
    setSearchCategory((target as HTMLInputElement).value);
  };

  const handleOnClickAddCategory = (e: any) => {
    const { target } = e;
    setPresetCategoryList([...presetCategoryList, (target as HTMLButtonElement).innerHTML]);
  };

  return (
    <>
      <div className={styles.Background} onClick={onClose} />
      <div className={styles.Modal}>
        <Title classname='BigTitle' text='카테고리 검색' />
        <div className={styles.Search}>
          <InputTitle
            inputClassname='LongInput'
            title='검색'
            placeholder='검색할 카테고리를 입력해주세요'
            onChange={handleOnChange}
          />
          <Button classname='ImageButton' style={{ margin: 'auto 0' }} onClick={handleClickSearch}>
            <IoSearchSharp width={40} height={40} color='#000' />
          </Button>
        </div>
        {buttonTag && (
          <Button classname='CategoryButton' onClick={handleOnClickAddCategory}>
            {buttonTag}
          </Button>
        )}
      </div>
    </>
  );
}

export default CategoryModal;
