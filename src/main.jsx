import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SidebarProvider from "./contexts/sidbarContext.jsx";
import LoadingProvider from "./contexts/loadingContext.jsx";
import NotificationsProvider from "./contexts/notificationContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <SidebarProvider>
        <LoadingProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </LoadingProvider>
      </SidebarProvider>
    </BrowserRouter>
);
