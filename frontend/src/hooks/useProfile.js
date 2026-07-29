import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchProfile } from "../services/authService";


export function useProfile() {
  const [profile, setProfile] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const response = await fetchProfile();
      setProfile(response.data);
      console.log("User profile fetched:", response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return { profile, fetchUserProfile };
} 