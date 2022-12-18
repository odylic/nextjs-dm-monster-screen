import MonsterCard from "../src/components/MonsterCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-background h-screen">
      <h1 className="text-3xl m-5">DM Monster Screen</h1>
      <button className="rounded-lg shadow-monsterCard p-4 bg-gray-200">
        Add Monster
      </button>
      <MonsterCard />
    </div>
  );
}
