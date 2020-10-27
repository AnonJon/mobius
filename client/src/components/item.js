import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import BuyModal from "./buyModal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  ul: {
    display: "flex",
  },
  newPrice: {
    textDecoration: "line-through",
  },
}));

const Item = (props) => {
  const classes = useStyles();
  const [cost, setCost] = useState(props.item.fields.item_unit_cost);
  const [quantity, setquantity] = useState(props.item.fields.quantity);
  const [total, setTotal] = useState(
    props.item.fields.quantity * props.item.fields.item_unit_cost
  );
  const [newTotal, setNewTotal] = useState(false);
  const [totalChange, setTotalChange] = useState(false);
  const [changeDate, setChangeDate] = useState(false);

  const handleChildClick = (amount, date) => {
    setquantity(amount);
    setTotalChange(true);
    setTotal(quantity * cost);
    console.log(date);
    setChangeDate(date);
  };

  const onChangeAmount = (e) => {
    setTotal(e.target.value * cost);
    setquantity(e.target.value);
    setNewTotal(true);
  };
  return (
    <div>
      <div className={classes.ul}>
        <p>Quantity: </p>
        <TextField label={quantity} onChange={onChangeAmount} />
        <BuyModal
          uuid={props.uuid}
          amount={quantity}
          onChildClick={handleChildClick}
        />
      </div>

      <p>Cost Per Item: ${Math.round(cost * 100) / 100}</p>
      <p className={totalChange ? classes.newPrice : null}>
        Current Total: $
        {Math.round(
          props.item.fields.quantity * props.item.fields.item_unit_cost * 100
        ) / 100}
      </p>
      {newTotal ? <h2>New Total: ${Math.round(total * 100) / 100}</h2> : null}
      {changeDate ? <h3>Change Date: {changeDate}</h3> : null}
    </div>
  );
};
export default Item;
