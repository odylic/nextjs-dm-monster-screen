import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const InitiativeOrder = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [initiative, setInitiative] = useState("");
  const [visibility, setVisibility] = useState(false);

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
        <div className="fixed top-0 bg-initiativeBackground h-screen w-[20vw] left-[80vw]">
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
        </div>
      )}
    </div>
  );
};

export default InitiativeOrder;
