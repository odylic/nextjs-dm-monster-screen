import MonsterCard from "../src/components/MonsterCard";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import {
  Monster,
  addMonster,
  selectMonster,
} from "../src/app/slices/MonsterSlice";
import uuid from "react-uuid";

export default function Home() {
  const dispatch = useDispatch();
  const monsterList = useSelector(selectMonster);

  const createMonster = () => {
    dispatch(
      addMonster({
        hp: 0,
        temp: 0,
        id: uuid(),
      })
    );
  };

  return (
    <div className="flex flex-col items-center bg-background h-screen overflow-auto">
      <Head>
        <title>DM Screen</title>
      </Head>
      <h1 className="text-3xl m-5 font-serif">DM Screen</h1>
      <button
        className="rounded-lg shadow-monsterCard p-4 bg-gray-200"
        onClick={(e) => {
          e.preventDefault();
          createMonster();
        }}
      >
        Add
      </button>
      <div className="sm:flex flex-wrap">
        {monsterList.map((monster: Monster) => {
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
