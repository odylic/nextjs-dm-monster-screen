import useStore, { State } from "../../store/store";
import { useState } from "react";

const MonsterCard = () => {
  const count = useStore((state: any) => state.count);
  const increase = useStore((state: any) => state.increase);
  const decrease = useStore((state: any) => state.decrease);

  return (
    <div className="relative">
      <div className="p-5 rounded-lg m-5 text-center shadow-monsterCard bg-gray-300">
        {/* close button */}
        <div className="absolute top-2 right-3 bg-slate-50 rounded-3xl">
          <button className="px-1">X</button>
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
        <div className="mt-2">
          <input
            type="number"
            className="w-16 h-10 text-center text-xl rounded-md mr-2"
            min="0"
            placeholder={count}
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
            />
            {/* increase */}
            <button
              className="bg-gray-50 px-2 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                console.log(count);
                increase(2);
              }}
            >
              +
            </button>
          </div>
        </form>
        <textarea className="resize" id="text" cols={25} rows={5}></textarea>
      </div>
    </div>
  );
};

export default MonsterCard;
