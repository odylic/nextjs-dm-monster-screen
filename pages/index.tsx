import useStore from "../store/store";
import MonsterCard from "../src/components/MonsterCard";

export default function Home() {
  const color = useStore((state: any) => state.color);
  const changeColor = useStore((state: any) => state.changeColor);
  return (
    <div className="flex flex-col items-center bg-gray-100 h-screen">
      <h1 className="text-3xl m-5">DM Monster Screen</h1>
      <button className="rounded-lg bg-neutral-300 p-4" onClick={changeColor}>
        Add Monster
      </button>
      <MonsterCard />
    </div>
  );
}
