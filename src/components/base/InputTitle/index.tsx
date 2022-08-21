import React from 'react';
import Input from '../Input';
import { Title } from '../Title';
import styles from './inputTitle.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  titleClassname?: string;
  inputClassname?: string;
  inputMaxLen?: number;
}

function InputTitle({
  titleClassname,
  inputClassname,
  title,
  placeholder,
  inputMaxLen,
  onChange,
}: Props) {
  return (
    <div className={styles.InputTitleTSX}>
      <Title classname={titleClassname} text={title} />
      <Input
        classname={inputClassname}
        placeholder={placeholder}
        maxLength={inputMaxLen}
        onChange={onChange}
      />
    </div>
  );
}

InputTitle.defaultProps = {
  titleClassname: '',
  inputClassname: '',
  inputMaxLen: undefined,
};

export default InputTitle;
