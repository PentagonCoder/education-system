import api from "../api/axios";

export const createClassroom = (name) => {
  return api.post("/api/classroom/create", name);
}

export const fetchMyClassrooms = () => {
  return api.get("/api/classroom/my-classrooms");
};

export const fetchClassroomById = (classroomId) => {
  return api.get(`/api/classroom/${classroomId}`);
}

export const updateClassroom = (classroomId, updatedData) => {
  return api.patch(`/api/classroom/${classroomId}`, updatedData);
}

export const joinClassroom = (invitationToken) => {
  return api.post("/api/classroom/join-classroom", invitationToken);
};

export const deleteClassroom = (classroomId) => {
  return api.delete(`/api/classroom/${classroomId}`);
};