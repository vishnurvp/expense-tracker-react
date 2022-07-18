import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import EditProfile from './EditProfile';
import store from "../../context/indexReducer";

describe("Edit Profile component", () => {
    test("renders Edit profile test", () => {
        // Arrange
        render(
          <Provider store={store}>
            <EditProfile/>
          </Provider>
        );
        // Act
        // ... nothing
    
        // Assert
        const helloWorldElement = screen.getByText("Your Name");
        expect(helloWorldElement).toBeInTheDocument();
      });

      test("renders Edit profile test", () => {
        // Arrange
        render(
          <Provider store={store}>
            <EditProfile/>
          </Provider>
        );
        // Act
        // ... nothing
    
        // Assert
        const helloWorldElement = screen.getByText("Your Photo URL");
        expect(helloWorldElement).toBeInTheDocument();
      });
});
