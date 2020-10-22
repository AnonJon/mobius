import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Item from "./item";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  ul: {
    display: "flex",
  },
}));

const Cart = () => {
  const classes = useStyles();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getURL =
      "https://vtyhed13i2.execute-api.us-east-1.amazonaws.com/bom/1001";
    axios.get(getURL).then((res) => {
      setItems(res.data.items);
    });
  }, []);
  let item_total = 0;
  items.forEach((item) => {
    let x = item.fields.quantity * item.fields.item_unit_cost;
    item_total += x;
  });

  return (
    <div>
      <h1>Cart Items</h1>
      {items.map((item) => {
        return (
          <div>
            <h1>{item.model}</h1>
            <ul>
              <Item uuid={item.fields.uuid} item={item} />
            </ul>
          </div>
        );
      })}
      <h1>--------------------------------------</h1>
      <h1>Total Cost</h1>
      <h1>${item_total}</h1>
    </div>
  );
};

export default Cart;
