import "./App.css";
import Navbar from "./Component/navbar/Navbar";
import Transaction from "./Component/transaction/Transaction";
import TransactionTable from "./Component/transactionTable/TransactionTable";
import { Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="router">
        <Routes>
          <Route path="/" element={<Transaction />} />
          <Route path="/transaction_table" element={<TransactionTable />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
