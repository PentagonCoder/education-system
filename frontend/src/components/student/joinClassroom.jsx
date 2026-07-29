export function JoinClassroom({ joinClassroombyCode, register, handleSubmit, errors, error }) {

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border">
      <h2 className="text-2xl font-semibold mb-5">
        Join Classroom
      </h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit(joinClassroombyCode)}
        className="flex gap-4"
      >
        <input
          type="text"
          placeholder="Enter Classroom Code"
          {...register("invitationToken", { required: true })}
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
          type="submit"
        >
          Join
        </button>
      </form>

      {errors?.invitationToken && (
        <p className="text-red-500 mt-2">
          Classroom Code is required
        </p>
      )}
    </div>
  )
}