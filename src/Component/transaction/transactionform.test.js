import { render, screen } from "@testing-library/react";
import TransactionForm from "./TransactionForm";

describe("TransactionForm", () => {
  test("should check the all element", () => {
    render(<TransactionForm />);
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();
    expect(screen.getByLabelText("Type of Transaction")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter Description")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your amount")
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Click",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("selectTransaction", {
        name: "Select Transaction",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("income", {
        name: "Income",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("expendture", {
        name: "Expendture",
      })
    ).toBeInTheDocument();
  });
});
