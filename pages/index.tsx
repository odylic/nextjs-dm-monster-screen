import useStore from "../store/store";

export default function Home() {
  const color = useStore((state) => state.color);
  const changeColor = useStore((state) => state.changeColor);
  return (
    <button className={`text-${color} bg-blue-700 p-2`} onClick={changeColor}>
      <h1>Default</h1>
    </button>
  );
}
