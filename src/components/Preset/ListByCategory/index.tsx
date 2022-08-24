import { ReactElement, useState } from 'react';
import PresetCard from 'src/components/Preset/Card';
import { PresetType } from 'src/types';
import PresetModal from 'src/components/Preset/Modal';
import Row from 'src/components/base/Row';

import styles from './style.module.scss';

interface props {
  presetList: PresetType[];
  categoryName: string;
}

function PresetListByCategory({ presetList, categoryName }: props): ReactElement {
  const [isCartModalShow, setIsCartModalShow] = useState(false);
  const [presetForModal, setPresetForModal] = useState<PresetType | null>(null);

  const handleModalShow = (preset: PresetType) => {
    setPresetForModal(preset);
    setIsCartModalShow(true);
  };

  const handleModalClose = () => {
    setPresetForModal(null);
    setIsCartModalShow(false);
  };

  return (
    <>
      <Row className={styles.TitleWrapper}>
        <p className={styles.Category}>카테고리</p>
        <p className={styles.Title}>{`#${categoryName}`}</p>
      </Row>
      <div className={styles.Wrapper}>
        {presetList.map((preset) => (
          <PresetCard
            key={preset.presetId}
            preset={preset}
            onClickCart={() => handleModalShow(preset)}
          />
        ))}
      </div>
      {isCartModalShow && <PresetModal preset={presetForModal!} onClose={handleModalClose} />}
    </>
  );
}

export default PresetListByCategory;
