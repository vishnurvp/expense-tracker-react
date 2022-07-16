import React, { Fragment, useState } from "react";
import classes from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  const [expenses, setExpenses] = useState([]);

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

      setExpenses((old) => [...old, expense]);
      console.log(cost, catagory, description);
      event.target.elements["costInp"].value = "";
      event.target.elements["catagoryInp"].value = "";
      event.target.elements["descInp"].value = "";
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
          {expenses.map((item) => (
            <li key={item.id}>{`cost: ${item.cost}\tcatagory: ${item.catagory}\tdescription: ${item.description}`}</li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default ExpenseForm;
