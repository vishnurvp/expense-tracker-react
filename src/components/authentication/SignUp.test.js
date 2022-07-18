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

  test("renders email test", () => {
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

  test("does not renders signing up test", () => {
    // Arrange
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    // Act
    // ... nothing

    // Assert
    const outputElement = screen.queryByText("Signing Up ...", {exact: false});
    expect(outputElement).toBeNull();
  });

  // test("renders sign up test", () => {
  //   // Arrange
  //   render(
  //     <Provider store={store}>
  //       <SignUp />
  //     </Provider>
  //   );
  //   // Act
  //   // ... nothing

  //   // Assert
  //   const helloWorldElement = screen.getByText("Confirm Password");
  //   expect(helloWorldElement).toBeInTheDocument();
  // });
});
