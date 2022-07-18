import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ForgotPassword from "./ForgotPassword";
import store from "../../context/indexReducer";
import userEvent from '@testing-library/user-event';

describe("Forgot Password component", () => {
  test("renders forgot password test", () => {
    // Arrange
    render(
      <Provider store={store}>
        <ForgotPassword />
      </Provider>
    );
    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("ForgotPassword");
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders forgot password test", () => {
    // Arrange
    render(
      <Provider store={store}>
        <ForgotPassword />
      </Provider>
    );
    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("Enter your registered email");
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders forgot password test", () => {
    // Arrange
    render(
      <Provider store={store}>
        <ForgotPassword />
      </Provider>
    );
    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("Send Link");
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders Sending Email if the button is clicked", () => {
    render(
      <Provider store={store}>
        <ForgotPassword />
      </Provider>
    );

    // Act
    const buttonElement = screen.getByRole('button')
    userEvent.click(buttonElement);

    const paragraphElement = screen.getByText("Sending Email", {exact: false});
    expect(paragraphElement).toBeInTheDocument();
  });

  test("renders send link if the button is not clicked", () => {
    render(
      <Provider store={store}>
        <ForgotPassword />
      </Provider>
    );

    const buttonElement = screen.getByText("Send Link", {exact: false});
    expect(buttonElement).toBeInTheDocument();
  });

  
});