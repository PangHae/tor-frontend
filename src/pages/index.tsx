import Head from 'next/head';
import axios from 'axios';
import { useRecoilState } from 'recoil';

import ShowItems from 'src/components/ShowItems';
import Menu from 'src/components/Menu';
import SubMenu from 'src/components/Menu/Sub';
import SearchTab from 'src/components/SearchTab';
import LoadingModal from 'src/components/LoginModal';

import { PresetType } from 'src/types';

import { userState } from 'src/hooks/recoil/atoms/user';

interface Props {
  presetRanking: {
    content: PresetType[];
  };
  userPresetRanking: {
    content: PresetType[];
  };
}

function Home({ presetRanking, userPresetRanking }: Props) {
  const [user] = useRecoilState(userState);
  const tabs = [
    { tabName: '지금 가장 핫한 모음집 >', presetRanking },
    { tabName: '이 모음집 어때요? >', presetRanking: userPresetRanking },
  ];

  return (
    <>
      <Head>
        <title>추천의 유혹</title>
      </Head>
      <main>
        <SearchTab />
        <Menu />
        <SubMenu />
        {user ? (
          tabs.map((tab) => (
            <ShowItems
              tabTitle={tab.tabName}
              presetRanking={tab.presetRanking.content}
              key={tab.tabName}
            />
          ))
        ) : (
          <LoadingModal />
        )}
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const presetRanking = await axios.get(`${process.env.NEXT_PUBLIC_ADDR}/api/preset/getPresetRank`);
  const userPresetRanking = await axios.get(
    `${process.env.NEXT_PUBLIC_ADDR}/api/recommend/getUserRecommendPreset/2`,
  );
  // 카테고리 api 연결 필요
  return {
    props: {
      presetRanking: presetRanking.data,
      userPresetRanking: userPresetRanking.data,
    },
  };
};

export default Home;
