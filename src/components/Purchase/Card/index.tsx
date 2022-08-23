/* eslint-disable no-alert */
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import Button from 'src/components/base/Button';
import Input from 'src/components/base/Input';
import { Title } from 'src/components/base/Title';
import useAxios from 'src/hooks/useAxios';
import { PresetType } from 'src/types';

import { useRecoilState } from 'recoil';
import { userState } from 'src/hooks/recoil/atoms/user';
import styles from './purchaseCard.module.scss';

interface Props {
  preset: PresetType;
}

function PurchaseCard({ preset }: Props): React.ReactElement {
  const [user] = useRecoilState(userState);
  const [star, setStar] = useState(2.5);
  const { fetchData: addStar, res: addStarRes } = useAxios({
    method: 'post',
    url: '/api/preset/insertPresetScores',
  });
  const handleOnChangeStarValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { target } = e;
    setStar(Number((target as HTMLInputElement).value));
  };

  useEffect(() => {
    if (addStarRes) {
      alert('성공적으로 점수를 등록하였습니다!');
    }
  }, [addStarRes]);

  const handleOnClickSubmitStar = () => {
    addStar({
      presetId: preset.presetId,
      // 유저 번호 동적 변경 필요
      userNumber: user.userNumber,
      preference: star,
    });
  };

  return (
    <div className={styles.PresetCard}>
      <div className={styles.NameSpace}>
        <p>{`모음집 이름 : ${preset.presetName}`}</p>
        <p>{`제작자 : ${preset.producer}`}</p>
      </div>
      <div className={styles.Descript}>
        <div className={styles.PresetContent}>{preset.presetContent}</div>
        <div className={styles.GiveStar}>
          <Title text={`별점 부여 : ${star}`} />
          <Input
            type='range'
            classname='RangeInput'
            min={0}
            max={5}
            step={0.5}
            value={star}
            onChange={handleOnChangeStarValue}
          />
          <Button classname='SmallButton' onClick={handleOnClickSubmitStar}>
            별점 제출
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseCard;
