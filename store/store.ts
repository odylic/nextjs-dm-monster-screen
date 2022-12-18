import create from 'zustand'
import {v4 as uuidv4} from 'uuid'

export interface Monster {
    hp: number;
    temp: number;
    id: string;
}
export interface State {
    monsterList: Monster[];
    addMonster: () => void;
    removeMonster: (id: string) => void;
    count: number;
    increase: (value: number) => void;
    decrease: (value: number) => void;
}

const useStore = create<State>((set) => ({
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
    count: 0,
    increase: (value: number) => set((state)=>({
        ...state,
        count: state.count + value
    })),
    decrease: (value: number) => set((state)=> ({
        ...state,
        count: state.count - value
    }))
}))

export default useStore