import create from 'zustand'
import {v4 as uuidv4} from 'uuid'
import MonsterCard from '../src/components/MonsterCard';

export interface Monster {
    hp: number;
    temp: number;
    id: string;
}

export interface Hp {
    hp: number;
    id: string
}
export interface State {
    monsterList: Monster[];
    addMonster: () => void;
    removeMonster: (id: string) => void;
    setHp: (hp: number, id: string) => void;
    getId: (id: string) => void;
}

const useStore = create<State>()((set) => ({
    monsterList: [],
    addMonster: () => {
        set((state) => ({
            monsterList: [
                ...state.monsterList,
                {
                    id: uuidv4(),
                    hp: 0,
                    temp: 0,
                } as Monster,
            ],
        }));
    },
    removeMonster: (id: string) => {
        set((state) => ({
            monsterList: state.monsterList.filter((monster) => monster.id !== id)
        }))
    },
    setHp: (hp: number, id: string) => {

    }, 
    getId: (id: string) => {
        console.log(id)
    },
}))

export default useStore