import useStore, { State } from "../../store/store";
import { useState } from "react";
import { Monster } from "../../store/store";

const MonsterCard = ({ id, hp, temp }: Monster) => {
  const removeMonster = useStore((state) => state.removeMonster);
  const [input, setInput] = useState();
  const setHp = useStore((state) => state.setHp);
  const getId = useStore((state) => state.getId);

  const resetInput = (e) => {
    e.target.placeholder = "";
  };

  const resetValue = (e) => {
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
              removeMonster(id);
              console.log(id);
            }}
          >
            X
          </button>
        </div>
        <div>
          {/* Name */}
          <input
            type="text"
            className="text-center text-xl w-60 h-10 rounded-md"
            placeholder="Monster Name"
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
            // onFocus={}
            // onChange={(e) => {

            // }}
          />
          {/* Temp */}
          <input
            type="number"
            className="text-center text-xl rounded-md w-16 h-10"
            placeholder="Temp"
            min="0"
          />
        </div>
        <form>
          {/* Counter */}
          <div className="m-2">
            {/* decrease */}
            <button className="bg-gray-50 px-2 rounded-md">-</button>
            {/* value */}
            <input
              type="number"
              className="mx-2 w-24 text-center rounded-md"
              min="0"
              placeholder="Dmg/Heal"
              value={input}
              onFocus={(e) => {
                resetValue(e);
                // resetInput(e);
              }}
              onChange={(e: any) => {
                setInput(e.target.value);
                console.log(input);
              }}
            />
            {/* increase */}
            <button
              className="bg-gray-50 px-2 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                getId(id);
              }}
            >
              +
            </button>
          </div>
        </form>
        <textarea className="resize" id="text" cols={25} rows={5} />
      </div>
    </div>
  );
};

export default MonsterCard;
