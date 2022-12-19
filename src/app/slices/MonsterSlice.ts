import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Monster {
  hp: number;
  id: string;
  temp: number;
}

export interface State {
  monsterList: Monster[];
}

const initialState: State = {
  monsterList: [],
}

export const monsterSlice = createSlice({
  name: "monsters",
  initialState,
  reducers: {
    addMonster: (state, action: PayloadAction<T> ) => {
      state.monsterList.push(action.payload)
    }
  }
})

export const {
  addMonster
} = monsterSlice.actions;

export const selectMonster = (state: RootState) => state.monsters.monsterList;

export default monsterSlice.reducer;