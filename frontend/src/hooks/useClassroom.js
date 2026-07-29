import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchMyClassrooms, createClassroom, deleteClassroom, joinClassroom } from "../services/classroomService";


export function useClassroom() {
  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState(null);

  const fetchUserClassrooms = async () => {
    try {
      const response = await fetchMyClassrooms();
      setClassrooms(response.data.data);
      console.log("User classrooms fetched:", response.data);
    } catch (error) {
      console.error("Error fetching user classrooms:", error);
    }
  };

  const RemoveClassroom = async (classroomId) => {
    try {
      await deleteClassroom(classroomId);
      setClassrooms((prev) => prev.filter((classroom) => classroom._id !== classroomId));
    } catch (error) {
      console.error("Error deleting classroom:", error);
    }
  };

  const handleCreateClassroom = async (data) => {
    setError(null);
    try {
      const response = await createClassroom(data);
      setClassrooms((prev) => [...prev, response.data.data]);
      console.log("Classroom created:", response.data);
      setError(null);
      reset();
    } catch (err) {
      setError(err.response?.data?.message || "Create classroom failed");
    }
  };

  const joinClassroombyCode = async (data) => {
    setError(null);
    try {
      const response = await joinClassroom(data);
      setClassrooms([...classrooms, response.data.data]);
      console.log("Classroom joined:", response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Join classroom failed");
    }
  };  

  return { classrooms, error, fetchUserClassrooms, handleCreateClassroom, RemoveClassroom, joinClassroombyCode };
} 