import React, { ChangeEvent, useState } from 'react';
import Input from 'src/components/base/Input';
import { LinkedTitle } from 'src/components/base/Title';
import Button from 'src/components/base/Button';
import { IoCartSharp, IoPerson, IoSearchSharp } from 'react-icons/io5';
import { AiFillHeart } from 'react-icons/ai';

import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { userState } from 'src/hooks/recoil/atoms/user';
import styles from './searchTab.module.scss';

interface Props {
  noTitle?: boolean;
}

function SearchTab({ noTitle }: Props): React.ReactElement {
  const [user] = useRecoilState(userState);
  const [searchWord, setSearchWord] = useState('');

  const handleOnChange = (e: ChangeEvent) => {
    const { target } = e;
    setSearchWord((target as HTMLInputElement).value);
  };

  return (
    <div className={styles.SearchTab}>
      {noTitle || <LinkedTitle text='추천컬리' style={{ fontSize: '32px', fontWeight: 'bold' }} />}
      <div className={styles.SearchWord}>
        <Input
          classname='MainInput'
          type='text'
          value={searchWord}
          onChange={handleOnChange}
          placeholder='모음집 이름을 입력하세요.'
        />
        <Link href={`/preset/${searchWord}`}>
          <a>
            <Button classname='ImageButton'>
              <IoSearchSharp size='40' color='#000' />
            </Button>
          </a>
        </Link>
      </div>
      <div className={styles.Buttons}>
        <Link href={`/${user.userName}`}>
          <a>
            <Button classname='ImageButton'>
              <IoPerson size='40' color='#000' />
            </Button>
          </a>
        </Link>
        <Button classname='ImageButton'>
          <AiFillHeart size='40' color='#000' />
        </Button>
        <Link href='/cart'>
          <a>
            <Button classname='ImageButton'>
              <IoCartSharp size='40' color='#000' />
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
}

SearchTab.defaultProps = {
  noTitle: false,
};

export default SearchTab;
