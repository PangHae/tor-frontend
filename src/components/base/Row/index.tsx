import { PropsWithChildren, ReactElement } from 'react';
import cx from 'classnames';

import styles from './style.module.scss';

interface props {
  className?: string;
  onClick?: () => void;
}

function Row({ children, className, onClick }: PropsWithChildren<props>): ReactElement {
  return (
    <div className={cx(styles.Row, className)} onClick={onClick}>
      {children}
    </div>
  );
}

Row.defaultProps = {
  className: '',
  onClick: () => {},
};

export default Row;
