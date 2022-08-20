import React from 'react';
import SearchTab from 'src/components/SearchTab';
import Menu from '..';
import styles from './shortMenu.module.scss';

function ShortMenu() {
  return (
    <div className={styles.ShortMenu}>
      <Menu classname='ShortMenu' />
      <SearchTab noTitle />
    </div>
  );
}

export default ShortMenu;
