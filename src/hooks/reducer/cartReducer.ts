import { PresetType, CartActionType } from 'src/types';

export default (state: PresetType[], action: CartActionType): PresetType[] => {
  switch (action.type) {
    case 'ADD':
      return state.concat(action.preset);
    case 'REMOVE':
      return [];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
