import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import DashboardTeacher from "./pages/Teacher/Dashboard";
import DashboardStudent from "./pages/Student/Dashboard";
import Members from "./pages/Members";
import Settings from "./pages/Settings";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/layout/Layout";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";
import Register from "./pages/Auth/Register";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import ClassroomDetails from "./pages/Teacher/ClassroomDetails";
import ClassroomDetailsStudent from "./pages/Student/ClassroomDetails";
import AssignmentDetail from "./pages/Student/AssignmentDetails";
import AssignmentDetailTeacher from "./pages/Teacher/AssignmentDetails";
function App() {

  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/verify-email/:token" element={<VerifyEmail />}/>
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/teacher/dashboard" element={<DashboardTeacher />} />
        <Route path="/teacher/classrooms/:classroomId" element={<ClassroomDetails />} />
        <Route path="/student/classrooms/:classroomId" element={<ClassroomDetailsStudent />} />
        <Route path="/student/classrooms/:classroomId/assignments/:assignmentId" element={<AssignmentDetail />} />
        <Route path="/teacher/classrooms/:classroomId/assignments/:assignmentId" element={<AssignmentDetailTeacher />} />
        <Route path="/student/dashboard" element={<DashboardStudent />} />
        <Route path="/members" element={<Members />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;