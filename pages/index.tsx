import useStore from "../store/store";

export default function Home() {
  const color = useStore((state: any) => state.color);
  const changeColor = useStore((state: any) => state.changeColor);
  return (
    <button className={`text-${color} bg-blue-700 p-2`} onClick={changeColor}>
      <h1>Default</h1>
    </button>
  );
}
