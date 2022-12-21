import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectInitiativeOrder,
  addToInitiativeOrder,
  deleteFromInitiativeOrder,
} from "../app/slices/MonsterSlice";
import uuid from "react-uuid";

const InitiativeOrder = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [initiative, setInitiative] = useState("");
  const [visibility, setVisibility] = useState(false);

  const initiativeOrder = useSelector(selectInitiativeOrder);

  const resetValue = (e: any) => {
    e.target.value = "";
  };

  return (
    <div>
      {!visibility && (
        <div className="fixed top-0 right-0 bg-initiativeBackground text-center">
          <button
            className="flex p-3"
            onClick={(e) => {
              e.preventDefault();
              if (visibility) setVisibility(false);
              if (!visibility) setVisibility(true);
            }}
          >
            <ArrowForwardIosIcon fontSize="large" />
          </button>
        </div>
      )}

      {visibility && (
        <div className="fixed top-0 bg-initiativeBackground h-screen w-[50vw] left-[50vw] sm:w-[30vw] sm:left-[70vw]">
          <div className="">
            <button
              className="flex p-3"
              onClick={(e) => {
                e.preventDefault();
                if (visibility) setVisibility(false);
                if (!visibility) setVisibility(true);
              }}
            >
              <ArrowBackIosIcon fontSize="large" />
              <h1 className="text-3xl font-serif">Initiative Order</h1>
            </button>
          </div>
          {/* <div>
            <button>Sort</button>
            <button>Copy</button>
          </div> */}
          <form>
            <div className="flex w-full">
              <input
                className="w-[50%] h-10 m-1 rounded-md px-2"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                className="w-[30%] h-10 m-1 rounded-md px-2"
                placeholder="Initiative"
                value={initiative}
                type="number"
                onChange={(e) => {
                  setInitiative(e.target.value);
                }}
              />
              <button
                disabled={!name || !initiative}
                className="w-[20%] h-10 bg-slate-50 rounded-md m-1"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    addToInitiativeOrder({
                      name: name,
                      initiative: Math.abs(Number(initiative)),
                      id: uuid(),
                    })
                  );
                  setName("");
                  setInitiative("");
                  console.log(initiativeOrder);
                }}
              >
                Enter
              </button>
            </div>
          </form>

          <div>
            {initiativeOrder.map((item, index) => {
              return (
                <div className="flex w-full" key={index}>
                  <div className="w-[50%] m-1 px-2 h-7 bg-slate-50 rounded-md">
                    {item.name}
                  </div>
                  <div className="w-[30%] m-1 h-7 bg-slate-50 px-2 rounded-md ">
                    {item.initiative}{" "}
                  </div>
                  <button
                    className="w-[20%] h-7 px-2 bg-slate-50 rounded-md m-1"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(deleteFromInitiativeOrder(item.id));
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default InitiativeOrder;
