import { NextPage } from 'next';
import Head from 'next/head';
import Menu from 'src/components/Menu';
import SubMenu from 'src/components/Menu/Sub';
import SearchTab from 'src/components/SearchTab';
import CartList from 'src/components/Cart/List';

const Cart: NextPage = function Cart() {
  return (
    <>
      <Head>
        <title>추천의 유혹</title>
      </Head>
      <main>
        <SearchTab />
        <Menu />
        <SubMenu categoryList={[]} />
        <CartList />
      </main>
    </>
  );
};

export default Cart;
