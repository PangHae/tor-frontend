import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { LinkedTitle, Title } from 'src/components/base/Title';
import cx from 'classnames';
import styles from './menu.module.scss';

interface Props {
  classname?: string;
}
function Menu({ classname }: Props): React.ReactElement {
  const menuArray = ['신상품', '베스트', '모음집', '알뜰상품', '특가/혜택'];

  return (
    <div className={cx(styles.MenuBar, classname && styles[classname])}>
      <div className={styles.Category}>
        <GiHamburgerMenu size={30} style={{ margin: 'auto 0' }} />
        <LinkedTitle classname='TitleHover' text='카테고리' />
      </div>
      <div className={styles.MainMenu}>
        {menuArray.map((name) => {
          if (name === '모음집') {
            return <Title classname='HoveredTitle' text={name} />;
          }
          return <Title key={name} text={name} />;
        })}
      </div>
    </div>
  );
}

Menu.defaultProps = {
  classname: '',
};

export default Menu;
