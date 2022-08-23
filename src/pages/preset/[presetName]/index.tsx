import Head from 'next/head';
import axios from 'axios';

import ShortMenu from 'src/components/Menu/Short';
import PresetDetail from 'src/components/Preset/Detail';

import { PresetType } from 'src/types';

interface Props {
  preset: PresetType;
}

function PresetName({ preset }: Props) {
  return (
    <>
      <Head>
        <title>{preset.presetName}</title>
      </Head>
      <main>
        <ShortMenu />
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
