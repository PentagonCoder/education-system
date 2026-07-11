export const createClassroomTool = {

  name:"createClassroom",

  description: "Create a new classroom for the teacher.",

  parameters: {
    type: "object",
     
    properties: { 
      name: {
        type: "string",
        description: "The classroom name"
      },
      description: {
        type: "string",
        description: "Description of the classroom."
      }
    },
    required: ["name"],
  }
}