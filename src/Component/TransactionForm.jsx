import React, { useEffect, useState } from "react";

const TransactionForm = () => {
  // Generate a unique ID based on the current date and time
  const generateId = () => {
    return new Date().toDateString(); // Generates a unique string based on the current date and time
  };

  const timeID = () => {
    return new Date().toTimeString();
  };
  const [data, setData] = useState({
    description: "",
    amount: "",
    type: "",
    id: generateId(),
    time: timeID(),
  });
  //   console.log(Date());
  const [errors, setErrors] = useState({});
  const [itemName, setItemName] = useState([]);
  const handleData = (e) => {
    e.preventDefault();
    const error = {};
    if (!data.description) {
      error.description = "Require";
    } else if (!data.amount) {
      error.amount = "Require";
    } else if (!data.type) {
      error.type = "Require";
    } else {
      setItemName((preValue) => {
        return [
          ...preValue,
          {
            description: data.description,
            amount: data.amount,
            type: data.type,
            id: data.id,
            time: data.time,
          },
        ];
      });

      setData({
        description: "",
        amount: "",
        type: "",
      });
      alert("Data saved!");
    }
    setErrors(error);
    console.log(error);
  };
  useEffect(() => {
    const valueItem = JSON.stringify(itemName);
    localStorage.setItem("tododata", valueItem);
  }, [itemName]);
  return (
    <div>
      <div className="form_main">
        <div className="form_field_data">
          <form action="">
            <div className="coolinput">
              <label className="text" htmlFor="description">
                Description
              </label>
              <input
                className="input"
                id="description"
                name="description"
                type="text"
                placeholder="Enter Description"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
              <div className="error">
                {errors.description && errors.description}
              </div>
            </div>
            <div className="coolinput">
              <label className="text" htmlFor="amount">
                Amount
              </label>
              <input
                className="input"
                type="number"
                placeholder="Enter your amount"
                value={data.amount}
                onChange={(e) => setData({ ...data, amount: e.target.value })}
                name="amount"
                id="amount"
              />
              <div className="error">{errors.amount && errors.amount}</div>
            </div>

            <div className="coolinput1">
              <label className="text" htmlFor="type">
                Type of Transaction
              </label>
              <br />
              <select
                className="coolinput1"
                // className="className="coolinput1""
                name="type"
                id="type"
                value={data.type}
                onChange={(e) => setData({ ...data, type: e.target.value })}
              >
                <option
                  className="coolinput1"
                  data-testid="selectTransaction"
                  value="*"
                >
                  Select Transaction
                </option>
                <option
                  className="coolinput1"
                  data-testid="income"
                  value="income"
                >
                  Income
                </option>
                <option
                  className="coolinput1"
                  data-testid="expendture"
                  value="expendture"
                >
                  Expendture
                </option>
              </select>
              <div className="error">{errors.type && errors.type}</div>{" "}
            </div>

            <button onClick={handleData}>Click</button>
          </form>
        </div>
      </div>
      <div style={{ border: "1px solid black", width: "300px" }}>
        <ul>
          {itemName &&
            itemName.map((item) => (
              <li key={item.id}>
                Description:{item.description} || Amount:{item.amount} || Type
                of Transaction: {item.type} || Date:{item.id} || Time:
                {item.time}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionForm;
