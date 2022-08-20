import type { NextPage } from 'next';
import Head from 'next/head';
import ShowItems from 'src/components/ShowItems';
import Menu from 'src/components/Menu';
import SubMenu from 'src/components/Menu/Sub';
import SearchTab from 'src/components/SearchTab';
import CategoryList from 'src/components/Category/List';

const Home: NextPage = function Home() {
  const tabNames = ['지금 가장 핫한 모음집 >', '이 모음집 어때요? >', '응애? >'];
  return (
    <>
      <Head>
        <title>추천의 유혹</title>
      </Head>
      <main>
        <SearchTab />
        <Menu />
        <SubMenu />
        <CategoryList />
        {tabNames.map((tabName) => (
          <ShowItems tabTitle={tabName} />
        ))}
      </main>
    </>
  );
};

export default Home;
