import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { PresetType } from 'src/types';
import PurchaseCard from '../Card';

import styles from './purchaseList.module.scss';

interface Props {
  purchaseList: { presetId: number }[];
}

function PurchaseList({ purchaseList }: Props): React.ReactElement {
  const [presetList, setPresetList] = useState<PresetType[]>([]);
  // const [presetList, setPresetList] = useState([]);

  useEffect(() => {
    if (purchaseList) {
      Promise.all(
        purchaseList.map(async (item) => {
          const preset = await axios.get(
            `${process.env.NEXT_PUBLIC_ADDR}/api/preset/getPresetById/${item.presetId}`,
          );
          return preset;
        }),
      ).then((res: any) => {
        const uniqueRes: string[] = [];
        res.forEach((response: AxiosResponse) => {
          const stringRes = JSON.stringify(response.data);
          if (!uniqueRes.includes(stringRes)) {
            uniqueRes.push(stringRes);
          }
        });
        const tmpPresetList = uniqueRes.map((stringRes: string) => {
          const preset = JSON.parse(stringRes);
          return preset;
        });
        setPresetList(tmpPresetList);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.PurchasedList}>
      {presetList.map((preset) => {
        return <PurchaseCard preset={preset} />;
      })}
    </div>
  );
}

export default PurchaseList;
