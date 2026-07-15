import { createClassroomService } from "../Services/classroom.service.js";
import { createAssignmentService } from "../Services/assignment.service.js";

export const toolRegistry = {

  async createClassroom(args, req){

    const classroom = await createClassroomService(
      req.user._id,
      args.name,
      args.description
    );

    return {
      classroomId: classroom._id.toString(),
      classroomName: classroom.name,
    }
     
  },

  async createAssignment(args, req){

    const assignment = await createAssignmentService(
      req.user._id,
      args.classroomId,
      args.title,
      args.description,
      args.dueDate
    );

    return {
      assignmentId: assignment._id.toString(),
      title: assignment.title,
    };
  },

  async createAssignments(args, req) {

    const created = [];

    for (const assignment of args.assignments) {

      const newAssignment = await createAssignmentService(
          req.user._id,
          args.classroomId,
          assignment.title,
          assignment.description,
          assignment.dueDate
        );

      created.push(newAssignment);
    }

    return {
      createdCount: created.length
    };
  }

};