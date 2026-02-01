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
import { useState, useEffect } from "react";
import { DiceRoller } from "@dice-roller/rpg-dice-roller";

export default function Home() {
  const dispatch = useDispatch();
  const monsterList = useSelector(selectMonster);
  const [input, setInput] = useState("");
  const [dice, setDice] = useState("");
  const [result, setResult] = useState("");
  const roller = new DiceRoller();

  useEffect(() => {
    if (dice === "") {
      setDice("d20");
    }
  }, [dice]);

  const createMonster = () => {
    dispatch(
      addMonster({
        hp: 0,
        temp: 0,
        maxHp: 0,
        id: uuid(),
      })
    );
  };

  const lowerCaseD = (input: string): string => {
    return input.replace(/D/g, 'd')
  };

  return (
    <div className="flex flex-col items-center bg-zinc-900 text-white h-screen overflow-auto">
      <Head>
        <title>DM Screen</title>
      </Head>
      <h1 className="text-3xl m-5 font-serif text-white">DM Screen</h1>
      <div className="bg-purple-900 m-5 p-5 rounded-md min-w-fit">
        <h1 className="text-white text-center">{result}</h1>
        <form className="flex flex-wrap justify-center">
          <input
            className="m-1 rounded-md px-2 w-[60%] min-w-fit text-black"
            placeholder="Enter Dice Notation 4d6 Adv:2d20kh1 Disadvantage:2d20kl1"
            value={input}
            onChange={(e) => {
              setInput(lowerCaseD(e.target.value));
              setDice(e.target.value);
            }}
          />
          <div>
            <button
              className="bg-slate-50 active:bg-slate-200 rounded-md px-2 m-1 w-[20%] min-w-fit text-black"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (dice) {
                  roller.roll(dice);
                }
                let latestRoll = roller.log.shift();
                setResult(latestRoll + "");
              }}
            >
              Roll
            </button>
            <button
              className="bg-slate-50 active:bg-slate-200 rounded-md px-2 m-1 w-[20%] min-w-fit text-black"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setResult("");
                setInput("");
                setDice("");
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      <button
        className="rounded-lg border border-zinc-600 p-4 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-white"
        onClick={(e) => {
          e.preventDefault();
          createMonster();
        }}
      >
        Add
      </button>
      <div className="sm:flex flex-wrap justify-center">
        {monsterList.map((monster: Monster) => {
          return (
            <MonsterCard
              key={monster.id}
              id={monster.id}
              hp={monster.hp}
              temp={monster.temp}
              maxHp={monster.maxHp}
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
