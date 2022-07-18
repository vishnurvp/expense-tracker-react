import ExpenseForm from "./ExpenseForm";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../context/indexReducer";

describe("Expense Form", () => {
  test("renders posts if request succeeds", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "first post" }],
    });
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
  });
});
