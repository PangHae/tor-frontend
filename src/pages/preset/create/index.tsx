import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import ShortMenu from 'src/components/Menu/Short';
import PresetInput from 'src/components/Preset/Input';
import { userState } from 'src/hooks/recoil/atoms/user';

function PresetCreate() {
  const [user] = useRecoilState(userState);
  const router = useRouter();
  useEffect(() => {
    if (!user.userName) {
      router.push('/');
    }
  }, []);
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
