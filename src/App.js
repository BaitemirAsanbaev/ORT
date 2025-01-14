import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
// import Course from "./pages/Course/Course";
import Login from "./pages/Login/Login";
import NotFound from "./pages/404/404";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";
import Rating from "./pages/Rating/Rating";
import MyResults from "./pages/MyResults/MyResults";
import TestPage from "./pages/TestPage/TestPage";
import CreateTest from "./pages/CreateTest/CreateTest";
import CreateCourse from "./pages/CreateCourse/CreateCourse";
import Footer from "./components/Footer/Footer";
import CreateStudent from "./pages/CreateStudent/CreateStudent";
import CreateProfile from "./pages/CreateProfile/CreateProfile";
import Students from "./pages/Students/Students";
// import car_radio from './car_radio.mp3'
// import top_cover from './cover.png'
function App() {
  const isAuthed = localStorage.getItem("token");
  // const music = {
  //   title:"Car radio",
  //   author:"Twenty one pilots",
  //   cover:top_cover,
  //   music:car_radio,
  //   id:1
  // }
  return (
    // <div>
    //   <Player music={music} liked={[1,2,3]}/>
    // </div>
    <div className="App">
      {isAuthed ? (
        <>
          <Navbar />
          <div className="content">
          <Routes>
            <Route index path="" element={<Home />} />
            <Route path="/rating" element={<Rating />} />
            <Route index path="/profile" element={<Profile />} />
            {/* <Route path="/course/:id" element={<Course />} /> */}

            {localStorage.getItem("role") === "Студент" ? (
              <>
                <Route path="/course/:id" element={<TestPage />} />
                <Route path="/my-results" element={<MyResults />} />
              </>
            ) : (
              <>
                <Route path="/create-test" element={<CreateTest />} />
                <Route path="/create-course" element={<CreateCourse />} />
                <Route path="/create-student" element={<CreateStudent />} />
                <Route path="/create-profile" element={<CreateProfile />} />
                <Route path="/course/:id" element={<TestPage />} />
                <Route path="/students" element={<Students />} />
              </>
            )}

            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
          <Footer />
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
