import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Menu from 'src/components/Menu';
import SubMenu from 'src/components/Menu/Sub';
import PresetListByCategory from 'src/components/Preset/ListByCategory';
import SearchTab from 'src/components/SearchTab';
import { userState } from 'src/hooks/recoil/atoms/user';

import { PresetType } from 'src/types';

interface props {
  presetList: PresetType[];
  categoryName: string;
}

function Category({ presetList, categoryName }: props) {
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
        <PresetListByCategory presetList={presetList} categoryName={categoryName} />
      </main>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { categoryName } = context.query;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ADDR}/api/preset/getPrestListByCategory/${encodeURI(categoryName)}`,
  );
  return {
    props: {
      presetList: response.data,
      categoryName,
    },
  };
};

export default Category;
