import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homepage";
import ProfilePage from "./scenes/profilepage";
import LoginPage from "./scenes/loginpage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline,ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";


function App() {
  // useSelector: to grab the information(current state) from the redux store
  const mode =useSelector((state)=>state.mode);
  // here we setup our theme by using the selected mode and pass it to material ui
  // useMemo: function that returns a memoized value
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      {/* CSSBaseline does the following: The margin in all browsers is removed.
          The default Material Design background color is applied.
          Font antialiasing is enabled for better display of the Roboto font. */}
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;