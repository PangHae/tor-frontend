import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import Button from 'src/components/base/Button';
import Input from 'src/components/base/Input';
import CategoryList from 'src/components/Category/List';
import styles from './subMenu.module.scss';

interface Props {
  categoryList: string[];
}

function SubMenu({ categoryList }: Props): React.ReactElement {
  const [randCategory, setRandCategory] = useState<string[]>([]);
  const [clickedCategory, setClickedCategory] = useState('');

  useEffect(() => {
    // 카테고리 랜덤하게 출력하도록 변경해야함
    setRandCategory([categoryList[0], categoryList[1], categoryList[2], categoryList[3]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChangeCategory: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { target } = e;
    setClickedCategory((target as HTMLInputElement).value);
  };

  return (
    <>
      <div className={styles.SubMenu}>
        <Button value='내 모음집' style={{ margin: 'auto auto auto 10%' }}>
          <p>내 모음집</p>
        </Button>
        <div className={styles.SubSearch}>
          <Input
            classname='UnderBarInput'
            placeholder='카테고리를 입력해주세요.'
            value={clickedCategory}
            onChange={handleOnChangeCategory}
          />
          <Button classname='SubMenuImageButton'>
            <IoSearchSharp size='40' color='#000' />
          </Button>
        </div>
      </div>
      <CategoryList categoryList={randCategory} setCategory={setClickedCategory} />
    </>
  );
}

export default SubMenu;
