import Head from 'next/head';
import { PresetType, ProductType } from 'src/types';
import axios from 'axios';
import ShortMenu from 'src/components/Menu/Short';
import PresetDetail from 'src/components/Preset/Detail';

interface Props {
  preset: ProductType[];
  presetInfo: PresetType;
}

function PresetName({ preset, presetInfo }: Props) {
  return (
    <>
      <Head>
        <title>{presetInfo.presetName}</title>
      </Head>
      <main>
        <ShortMenu />
        <hr style={{ margin: '0', marginBottom: '10px' }} />
        <PresetDetail products={preset} presetInfo={presetInfo} />
      </main>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { presetName } = context.query;
  const presetRes = await axios.get(
    `${process.env.NEXT_PUBLIC_ADDR}/api/product/getProductList/${encodeURI(presetName)}`,
  );
  const presetInfoRes = await axios.get(
    `${process.env.NEXT_PUBLIC_ADDR}/api/preset/getPreset/${encodeURI(presetName)}`,
  );
  const checkAddedProducts: ProductType[] = presetRes.data.content.map((product: ProductType) => {
    product.checked = true;
    product.count = 1;
    return product;
  });

  return {
    props: { preset: checkAddedProducts, presetInfo: presetInfoRes.data },
  };
};

export default PresetName;
