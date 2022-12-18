import create from 'zustand'

export interface State {
    count: number;
    increase: (value: number) => void;
    decrease: (value: number) => void;
}

const useStore = create((set) => ({
    count: 0,
    increase: (value: number) => set((state: State)=>({
        ...state,
        count: state.count + value
    })),
    decrease: (value: number) => set((state: State)=> ({
        ...state,
        count: state.count - value
    }))
}))

export default useStore