// Profile.js

import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/requests";
import styles from "./Profile.module.scss"; // Import the styles

const Profile = () => {
  // Sample data for the profile
  const [profileData, setProfileData] = useState({
    id: 1,
    readOnly: true,
    language: "English",
    _class: "Class A",
    age: 25,
    sex: "Male",
    phone: "123-456-7890",
    school: "High School",
    university: "University of Example",
    specialization: "Computer Science",
    user: 123,
  });
  const [userInfo, setUserInfo] = useState({
    email: "",
    firstname: "",
    lastname: "",
  });
  useEffect(() => {
    async function fetchProfile() {
      const res = await getProfile();
      console.log(res);
      setProfileData(res);
      const storedEmail = localStorage.getItem("email");
      const storedFirstname = localStorage.getItem("firstname");
      const storedLastname = localStorage.getItem("lastname");

      // Update userInfo state
      setUserInfo({
        email: storedEmail || "",
        firstname: storedFirstname || "",
        lastname: storedLastname || "",
      });
    }
    fetchProfile();
  }, []);

  return (
    <div className={styles.profileContainer}>
      <h2>Профиль</h2>
      <div>
        <p>
          <strong>Email:</strong> {userInfo.email}
        </p>

        <p>
          <strong>Имя:</strong> {userInfo.firstname}
        </p>

        <p>
          <strong>Фамилия:</strong> {userInfo.lastname}
        </p>
        {localStorage.getItem("role") === "Учитель" ? (
          <></>
        ) : (
          <>
            <p>
              <strong>Класс:</strong> {profileData._class}
            </p>

            <p>
              <strong>Возраст:</strong> {profileData.age}
            </p>

            <p>
              <strong>Пол:</strong> {profileData.sex}
            </p>

            <p>
              <strong>Телефон:</strong> {profileData.phone}
            </p>

            <p>
              <strong>Школа:</strong> {profileData.school}
            </p>

            <p>
              <strong>Университет:</strong> {profileData.university}
            </p>

            <p>
              <strong>Специализация:</strong> {profileData.specialization}
            </p>
          </>
        )}
      </div>
      <button onClick={() => {localStorage.clear(); window.location = "/login"}}>Выйти</button>
    </div>
  );
};

export default Profile;
