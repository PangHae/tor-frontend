import React, { PropsWithChildren } from 'react';
import cx from 'classnames';
import styles from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classname?: string;
}

function Button({
  value,
  classname,
  children,
  ...props
}: PropsWithChildren<ButtonProps>): React.ReactElement {
  return (
    <button
      type='button'
      className={cx(styles.ButtonTSX, classname && styles[classname])}
      {...props}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  classname: '',
  children: null,
};

export default Button;
