import { ClassroomCard } from "./ClassroomCard";

export function ClassroomList({
    userClassrooms,
    onDelete
}) {
  return (
    <div className="bg-white rounded-xl shadow-md border p-6">
      <h2 className="text-2xl font-semibold mb-5">
        My Classrooms
      </h2>

      {userClassrooms.length === 0 ? (
        <p className="text-gray-500">
          No classrooms created yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {userClassrooms.map((classroom) => (
            <ClassroomCard
              key={classroom._id}
              classroom={classroom}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}