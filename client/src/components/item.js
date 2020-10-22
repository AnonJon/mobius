import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import BuyModal from "./buyModal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  ul: {
    display: "flex",
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
        <BuyModal uuid={props.uuid} amount={quantity} />
      </div>

      <p>Cost Per Item: ${Math.round(cost * 100) / 100}</p>
      <p>
        Current Total: $
        {Math.round(
          props.item.fields.quantity * props.item.fields.item_unit_cost * 100
        ) / 100}
      </p>
      {!newTotal ? null : <h2>New Total: ${Math.round(total * 100) / 100}</h2>}
    </div>
  );
};
export default Item;
