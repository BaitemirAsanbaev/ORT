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

  useEffect(() => {
    async function fetchProfile() {
      const res = await getProfile();
      console.log(res);
      setProfileData(res);
    }
    fetchProfile();
  }, []);

  return (
    <div className={styles.profileContainer}>
      <h2>User Profile</h2>
      <div>
        <p>
          <strong>Language:</strong> {profileData.language}
        </p>

        <p>
          <strong>Class:</strong> {profileData._class}
        </p>

        <p>
          <strong>Age:</strong> {profileData.age}
        </p>

        <p>
          <strong>Sex:</strong> {profileData.sex}
        </p>

        <p>
          <strong>Phone:</strong> {profileData.phone}
        </p>

        <p>
          <strong>School:</strong> {profileData.school}
        </p>

        <p>
          <strong>University:</strong> {profileData.university}
        </p>

        <p>
          <strong>Specialization:</strong> {profileData.specialization}
        </p>

        <p>
          <strong>User ID:</strong> {profileData.user}
        </p>
      </div>
      <button onClick={()=>localStorage.clear()}>Logout</button>
    </div>
  );
};

export default Profile;
