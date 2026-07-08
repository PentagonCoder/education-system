import api from "../api/axios";

export const createSubmission = (assignmentId, submissionData) => {
  return api.post(`/api/submission/create/${assignmentId}`, submissionData);
}

  // /my-submission/:assignmentId

export const fetchMySubmissions = (assignmentId) => {
  return api.get(`/api/submission/my-submission/${assignmentId}`);
}

export const fetchSubmissionById = (assignmentId) => {
  return api.get(`/api/submission/${assignmentId}`);
}