import { useEffect, useState } from "react";
import { fetchProfile } from "../../services/authService";
import { fetchMyClassrooms, createClassroom, deleteClassroom } from "../../services/classroomService";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Profile } from "../../components/Profile";
import { CreateClassroomForm } from "../../components/teacher/CreateClassroomForm";
import { ClassroomList } from "../../components/teacher/ClassroomList";
import { useProfile } from "../../hooks/useProfile";
import { useClassroom } from "../../hooks/useClassroom";

function DashboardTeacher() {
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { profile, fetchUserProfile } = useProfile();
  const { classrooms, fetchUserClassrooms, handleCreateClassroom, RemoveClassroom } = useClassroom();

  useEffect(() => {
    fetchUserProfile();
    fetchUserClassrooms();
  }, []);

  return (
    <div className="space-y-8">

      <Profile profile={profile?.data} classroomCount={classrooms.length} />

      <CreateClassroomForm onSubmit={handleSubmit(handleCreateClassroom)} register={register} errors={errors} error={error} />
      
      <ClassroomList userClassrooms={classrooms} onDelete={RemoveClassroom} />

    </div>
  );
}

export default DashboardTeacher;