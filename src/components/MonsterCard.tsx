import { useState } from "react";
import {
  Monster,
  deleteMonster,
  setHp,
  setTemp,
  incrementByAmount,
  decrementByAmount,
} from "../app/slices/MonsterSlice";
import { useDispatch } from "react-redux";

const MonsterCard = ({ hp, id, temp }: Monster) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const resetValue = (e: any) => {
    e.target.value = "";
  };

  return (
    <div className="relative">
      <div className="p-5 rounded-lg m-5 text-center shadow-monsterCard bg-purple-900">
        {/* close button */}
        <div className="absolute top-2 right-3 bg-slate-50 rounded-3xl">
          <button
            className="px-1"
            onClick={(e) => {
              e.preventDefault();
              dispatch(deleteMonster(id));
            }}
          >
            X
          </button>
        </div>
        <div>
          {/* Name */}
          <input
            type="text"
            className="text-center text-2xl w-60 h-10 rounded-md truncate"
            placeholder="Name"
          />
        </div>
        {/* HP */}
        <div className="flex justify-center">
          <h1 className="text-white text-3xl">{hp}</h1>
          <h1 className="text-white text-3xl ml-1">({temp})</h1>
        </div>
        <div className="mt-2">
          <input
            type="number"
            className="w-16 h-10 text-center text-xl rounded-md mr-2"
            min="0"
            placeholder="HP"
            onFocus={(e) => {
              resetValue(e);
            }}
            onBlur={(e) => {
              resetValue(e);
            }}
            onChange={(e) => {
              e.preventDefault();
              dispatch(setHp({ hp: Math.abs(Number(e.target.value)), id: id }));
            }}
            onKeyDown={(e) => e.key === "e" && e.preventDefault()}
          />
          {/* Temp */}
          <input
            type="number"
            className="text-center text-xl rounded-md w-16 h-10"
            placeholder="Temp"
            min="0"
            onFocus={(e) => {
              resetValue(e);
            }}
            onBlur={(e) => {
              resetValue(e);
            }}
            onChange={(e) => {
              e.preventDefault();
              dispatch(
                setTemp({ temp: Math.abs(Number(e.target.value)), id: id })
              );
            }}
            onKeyDown={(e) => e.key === "e" && e.preventDefault()}
          />
        </div>
        <form>
          {/* Counter */}
          <div className="m-2 flex justify-center">
            {/* value */}
            <input
              type="number"
              className="mx-2 w-32 mt-3 h-10 text-center rounded-md "
              min="0"
              placeholder="Dmg/Heal"
              value={input}
              onFocus={(e) => {
                e.preventDefault();
                resetValue(e);
              }}
              onChange={(e: any) => {
                setInput(e.target.value);
              }}
              onKeyDown={(e) => e.key === "e" && e.preventDefault()}
            />
            {/* increase */}
            <div className="flex flex-col">
              <button
                className="bg-gray-50 active:bg-slate-200 px-2 py-1 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  if (input === "")
                    dispatch(
                      incrementByAmount({ damage: Math.abs(Number(1)), id: id })
                    );
                  dispatch(
                    incrementByAmount({
                      damage: Math.abs(Number(input)),
                      id: id,
                    })
                  );
                  setInput("");
                }}
                type="button"
              >
                +
              </button>
              {/* decrease */}
              <button
                className="bg-gray-50 active:bg-slate-200 px-2 py-1 rounded-md mt-1"
                onClick={(e) => {
                  e.preventDefault();
                  if (input === "")
                    dispatch(
                      decrementByAmount({ damage: Math.abs(Number(1)), id: id })
                    );
                  dispatch(
                    decrementByAmount({
                      damage: Math.abs(Number(input)),
                      id: id,
                    })
                  );
                  setInput("");
                }}
                type="submit"
              >
                -
              </button>
            </div>
          </div>
        </form>
        <textarea className="resize p-2" id="text" cols={25} rows={5} />
      </div>
    </div>
  );
};

export default MonsterCard;
