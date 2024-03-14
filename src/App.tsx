import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/Theme";
import Header from "./components/Header";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import {  UserContextProvider } from "./contexts/UserContext";
import UserDashboardView from "./views/UserDashboardView";
import { ModalContextProvider } from "./contexts/ModalContext";
import ErrorModal from "./components/Modal";
import NewPlanView from "./views/NewPlanView";
import React from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import PlanView from "./views/PlanView";

function App() { 
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ModalContextProvider>
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
            </Routes>
          </UserContextProvider>
        </BrowserRouter>
        <ErrorModal />
      </ModalContextProvider>
    </ThemeProvider>
  );
}

export default App;
