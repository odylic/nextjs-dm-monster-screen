import MonsterCard from "../src/components/MonsterCard";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import {
  Monster,
  addMonster,
  selectMonster,
} from "../src/app/slices/MonsterSlice";
import uuid from "react-uuid";
import InitiativeOrder from "../src/components/InitiativeOrder";
import { useState } from "react";
import { DiceRoller } from "@dice-roller/rpg-dice-roller";

export default function Home() {
  const dispatch = useDispatch();
  const monsterList = useSelector(selectMonster);
  const [dice, setDice] = useState("");
  const [result, setResult] = useState("");
  const roller = new DiceRoller();

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
      <div className="bg-purple-900 m-5 p-5 rounded-md min-w-fit">
        <h1 className="text-white text-center">{result}</h1>
        <form className="flex flex-wrap justify-center">
          <input
            className="m-1 rounded-md px-2 w-[60%] min-w-fit"
            placeholder="Enter Dice Notation 4d6 Adv:2d20kh1 Disadvantage:2d20kl1"
            onChange={(e) => {
              setDice(e.target.value);
            }}
          />
          <div>
            <button
              className="bg-slate-50 active:bg-slate-200 rounded-md px-2 m-1 w-[20%] min-w-fit"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                roller.roll(dice);
                let latestRoll = roller.log.shift();
                setResult(latestRoll + "");
              }}
            >
              Roll
            </button>
            <button
              className="bg-slate-50 active:bg-slate-200 rounded-md px-2 m-1 w-[20%] min-w-fit"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setResult("");
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      <button
        className="rounded-lg shadow-monsterCard p-4 bg-slate-50 active:bg-slate-200"
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
      <div className="m-2">
        <InitiativeOrder />
      </div>
    </div>
  );
}
