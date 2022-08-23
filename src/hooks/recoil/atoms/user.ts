import { atom } from 'recoil';

const userState = atom({
  key: 'userName',
  default: '',
});

// eslint-disable-next-line import/prefer-default-export
export { userState };
