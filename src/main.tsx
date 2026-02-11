import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "../src/redux/store";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />

    <Toaster position="top-right" reverseOrder={false} />
  </Provider>,
);
