import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { TextField, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    width: "500px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    "& label.Mui-focused": {
      color: "green",
    },
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 500,
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "rgb(113,214, 195)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(113,214, 195)",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgb(113,214, 195)",
      },
      "&:hover fieldset": {
        borderColor: "rgb(113,214, 195)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgb(113,214, 195)",
      },
    },
  },
})(TextField);

const BuyModal = ({ onChildClick, uuid, amount }) => {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .put(
        `https://vtyhed13i2.execute-api.us-east-1.amazonaws.com/bom/1001/bomitem/${uuid}`,
        { amount: amount },
        config
      )
      .then((res) => {
        console.log(res.data.items[0].fields.quantity);

        onChildClick(res.data.items[0].fields.quantity);
      });

    handleClose();
  };

  return (
    <div>
      <Button color="primary" type="button" onClick={handleOpen}>
        Buy
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Container className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <CssTextField
                id="amount"
                name="amount"
                label={amount}
                type="text"
                margin="normal"
                required
                autoFocus
              />
              <h5>Confirm amount</h5>

              <Button color="primary" type="submit">
                Buy
              </Button>
            </form>
          </Container>
        </div>
      </Modal>
    </div>
  );
};

export default BuyModal;
