import Head from 'next/head';
import { ProductType } from 'src/types';
import axios from 'axios';
import ShortMenu from 'src/components/Menu/Short';
import PresetDetail from 'src/components/Preset/Detail';

interface Props {
  presetName: string;
  preset: {
    content: ProductType[];
  };
}

function PresetName({ presetName, preset }: Props) {
  return (
    <>
      <Head>
        <title>{presetName}</title>
      </Head>
      <main>
        <ShortMenu />
        <hr style={{ margin: '0', marginBottom: '10px' }} />
        <PresetDetail products={preset.content} />
      </main>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { presetName } = context.query;
  const presetRes = await axios.get(
    `${process.env.NEXT_PUBLIC_ADDR}/api/product/getProductList/${encodeURI(presetName)}`,
  );
  return {
    props: { presetName, preset: presetRes.data },
  };
};

export default PresetName;
