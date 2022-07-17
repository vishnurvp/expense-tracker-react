import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./ExpenseForm.module.css";
import {expActions} from '../../context/expenseReducer';

const ExpenseForm = (props) => {
  const dispatch = useDispatch();
  const expenses = useSelector(state=>state.exp.expenses)
  const costInp = useRef();
  const selectInp = useRef();
  const descInp = useRef();

  useEffect(() => {
    fetch(
      `https://expensetracker-1febd-default-rtdb.firebaseio.com/expenses.json`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(expActions.setExpenses(data));
      });
  }, [dispatch]);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const cost = event.target.elements["costInp"].value;
    const catagory = event.target.elements["catagoryInp"].value;
    const description = event.target.elements["descInp"].value;
    if (!catagory) alert("Please select catagory");
    else {
      const expense = {
        id: Math.random(),
        cost: cost,
        catagory: catagory,
        description: description,
      };

      fetch(
        `https://expensetracker-1febd-default-rtdb.firebaseio.com/expenses.json`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(expense),
        }
      )
        .then((res) => res.json())
        .then((resData) => {
          if (!resData.error) {
            fetch(
              `https://expensetracker-1febd-default-rtdb.firebaseio.com/expenses.json`
            )
              .then((res) => res.json())
              .then((data) => {
                dispatch(expActions.setExpenses(data));
                event.target.elements["costInp"].value = "";
                event.target.elements["catagoryInp"].value = "";
                event.target.elements["descInp"].value = "";
              });
          } else {
            console.log(resData.error);
          }
        });
    }
  };

  const editExpenseClickHandler = (event) => {
    const expId = event.target.id;
    const expenseData = expenses[expId];
    costInp.current.value = expenseData.cost;
    selectInp.current.value = expenseData.catagory;
    descInp.current.value = expenseData.description;
    fetch(
      `https://expensetracker-1febd-default-rtdb.firebaseio.com/expenses/${event.target.id}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      // or get a new copy from server
      if (res.status === 200) {
        fetch(
          `https://expensetracker-1febd-default-rtdb.firebaseio.com/expenses.json`
        )
          .then((res) => res.json())
          .then((data) => {
            dispatch(expActions.setExpenses(data));
          });
      }
    });

  };

  const deleteExpenseClickHandler = (event) => {
    fetch(
      `https://expensetracker-1febd-default-rtdb.firebaseio.com/expenses/${event.target.id}.json`,
      {
        method: "DELETE",
      }
      // fileter the state object
    ).then((res) => {
      // or get a new copy from server
      if (res.status === 200) {
        fetch(
          `https://expensetracker-1febd-default-rtdb.firebaseio.com/expenses.json`
        )
          .then((res) => res.json())
          .then((data) => {
            dispatch(expActions.setExpenses(data));
          });
      }
    });
  };

  return (
    <Fragment>
      <form onSubmit={formSubmitHandler} className={classes.form}>
        <label>Money spent in rupees</label>
        <br />
        <input ref={costInp} id="costInp" type={"number"}></input>
        <br />
        <label>Select Catagory</label>
        <br />
        <select ref={selectInp} id="catagoryInp">
          <option value="food">Food</option>
          <option value="drinks">Drinks</option>
          <option value="fuel">Fuel</option>
          <option value="cloths">Cloths</option>
          <option value="other">Other</option>
        </select>
        <br />
        <label>Description</label>
        <br />
        <input ref={descInp} id="descInp" type={"text"}></input>
        <br />
        <button type="submit">Add</button>
        <br />
      </form>
      <div>
        <ul>
          {/* {expenses.map((item) => (
            <li key={item.id}>{`cost: ${item.cost}\tcatagory: ${item.catagory}\tdescription: ${item.description}`}</li>
          ))} */}
          {Object.keys(expenses).map((item) => (
            <li key={item} id={item}>
              {`cost: ${expenses[item].cost}\tcatagory: ${expenses[item].catagory}\tdescription: ${expenses[item].description}`}
              <button id={item} onClick={editExpenseClickHandler}>
                Edit
              </button>
              <button id={item} onClick={deleteExpenseClickHandler}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default ExpenseForm;
