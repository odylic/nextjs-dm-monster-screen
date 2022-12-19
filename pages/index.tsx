import MonsterCard from "../src/components/MonsterCard";
import useStore from "../store/store";
import Head from "next/head";

export default function Home() {
  const monsterList = useStore((state) => state.monsterList);
  const addMonster = useStore((state) => state.addMonster);
  return (
    <div className="flex flex-col items-center bg-background h-screen overflow-auto">
      <Head>
        <title>DM Screen</title>
      </Head>
      <h1 className="text-3xl m-5 font-serif">DM Monster Screen</h1>
      <button
        className="rounded-lg shadow-monsterCard p-4 bg-gray-200"
        onClick={(e) => {
          e.preventDefault();
          addMonster();
        }}
      >
        Add Monster
      </button>
      <div className="flex flex-wrap">
        {monsterList.map((monster) => {
          return (
            <MonsterCard
              key={monster.id}
              id={monster.id}
              hp={monster.hp}
              temp={monster.temp}
            />
          );
        })}
      </div>
    </div>
  );
}
