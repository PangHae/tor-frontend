import { ReactElement } from 'react';
import CategoryList from 'src/components/Category/List';

import styles from './style.module.scss';

interface props {
  onClose: () => void;
}

function CategoryModal({ onClose }: props): ReactElement {
  return (
    <>
      <div className={styles.Background} onClick={onClose} />
      <div className={styles.Modal}>
        <CategoryList />;
      </div>
    </>
  );
}

export default CategoryModal;
