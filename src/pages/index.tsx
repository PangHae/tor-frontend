import Head from 'next/head';
import ShowItems from 'src/components/ShowItems';
import Menu from 'src/components/Menu';
import SubMenu from 'src/components/Menu/Sub';
import SearchTab from 'src/components/SearchTab';
import CategoryList from 'src/components/Category/List';
import axios from 'axios';
import { PresetType } from 'src/types';

interface Props {
  presetRanking: {
    content: PresetType[];
  };
}

function Home({ presetRanking }: Props) {
  const tabNames = ['지금 가장 핫한 모음집 >', '이 모음집 어때요? >'];
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
          <ShowItems tabTitle={tabName} presetRanking={presetRanking.content} />
        ))}
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const presetRanking = await axios.get(`${process.env.NEXT_PUBLIC_ADDR}/api/preset/getPresetRank`);
  // 다른 api 하나 더 열리면 추가 예정
  return {
    props: { presetRanking: presetRanking.data },
  };
};

export default Home;
