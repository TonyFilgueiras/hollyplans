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
import { ErrorContextProvider } from "./contexts/ErrorContext";
import ErrorModal from "./components/ErrorModal";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ErrorContextProvider>
        <BrowserRouter>
          <UserContextProvider>
            <Header />
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/dashboard" element={<UserDashboardView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/register" element={<RegisterView />} />
            </Routes>
          </UserContextProvider>
        </BrowserRouter>
        <ErrorModal/>
      </ErrorContextProvider>
    </ThemeProvider>
  );
}

export default App;
