import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Monster {
  hp: number;
  id: string;
  temp: number;
  maxHp: number;
}

export interface Initiative {
  name: string;
  id: string;
  initiative: number;
}

export interface State {
  monsterList: Monster[];
  initiativeOrder: Initiative[];
}

const initialState: State = {
  monsterList: [
    { hp: 0, temp: 0, maxHp: 0, id: "initial-monster-1" }
  ],
  initiativeOrder: []
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
        if (action.payload.id === monster.id) {
          monster.hp = Math.min(action.payload.hp, monster.maxHp);
        }
      })
    },
    setTemp: (state,action: PayloadAction<{temp: number, id: string}>) => {
      state.monsterList.map((monster)=> {
        if (action.payload.id === monster.id) monster.temp = action.payload.temp
      })
    },
    setMaxHp: (state, action: PayloadAction<{maxHp: number, id: string}>) => {
      state.monsterList.map((monster) => {
        if (action.payload.id === monster.id) monster.maxHp = action.payload.maxHp
      })
    },
    incrementByAmount: (state, action: PayloadAction<{damage: number, id: string}>)=> {
      state.monsterList.map((monster)=> {
        if (action.payload.id === monster.id) {
          monster.hp += action.payload.damage;
          if (monster.hp > monster.maxHp) monster.hp = monster.maxHp;
        }
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
    addToInitiativeOrder: (state, action: PayloadAction<Initiative>) => {
        state.initiativeOrder.push(action.payload)
    },
    deleteFromInitiativeOrder: (state, action: PayloadAction<string>) => {
        state.initiativeOrder = state.initiativeOrder.filter((item)=> item.id !== action.payload)
    },
    sortInitiativeOrder: (state, action: PayloadAction<null>) => {
      const initiatives = state.initiativeOrder.sort((a,b) => {
        return b.initiative - a.initiative
      })
    },
    setInitiativeOrder: (state, action:PayloadAction<Initiative[]>)=> {
      state.initiativeOrder = action.payload
    },
}})

export const {
  addMonster,
  deleteMonster,
  setHp,
  setTemp,
  setMaxHp,
  incrementByAmount,
  decrementByAmount,
  addToInitiativeOrder,
  deleteFromInitiativeOrder,
  sortInitiativeOrder,
  setInitiativeOrder,
} = monsterSlice.actions;

export const selectMonster = (state: RootState) => state.monsters.monsterList;

export const selectInitiativeOrder = (state: RootState) => state.monsters.initiativeOrder;

export default monsterSlice.reducer;