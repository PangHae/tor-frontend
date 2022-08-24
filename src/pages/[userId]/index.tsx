import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import { Title } from 'src/components/base/Title';
import PurchaseList from 'src/components/Purchase/List';

import { userState } from 'src/hooks/recoil/atoms/user';
import SearchTab from 'src/components/SearchTab';
import Menu from 'src/components/Menu';
import SubMenu from 'src/components/Menu/Sub';

interface Props {
  purchaseList: {
    content: [];
  };
}

function UserPurchaseList({ purchaseList }: Props) {
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
        <title>내가 구입한 목록</title>
      </Head>
      <main>
        <SearchTab />
        <Menu />
        <SubMenu isInDetail />
        <Title text='내가 구입한 목록' classname='BigTitle' />
        <PurchaseList purchaseList={purchaseList.content} />
      </main>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { userId } = context.query;
  const purchaseList = await axios.get(
    `${process.env.NEXT_PUBLIC_ADDR}/api/preset/getUserPresetPurchasedHistory/${userId}`,
  );
  return {
    props: { purchaseList: purchaseList.data },
  };
};

export default UserPurchaseList;
