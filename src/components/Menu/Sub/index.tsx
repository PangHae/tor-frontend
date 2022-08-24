import Link from 'next/link';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

import Button from 'src/components/base/Button';
import Input from 'src/components/base/Input';
import CategoryList from 'src/components/Category/List';
import useAxios from 'src/hooks/useAxios';

import styles from './subMenu.module.scss';

interface props {
  isInDetail?: boolean;
}

function SubMenu({ isInDetail }: props): React.ReactElement {
  const [randCategory, setRandCategory] = useState<string[]>([]);
  const [clickedCategory, setClickedCategory] = useState('');
  const { fetchData: getPresetCategories, res: getPresetCategoriesRes } = useAxios({
    method: 'get',
    url: '/api/category/getAllPresetCategories',
  });

  useEffect(() => {
    // 카테고리 랜덤하게 출력하도록 변경해야함
    getPresetCategories(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getPresetCategoriesRes) {
      setRandCategory(getPresetCategoriesRes.content.map((preCat: any) => preCat.categoryName));
    }
  }, [getPresetCategoriesRes]);

  const handleOnChangeCategory: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { target } = e;
    setClickedCategory((target as HTMLInputElement).value);
  };

  return (
    <>
      <div className={styles.SubMenu}>
        <Link href='/preset/create'>
          <Button value='내 모음집' style={{ margin: 'auto auto auto 10%' }}>
            <p>모음집 만들기</p>
          </Button>
        </Link>
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
      {!isInDetail && <CategoryList categoryList={randCategory} setCategory={setClickedCategory} />}
    </>
  );
}

SubMenu.defaultProps = {
  isInDetail: false,
};

export default SubMenu;
