import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/Theme";
import Header from "./components/Header";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import { UserContextProvider } from "./contexts/UserContext";
import UserDashboardView from "./views/UserDashboardView";
import { WarningModalContextProvider } from "./contexts/WarningModalContext";
import WarningModal from "./components/WarningModal";
import NewPlanView from "./views/NewPlanView";
import React from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import PlanView from "./views/PlanView";
import { ConfirmModalContextProvider } from "./contexts/ConfirmModalContext";
import NotFoundView from "./views/NotFoundView";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <WarningModalContextProvider>
        <ConfirmModalContextProvider>
          <BrowserRouter>
            <UserContextProvider>
              <Header />
              <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/register" element={<RegisterView />} />
                <Route
                  path="/plans"
                  element={
                    <ProtectedRoutes>
                      <UserDashboardView />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="/plans/:id"
                  element={
                    <ProtectedRoutes>
                      <PlanView />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="/newplan"
                  element={
                    <ProtectedRoutes>
                      <NewPlanView />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="/edit/:id"
                  element={
                    <ProtectedRoutes>
                      <NewPlanView />
                    </ProtectedRoutes>
                  }
                />
                <Route path="/*" element={<NotFoundView />} />
              </Routes>
            </UserContextProvider>
          </BrowserRouter>
          <WarningModal />
        </ConfirmModalContextProvider>
      </WarningModalContextProvider>
    </ThemeProvider>
  );
}

export default App;
