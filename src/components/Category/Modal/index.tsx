import React, { ReactElement, SetStateAction, useEffect } from 'react';
import Button from 'src/components/base/Button';
import { Title } from 'src/components/base/Title';
import useAxios from 'src/hooks/useAxios';
import { CategoryNProduct } from 'src/types';

import styles from './style.module.scss';

interface props {
  presetCategoryList: CategoryNProduct;
  setPresetCategoryList: React.Dispatch<SetStateAction<CategoryNProduct>>;
  onClose: () => void;
}

function CategoryModal({
  presetCategoryList,
  setPresetCategoryList,
  onClose,
}: props): ReactElement {
  const { fetchData: getTopCategory, res: getTopCategoryRes } = useAxios({
    method: 'get',
    url: '/api/category/getCategories',
  });
  const { fetchData: getMiddleCategory, res: getMiddleCategoryRes } = useAxios({
    method: 'get',
    url: '/api/category/getCategories',
  });
  const { fetchData: getLowCategory, res: getLowCategoryRes } = useAxios({
    method: 'get',
    url: '/api/category/getCategories',
  });

  useEffect(() => {
    getTopCategory(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnClickAddCategory = (categoryName: string) => {
    if (!presetCategoryList.categoryName.includes(categoryName)) {
      setPresetCategoryList({
        categoryName: [...presetCategoryList.categoryName, categoryName],
        product: [],
      });
    }
  };

  const handleClickTopCategory = (categoryName: string) => {
    getMiddleCategory(`/${encodeURI(categoryName)}`);
  };

  const handleClickMiddleCategory = (categoryName: string) => {
    getLowCategory(`/${encodeURI(categoryName)}`);
  };

  return (
    <>
      <div className={styles.Background} onClick={onClose} />
      <div className={styles.Modal}>
        <Title classname='BigTitle' text='카테고리 검색' />
        <div className={styles.Search}>
          <div className={styles.TopCategory}>
            {getTopCategoryRes
              ? getTopCategoryRes.content.map((item: any) => {
                  return (
                    <Button onClick={() => handleClickTopCategory(item.categoryName)}>
                      <p>{item.categoryName}</p>
                    </Button>
                  );
                })
              : null}
          </div>
          <hr />
          <div className={styles.MiddleCategory}>
            {getMiddleCategoryRes
              ? getMiddleCategoryRes.content.map((item: any) => {
                  return (
                    <Button onClick={() => handleClickMiddleCategory(item.categoryName)}>
                      {item.categoryName}
                    </Button>
                  );
                })
              : null}
          </div>
          <hr />
          <div className={styles.LowCategory}>
            {getLowCategoryRes
              ? getLowCategoryRes.content.map((item: any) => {
                  return (
                    <Button onClick={() => handleOnClickAddCategory(item.categoryName)}>
                      {item.categoryName}
                    </Button>
                  );
                })
              : null}
          </div>
        </div>
        {/* {buttonTag ? (
          <Button classname='CategoryButton' onClick={handleOnClickAddCategory}>
            {buttonTag}
          </Button>
        ) : (
          <Title text='일치하는 카테고리가 없습니다' />
        )} */}
      </div>
    </>
  );
}

export default CategoryModal;
