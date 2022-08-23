import React, { MouseEventHandler, SetStateAction } from 'react';
import Button from 'src/components/base/Button';

import styles from './list.module.scss';

interface Props {
  categoryList: string[];
  setCategory?: React.Dispatch<SetStateAction<string>>;
}

function CategoryList({ categoryList, setCategory }: Props): React.ReactElement {
  const handleOnClickCategory: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { target } = e;
    if (setCategory) {
      setCategory((target as HTMLButtonElement).innerText);
    }
  };

  return (
    <div className={styles.Category}>
      <div className={styles.CategoryButtonField}>
        {categoryList.map((categoryName) => {
          return (
            <Button classname='CategoryButton' onClick={handleOnClickCategory} key={categoryName}>
              <p>{categoryName}</p>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

CategoryList.defaultProps = {
  setCategory: undefined,
};

export default CategoryList;
