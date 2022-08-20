import React, { useState } from 'react';
import Title from 'src/components/base/Title';
import PresetCard from 'src/components/Preset/Card';
import PresetModal from 'src/components/Preset/Modal';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { PresetType } from 'src/types';
import styles from './showItems.module.scss';
import Button from '../base/Button';

interface ShowItemProps {
  tabTitle: string;
}

function ShowItems({ tabTitle }: ShowItemProps): React.ReactElement {
  const tempPresetList: PresetType[] = [
    {
      presetId: 0,
      presetName: '야 너두 집밥 뚝딱',
      presetContent:
        '집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ',
      categoryName: 'category1',
      recommend: 24,
      producer: '응호애현',
    },
    {
      presetId: 1,
      presetName:
        '가성비충 꼭 봐주면 돼.. 가성비충 꼭 봐주면 돼.. 가성비충 꼭 봐주면 돼.. 가성비충 꼭 봐주면 돼..',
      presetContent:
        '가성비 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ',
      categoryName: 'category1',
      recommend: 1024,
      producer: '응준애호',
    },
    {
      presetId: 2,
      presetName: '오분 완성 연애 요리',
      presetContent:
        '오븐 완성 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ',
      categoryName: 'category1',
      recommend: 10000,
      producer: '응범애석',
    },
    {
      presetId: 3,
      presetName: '근데 파르페가 뭐임',
      presetContent:
        '파르페 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ 집밥 냠냠냠냔ㅁ',
      categoryName: 'category1',
      recommend: 10,
      producer: '이광해 바보',
    },
  ];
  // 여기서 items list 서버에서 받아오도록 함
  const [isCartModalShow, setIsCartModalShow] = useState<boolean>(false);
  const [presetForModal, setPresetForModal] = useState<PresetType | null>(null);

  const handleShowCartModal = (preset: PresetType) => {
    setIsCartModalShow(true);
    setPresetForModal(preset);
  };
  const handleCloseCartModal = () => {
    setIsCartModalShow(false);
    setPresetForModal(null);
  };

  return (
    <>
      <div className={styles.ItemField}>
        <Title classname='TitleHover' text={tabTitle} style={{ fontSize: '24px' }} />
        <div className={styles.ProductField}>
          <div className={styles.LeftButton}>
            <Button classname='ImageButton'>
              <IoIosArrowDropleft size={40} color='#000' />
            </Button>
          </div>
          <div className={styles.ProductCardField}>
            {tempPresetList.map((preset) => {
              return (
                <PresetCard
                  key={preset.presetId} // 이거 나중에 preset id 값으로 바꿀건데 임시로 지정 넣어놓은 값
                  preset={preset}
                  onClickCart={handleShowCartModal}
                />
              );
            })}
          </div>
          <div className={styles.RightButton}>
            <Button classname='ImageButton'>
              <IoIosArrowDropright size={40} color='#000' />
            </Button>{' '}
          </div>
        </div>
      </div>
      {isCartModalShow && <PresetModal preset={presetForModal!} onClose={handleCloseCartModal} />}
    </>
  );
}

export default ShowItems;
