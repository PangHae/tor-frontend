import Head from 'next/head';
import ShortMenu from 'src/components/Menu/Short';
import PresetInput from 'src/components/Preset/Input';

function PresetCreate() {
  return (
    <>
      <Head>
        <title>추천의 유혹</title>
      </Head>
      <main>
        <ShortMenu />
        <PresetInput />
      </main>
    </>
  );
}

export default PresetCreate;
