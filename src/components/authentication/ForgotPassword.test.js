import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ForgotPassword from "./ForgotPassword";
import store from "../../context/indexReducer";

describe("Forgot Password component", () => {
  test("renders forgot password test", () => {
    // Arrange
    render(
      <Provider store={store}>
        <ForgotPassword/>
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
        <ForgotPassword/>
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
        <ForgotPassword/>
      </Provider>
    );
    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("Send Link");
    expect(helloWorldElement).toBeInTheDocument();
  });
});