import React, { useEffect, useState } from "react";
import TransactionTable from "../transactionTable/TransactionTable";
import { CSVLink, CSVDownload } from "react-csv";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Chart from "chart.js/auto";

const TransactionForm = () => {
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });
  const [data, setData] = useState({
    description: "",
    amount: "",
    type: "",
    id: new Date().toDateString(),
    time: new Date().toTimeString(),
  });
  console.log(new Date());
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
  }, []);
  return (
    <div>
      <div className="form_main">
        <div className="form_field_data">
          <form action="">
            <div className="form_data">
              <div className="coolinput w-full max-w-xs p-5 bg-white rounded-lg font-mono">
                <h2 className="text-center font-thin">
                  <u>Transaction Detai</u>
                </h2>
                <label
                  className="text block text-gray-700 text-sm font-bold  mt-5 mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  className="input text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
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
              <div className="coolinput coolinput w-full max-w-xs p-5 bg-white rounded-lg font-mono">
                <label
                  className="text text block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="amount"
                >
                  Amount
                </label>
                <input
                  className="input text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                  type="number"
                  placeholder="Enter your amount"
                  value={data.amount}
                  onChange={(e) => setData({ ...data, amount: e.target.value })}
                  name="amount"
                  id="amount"
                />
                <div className="error">{errors.amount && errors.amount}</div>
              </div>

              <div className="coolinput1 coolinput w-full max-w-xs p-5 bg-white rounded-lg font-mono">
                <label
                  className="text text block text-gray-700 text-sm font-bold mb"
                  htmlFor="type"
                >
                  Type of Transaction
                </label>
                <br />
                <select
                  className="coolinput1 text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                  // className="className="coolinput1""
                  name="type "
                  id="type"
                  value={data.type}
                  onChange={(e) => setData({ ...data, type: e.target.value })}
                >
                  <option
                    className="coolinput1 text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                    data-testid="selectTransaction"
                    value="*"
                  >
                    Select Transaction
                  </option>
                  <option
                    className="coolinput1 text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                    data-testid="income"
                    value="income"
                  >
                    Income
                  </option>
                  <option
                    className="coolinput1 text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                    data-testid="expendture"
                    value="expendture"
                  >
                    Expendture
                  </option>
                </select>
                <div className="error">{errors.type && errors.type}</div>{" "}
              </div>
            </div>
            <div className="button">
              <button onClick={handleData}>Click</button>
            </div>
          </form>
        </div>
      </div>
      {itemName[0] && (
        <div>
          <CSVLink data={itemName}>
            <button>Download me</button>
          </CSVLink>
          <button
            onClick={() => {
              handlePrint(null, () => contentToPrint.current);
            }}
          >
            PRINT
          </button>
          <ul>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Mode of Transaction</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {itemName &&
                  itemName.map((items) => {
                    return (
                      <tr>
                        <td>{new Date().toDateString()}</td>
                        <td>{items.description}</td>
                        <td>₹ {items.amount}</td>
                        <td>{items.type}</td>
                        <td>{new Date().toTimeString()}</td>
                      </tr>
                    );
                  })}
                {/* // <li key={items.id}>
                 //   Description:{items.description} || Amount:{items.amount} || Type
                 //   of Transaction: {items.type} || Date:{items.id} || Time:
                 //   {items.time}
                 // </li> */}
              </tbody>
            </table>
          </ul>
        </div>
      )}
    </div>
  );
};

export default React.memo(TransactionForm);
