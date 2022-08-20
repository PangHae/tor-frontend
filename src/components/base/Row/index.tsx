import { PropsWithChildren, ReactElement } from 'react';
import cx from 'classnames';

import styles from './style.module.scss';

interface props {
  className?: string;
}

function Row({ children, className }: PropsWithChildren<props>): ReactElement {
  return <div className={cx(styles.Row, className)}>{children}</div>;
}

Row.defaultProps = {
  className: '',
};

export default Row;
