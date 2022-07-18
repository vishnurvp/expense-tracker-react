import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import LogIn from "./LogIn";
import store from "../../context/indexReducer";

describe("LogIn component", () => {
  test("renders login test", () => {
    // Arrange
    render(
      <Provider store={store}>
        <LogIn />
      </Provider>
    );
    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("Log In");
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders sign up test", () => {
    // Arrange
    render(
      <Provider store={store}>
        <LogIn />
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
        <LogIn />
      </Provider>
    );
    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("Password");
    expect(helloWorldElement).toBeInTheDocument();
  });
});