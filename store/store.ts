import create from 'zustand'

// testing

const useStore = create((set) => ({
    color: 'white',
    changeColor: () => set((state: any) => ({color: state.color === 'white' ? 'black' : 'white'}))
}))

export default useStore