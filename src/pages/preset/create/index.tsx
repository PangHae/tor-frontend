import Head from 'next/head';
import Menu from 'src/components/Menu';
import SubMenu from 'src/components/Menu/Sub';
import SearchTab from 'src/components/SearchTab';
import PresetInput from 'src/components/Preset/Input';

function PresetCreate() {
  return (
    <>
      <Head>
        <title>추천의 유혹</title>
      </Head>
      <main>
        <SearchTab />
        <Menu />
        <SubMenu />
        <PresetInput />
      </main>
    </>
  );
}

export default PresetCreate;
