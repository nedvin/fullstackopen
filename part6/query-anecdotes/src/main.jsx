import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { NotificationContextProvider } from "../NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContextProvider>
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  </NotificationContextProvider>
);
