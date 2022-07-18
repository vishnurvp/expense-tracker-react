import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import SignUp from "./SignUp";
import store from "../../context/indexReducer";

describe("signup component", () => {
  test("renders sign up test", () => {
    // Arrange
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("Sign Up");
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders sign up test", () => {
    // Arrange
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("Email");
    expect(helloWorldElement).toBeInTheDocument();
  });
  test("renders sign up test", () => {
    // Arrange
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("Password");
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders sign up test", () => {
    // Arrange
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("Confirm Password");
    expect(helloWorldElement).toBeInTheDocument();
  });
});
