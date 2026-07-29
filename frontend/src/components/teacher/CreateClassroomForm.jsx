export function CreateClassroomForm({ onSubmit, register, errors, error }) {
  return(
    <div className="bg-white rounded-xl shadow-md border p-6">
      <h2 className="text-2xl font-semibold mb-5">
        Create Classroom
      </h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="flex gap-4"
      >
        <input
          type="text"
          placeholder="Classroom Name"
          {...register("name", { required: true })}
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Classroom Description"
          {...register("description")}
          className="flex-2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition"
        >
          Create
        </button>
      </form>

      {errors?.name && (
        <p className="text-red-500 mt-2">
          Classroom name is required
        </p>
      )}
    </div>
  )
}