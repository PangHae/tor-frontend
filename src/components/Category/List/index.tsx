import React from 'react';
import Button from 'src/components/base/Button';
import styles from './list.module.scss';

const tmpCategoryList = ['자취', '반려동물', '한범석', '호몬스터'];

function CategoryList(): React.ReactElement {
  return (
    <div className={styles.Category}>
      <div className={styles.CategoryButtonField}>
        {tmpCategoryList.map((categoryName) => {
          return (
            <Button classname='CategoryButton'>
              <p>{categoryName}</p>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryList;
