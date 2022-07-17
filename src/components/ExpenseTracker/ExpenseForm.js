import React, { Fragment, useEffect, useState } from "react";
import classes from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  const [expenses, setExpenses] = useState({});

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
        setExpenses(data);
      });
  }, []);

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
              console.log(data);
              setExpenses(data);
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

  return (
    <Fragment>
      <form onSubmit={formSubmitHandler} className={classes.form}>
        <label>Money spent in rupees</label>
        <br />
        <input id="costInp" type={"number"}></input>
        <br />
        <label>Select Catagory</label>
        <br />
        <select id="catagoryInp">
          <option value="food">Food</option>
          <option value="drinks">Drinks</option>
          <option value="fuel">Fuel</option>
          <option value="cloths">Cloths</option>
          <option value="other">Other</option>
        </select>
        <br />
        <label>Description</label>
        <br />
        <input id="descInp" type={"text"}></input>
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
            <li key={item}>
              {`cost: ${expenses[item].cost}\tcatagory: ${expenses[item].catagory}\tdescription: ${expenses[item].description}`}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default ExpenseForm;
