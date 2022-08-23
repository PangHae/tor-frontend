import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Menu from 'src/components/Menu';
import SubMenu from 'src/components/Menu/Sub';
import PresetInput from 'src/components/Preset/Input';
import SearchTab from 'src/components/SearchTab';
import { userState } from 'src/hooks/recoil/atoms/user';

function PresetCreate() {
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
        <SubMenu isInDetail />
        <PresetInput />
      </main>
    </>
  );
}

export default PresetCreate;
