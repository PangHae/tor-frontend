import React, { useEffect, useState } from 'react';
import { Title } from 'src/components/base/Title';
import PresetCard from 'src/components/Preset/Card';
import PresetModal from 'src/components/Preset/Modal';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { PresetType } from 'src/types';
import styles from './showItems.module.scss';
import Button from '../base/Button';

interface ShowItemProps {
  tabTitle: string;
  presetRanking: PresetType[];
}

function ShowItems({ tabTitle, presetRanking }: ShowItemProps): React.ReactElement {
  // 여기서 items list 서버에서 받아오도록 함
  const [isCartModalShow, setIsCartModalShow] = useState<boolean>(false);
  const [presetForModal, setPresetForModal] = useState<PresetType | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [presetToShow, setPresetToShow] = useState<PresetType[]>([]);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    const curPreset = presetRanking.slice(currentPage * 4, currentPage * 4 + 4);
    setLastPage(Math.ceil(presetRanking.length / 4) - 1);
    setPresetToShow(curPreset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleShowCartModal = (preset: PresetType) => {
    setIsCartModalShow(true);
    setPresetForModal(preset);
  };
  const handleCloseCartModal = () => {
    setIsCartModalShow(false);
    setPresetForModal(null);
  };

  const handleClickLeft = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleClickRight = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <>
      <div className={styles.ItemField}>
        <Title classname='TitleHover' text={tabTitle} style={{ fontSize: '24px' }} />
        {lastPage < 0 ? (
          <Title text='개인 추천 사항이 없습니다..' />
        ) : (
          <div className={styles.ProductField}>
            {currentPage !== 0 ? (
              <div className={styles.LeftButton}>
                <Button classname='ImageButton' onClick={handleClickLeft}>
                  <IoIosArrowDropleft size={40} color='#000' />
                </Button>
              </div>
            ) : null}
            <div className={styles.ProductCardField}>
              {presetToShow.map((preset) => (
                <PresetCard
                  key={preset.presetId.toString() + preset.presetName}
                  preset={preset}
                  onClickCart={() => handleShowCartModal(preset)}
                />
              ))}
            </div>
            {currentPage !== lastPage ? (
              <div className={styles.RightButton}>
                <Button classname='ImageButton' onClick={handleClickRight}>
                  <IoIosArrowDropright size={40} color='#000' />
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </div>
      {isCartModalShow && <PresetModal preset={presetForModal!} onClose={handleCloseCartModal} />}
    </>
  );
}

export default ShowItems;
