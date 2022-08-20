import React, { useRef } from 'react';
import cx from 'classnames';
import styles from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classname?: string;
  isReadOnly?: boolean;
}

function Input({
  type,
  classname = '',
  value,
  onChange,
  isReadOnly,
  ...props
}: InputProps): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      type={type}
      className={cx(styles.InputTSX, styles[classname])}
      value={value}
      onChange={onChange}
      ref={inputRef}
      readOnly={isReadOnly}
      {...props}
    />
  );
}

Input.defaultProps = {
  classname: '',
  isReadOnly: false,
};

export default Input;
