export function Profile ({ profile, classroomCount }) {
  return (
    <div className="bg-white rounded-xl shadow-md border p-6">
      <h1 className="text-3xl font-bold mb-6">
        {profile?.role} Dashboard
      </h1>

      <h2 className="text-xl font-semibold mb-4">
        Welcome back, {profile?.fullname} 👋
      </h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Name:</span>{" "}
          {profile?.fullname}
        </p>

        <p>
          <span className="font-semibold">Email:</span>{" "}
          {profile?.email}
        </p>

        <p>
          <span className="font-semibold">Role:</span>{" "}
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded capitalize">
            {profile?.role}
          </span>
        </p>
      </div>
      <p className="text-gray-500 mt-2">
        You have {profile?.role === "teacher" ? "created" : "joined"} {classroomCount} classroom
        {classroomCount !== 1 && "s"}.
      </p>
    </div>
  )
}