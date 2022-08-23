import { atom } from 'recoil';
import { UserType } from 'src/types';

const userState = atom<UserType>({
  key: 'userName',
  default: {},
});

// eslint-disable-next-line import/prefer-default-export
export { userState };
