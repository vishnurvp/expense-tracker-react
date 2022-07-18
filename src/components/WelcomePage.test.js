import WelcomePage from './WelcomePage';

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from '../context/indexReducer';

describe("Welcome page", () => {
  test("renders email verified if request succeeds", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => {return {users:[{email: 'vishnu@vishnu.vishnu', emailVerified: true }]}},
    });
    window.fetch.mockResolvedValueOnce({
        json: async () => {return {users:[{emailVerified: true }]}},
      });

    render(
      <Provider store={store}>
        <WelcomePage />
      </Provider>
    );

    const emailVerElement = await screen.findByText('email verified', {exact: false});
    expect(emailVerElement).toBeInTheDocument();
  });
});
