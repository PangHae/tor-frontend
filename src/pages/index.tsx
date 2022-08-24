import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios, { AxiosResponse } from 'axios';
import { useRecoilState } from 'recoil';
import useAxios from 'src/hooks/useAxios';

import ShowItems from 'src/components/ShowItems';
import Menu from 'src/components/Menu';
import SubMenu from 'src/components/Menu/Sub';
import SearchTab from 'src/components/SearchTab';
import LoginModal from 'src/components/LoginModal';

import { PresetType } from 'src/types';

import { userState } from 'src/hooks/recoil/atoms/user';

interface Props {
  presetRanking: PresetType[];
}

type ScoreData = {
  preset: PresetType;
  score: number;
};

function Home({ presetRanking }: Props) {
  const [user] = useRecoilState(userState);
  const [userPresetRanking, setUserPresetRanking] = useState<PresetType[]>([]);
  const tabs: { tabName: string; presetList: PresetType[] }[] = [
    { tabName: '지금 가장 핫한 모음집 >', presetList: presetRanking },
    { tabName: '이 모음집 어때요? >', presetList: userPresetRanking },
  ];
  const { fetchData: getRecommend, res: getRecommendRes } = useAxios({
    method: 'get',
    url: '/api/recommend/getUserRecommendPreset',
  });

  useEffect(() => {
    if (user) {
      getRecommend(`/${user.userNumber}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (getRecommendRes && user) {
      Promise.all(
        getRecommendRes.content.map(async (preset: PresetType) => {
          const scoredPreset = await axios.get(
            `${process.env.NEXT_PUBLIC_ADDR}/api/preset/getEvalPresets/${user.userId}/${preset.presetId}`,
          );
          return scoredPreset;
        }),
      ).then((res: AxiosResponse[]) => {
        const scorePreset = res.map((item) => {
          return item.data;
        });
        scorePreset.sort((a: ScoreData, b: ScoreData) => {
          if (a.score > b.score) {
            return -1;
          }
          if (b.score > a.score) {
            return 1;
          }
          return 0;
        });
        setUserPresetRanking(
          scorePreset.map((item) => {
            return item.preset;
          }),
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRecommendRes]);

  return (
    <>
      <Head>
        <title>추천의 유혹</title>
      </Head>
      <main>
        <SearchTab />
        <Menu />
        <SubMenu />
        {user.userName && userPresetRanking ? (
          tabs.map((tab) => (
            <ShowItems tabTitle={tab.tabName} presetRanking={tab.presetList} key={tab.tabName} />
          ))
        ) : (
          <LoginModal />
        )}
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const presetRanking = await axios.get(`${process.env.NEXT_PUBLIC_ADDR}/api/preset/getPresetRank`);
  return {
    props: {
      presetRanking: presetRanking.data.content,
    },
  };
};

export default Home;
