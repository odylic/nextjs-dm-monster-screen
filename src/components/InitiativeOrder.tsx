import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectInitiativeOrder,
  addToInitiativeOrder,
  deleteFromInitiativeOrder,
  sortInitiativeOrder,
  setInitiativeOrder,
  Initiative,
} from "../app/slices/MonsterSlice";
import uuid from "react-uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const InitiativeOrder = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [initiative, setInitiative] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [copyInitiative, setCopyInitiative] = useState("");
  const [success, setSuccess] = useState(false);

  const initiativeOrder = useSelector(selectInitiativeOrder);

  const initiativeCopy = initiativeOrder.map((item, index) => item.name);
  const makeIntoString = initiativeCopy.join("\n");

  useEffect(() => {
    setCopyInitiative(makeIntoString);
  }, [initiativeOrder, makeIntoString]);

  const resetValue = (e: any) => {
    e.target.value = "";
  };

  const reorder = (
    list: Initiative[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onEnd = (result) => {
    dispatch(
      setInitiativeOrder(
        reorder(initiativeOrder, result.source.index, result.destination.index)
      )
    );
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
          <div className="flex w-full">
            <button
              className="w-[48%] bg-slate-50 active:bg-slate-200 rounded-md m-1 h-10"
              onClick={(e) => {
                e.preventDefault();
                dispatch(sortInitiativeOrder(null));
              }}
            >
              Sort
            </button>
            <button
              className="w-[50%] bg-slate-50 rounded-md m-1 h-10 active:bg-slate-200"
              onClick={(e) => {
                e.preventDefault();
                setCopyInitiative(makeIntoString);
                navigator.clipboard.writeText(copyInitiative).then(
                  () => setSuccess(true),
                  () => setSuccess(false)
                );
              }}
            >
              {success ? "Copied" : "Copy"}
            </button>
          </div>
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
                className="w-[20%] h-10 bg-slate-50 active:bg-slate-200 rounded-md m-1"
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
                }}
              >
                Enter
              </button>
            </div>
          </form>

          <DragDropContext onDragEnd={onEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className="initiativeOrderList">
                  {initiativeOrder.map((item, index) => (
                    <Draggable
                      draggableId={String(item.id)}
                      key={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="flex w-full"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="w-[50%] m-1 px-2 h-7 bg-purple-900 rounded-md text-white truncate">
                            {item.name}
                          </div>
                          <div className="w-[30%] m-1 h-7 bg-purple-900 px-2 rounded-md text-white">
                            {item.initiative}
                          </div>
                          <button
                            className="w-[20%] h-7 px-2 rounded-md m-1 bg-purple-900 active:bg-purple-800 text-white"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(deleteFromInitiativeOrder(item.id));
                            }}
                          >
                            X
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

export default InitiativeOrder;
