import { createContext, Dispatch, useContext } from 'react';

import { PresetType, CartActionType } from 'src/types';

const initialState: PresetType[] = [];

const PresetStateContext = createContext(initialState);
const PresetDispatchContext = createContext<Dispatch<CartActionType> | null>(null);

const usePresetState = () => useContext(PresetStateContext);
const usePresetDispatch = () => useContext(PresetDispatchContext);

export { PresetStateContext, PresetDispatchContext, usePresetState, usePresetDispatch };
