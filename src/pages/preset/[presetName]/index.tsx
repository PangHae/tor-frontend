import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import axios from 'axios';

// import ShortMenu from 'src/components/Menu/Short';
import PresetDetail from 'src/components/Preset/Detail';

import { PresetType } from 'src/types';

import { userState } from 'src/hooks/recoil/atoms/user';
import SearchTab from 'src/components/SearchTab';
import Menu from 'src/components/Menu';
import SubMenu from 'src/components/Menu/Sub';

interface Props {
  preset: PresetType;
}

function PresetName({ preset }: Props) {
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
        <title>{preset.presetName}</title>
      </Head>
      <main>
        <SearchTab />
        <Menu />
        <SubMenu isInDetail />
        <hr style={{ margin: '0', marginBottom: '10px' }} />
        <PresetDetail originalPreset={preset} />
      </main>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { presetName } = context.query;
  const productListRes = await axios.get(
    `${process.env.NEXT_PUBLIC_ADDR}/api/product/getProductList/${encodeURI(presetName)}`,
  );
  const presetRes = await axios.get(
    `${process.env.NEXT_PUBLIC_ADDR}/api/preset/getPreset/${encodeURI(presetName)}`,
  );
  return {
    props: {
      preset: {
        ...presetRes.data,
        checked: true,
        products: [...productListRes.data.content].map((product) => {
          return { ...product, checked: true, count: 1 };
        }),
      },
    },
  };
};

export default PresetName;
