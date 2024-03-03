import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Course from "./pages/Course/Course";
import Login from "./pages/Login/Login";
import NotFound from "./pages/404/404";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";
import Rating from "./pages/Rating/Rating";
import MyResults from "./pages/MyResults/MyResults";

function App() {
  const isAuthed = localStorage.getItem("token");
  return (
    <div className="App">
      {isAuthed ? (
        <>
        <Navbar/>
          <Routes>
            <Route index path="" element={<Home />} />
            <Route index path="/profile" element={<Profile/>} />
            <Route path="/rating" element={<Rating />} />
            <Route path="/my-results" element={<MyResults />} />
            <Route path="/course/:id" element={<Course />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
