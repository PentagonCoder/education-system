export function createAgentContext(req) {
  return {
    teacherId: req.user._id,
    classroomId: null,
    classroomName: null,
  };
}