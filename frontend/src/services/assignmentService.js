import api from "../api/axios";

export const createAssignment = (classroomId, assignmentData) => {
  return api.post(`/api/assignment/${classroomId}/create`, assignmentData);
}

export const fetchMyAssignments = (classroomId) => {
  return api.get(`/api/assignment/${classroomId}/my-assignments`);
}

export const fetchAssignmentById = (classroomId, assignmentId) => {
  return api.get(`/api/assignment/${classroomId}/assignments/${assignmentId}`);
}


// /my-submission/:assignmentId
