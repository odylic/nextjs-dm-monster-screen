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
    },
    setTemp: (state,action: PayloadAction<{temp: number, id: string}>) => {
      state.monsterList.map((monster)=> {
        if (action.payload.id === monster.id) monster.temp = action.payload.temp
      })
    },
    incrementByAmount: (state, action: PayloadAction<{damage: number, id: string}>)=> {
      state.monsterList.map((monster)=> {
        if (action.payload.id === monster.id) monster.hp += action.payload.damage;
        if (monster.hp < 0) monster.hp = 0;
      })
    },
    decrementByAmount: (state, action: PayloadAction<{damage: number, id: string}>) => {
      state.monsterList.map((monster)=> {
        if (action.payload.id === monster.id) {
          if (monster.temp === 0) {
            monster.hp -= action.payload.damage
          }
          if (monster.temp > 0) {
            if (action.payload.damage === monster.temp) {
              monster.temp = 0
            }
            else if (action.payload.damage < monster.temp){
              monster.temp -= action.payload.damage
            }
            else if (action.payload.damage > monster.temp) {
              const difference = action.payload.damage - monster.temp;
              monster.hp -= difference;
              monster.temp = 0;
            }
          }
        }
        if (monster.hp < 0) monster.hp = 0;
      })
    },
  }
})

export const {
  addMonster,
  deleteMonster,
  setHp,
  setTemp,
  incrementByAmount,
  decrementByAmount,
} = monsterSlice.actions;

export const selectMonster = (state: RootState) => state.monsters.monsterList;

export default monsterSlice.reducer;