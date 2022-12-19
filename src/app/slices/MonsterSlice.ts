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
    addMonster: (state, action: PayloadAction<Monster> ) => {
      state.monsterList.push(action.payload)
    },
    deleteMonster: (state, action: PayloadAction<string>) => {
      state.monsterList = state.monsterList.filter((item) => item.id !== action.payload)
    },
    setHp: (state, action: PayloadAction<{hp: number, id: string}>) => {
      state.monsterList.map((monster) => {
        if (action.payload.id === monster.id) monster.hp = action.payload.hp
      })
    }
  }
})

export const {
  addMonster,
  deleteMonster,
  setHp,
} = monsterSlice.actions;

export const selectMonster = (state: RootState) => state.monsters.monsterList;

export default monsterSlice.reducer;