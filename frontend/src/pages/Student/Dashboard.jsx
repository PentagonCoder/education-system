import { useEffect, useState } from "react";
import api from "../../api/axios";
import { fetchProfile } from "../../services/authService";
import { useForm } from "react-hook-form";
import { joinClassroom } from "../../services/classroomService";
import { Link } from "react-router-dom";
import { fetchMyClassrooms } from "../../services/classroomService";
import { Profile } from "../../components/Profile";
import { useProfile } from "../../hooks/useProfile";
import { useClassroom } from "../../hooks/useClassroom";
import { JoinClassroom } from "../../components/student/joinClassroom";

function DashboardStudent() {
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { profile, fetchUserProfile } = useProfile();
  const { classrooms, error, fetchUserClassrooms, joinClassroombyCode } = useClassroom();

  useEffect(() => {

    fetchUserProfile();
    fetchUserClassrooms();
  }, []);

  return (
  <div className="space-y-8">

    <Profile profile={profile?.data} classroomCount={classrooms.length} />

    <JoinClassroom joinClassroombyCode={joinClassroombyCode} register={register} handleSubmit={handleSubmit} errors={errors} error={error} />

    {/* My Classrooms */}
    <div className="bg-white rounded-xl shadow-md p-6 border">
      <h2 className="text-2xl font-semibold mb-5">
        My Classrooms
      </h2>

      {classrooms.length === 0 ? (
        <p className="text-gray-500">
          You haven't joined any classroom yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classrooms.map((classroom) => (
            <Link
              key={classroom._id}
              to={`/student/classrooms/${classroom._id}`}
              className="border rounded-xl p-5 hover:shadow-lg hover:border-blue-500 transition"
            >
              <h3 className="text-xl font-semibold">
                {classroom.name}
              </h3>

              <p className="text-gray-500 mt-2">
                Open Classroom →
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>
);
}

export default DashboardStudent;