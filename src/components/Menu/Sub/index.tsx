import React from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import Button from 'src/components/base/Button';
import Input from 'src/components/base/Input';
import styles from './subMenu.module.scss';

function SubMenu(): React.ReactElement {
  return (
    <div className={styles.SubMenu}>
      <Button value='내 모음집' style={{ margin: 'auto auto auto 10%' }}>
        <p>내 모음집</p>
      </Button>
      <div className={styles.SubSearch}>
        <Input
          classname='UnderBarInput'
          placeholder='카테고리를 입력해주세요.'
          // style={{ margin: 'auto 10% auto auto' }}
        />
        <Button classname='SubMenuImageButton'>
          <IoSearchSharp size='40' color='#000' />
        </Button>
      </div>
    </div>
  );
}

export default SubMenu;
