import React from "react";
import "../App.css";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Counter = ({onStateChange}) => {

  const [count, setCount] = useState(0);

  const handleClickAdd = () => {
    setCount(count + 1);
    onStateChange(count + 1);
  };
  const handleClickSub = () => {
    if (count > 0) {
      setCount(count - 1);
      onStateChange(count - 1);
    }
  };

  return (
    <div>
      Quantity:
      <span className="quantity">
        <RemoveIcon onClick={handleClickSub} className="icon1" />
        {count}
        <AddIcon onClick={handleClickAdd} className="icon1" />
      </span>
    </div>
  );
};

export default Counter;
