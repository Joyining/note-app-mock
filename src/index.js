import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { CookiesProvider } from "react-cookie";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
serviceWorker.register();

// Apart from creating our store with reducers and reduxThunk as the middleware, we are also rendering the App component using the ReactDOM. The App component is wrapped in the Provider component of react-redux library. The Provider also takes the store prop and declares it as the entire application’s store.
