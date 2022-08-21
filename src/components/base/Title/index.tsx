import React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import styles from './title.module.scss';

interface TitleProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  classname?: string;
}

function Title({ text, classname = '', style }: TitleProps): React.ReactElement {
  return (
    <div className={cx(styles.TitleTSX, styles[classname])}>
      <span style={style}>{text}</span>
    </div>
  );
}

function LinkedTitle({ text, classname = '', style }: TitleProps): React.ReactElement {
  return (
    <Link href='/'>
      <a className={cx(styles.TitleTSX, styles[classname])}>
        <span style={style}>{text}</span>
      </a>
    </Link>
  );
}
Title.defaultProps = {
  classname: '',
};

LinkedTitle.defaultProps = {
  classname: '',
};

export { Title, LinkedTitle };
