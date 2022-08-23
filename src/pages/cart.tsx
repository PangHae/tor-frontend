import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import Menu from 'src/components/Menu';
import SubMenu from 'src/components/Menu/Sub';
import SearchTab from 'src/components/SearchTab';
import CartList from 'src/components/Cart/List';

import { userState } from 'src/hooks/recoil/atoms/user';
import { useEffect } from 'react';

const Cart: NextPage = function Cart() {
  const [user] = useRecoilState(userState);
  const router = useRouter();
  useEffect(() => {
    if (!user.userName) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>추천의 유혹</title>
      </Head>
      <main>
        <SearchTab />
        <Menu />
        <SubMenu />
        <CartList />
      </main>
    </>
  );
};

export default Cart;
