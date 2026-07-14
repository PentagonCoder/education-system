export const createAssignmentTool = {
  name: "createAssignment",

  description:
    "Create an assignment inside a classroom.",

  parameters: {
    type: "object",

    properties: {

      title: {
        type: "string",
      },

      description: {
        type: "string",
      },

      dueDate: {
        type: "string",
        description: "YYYY-MM-DD",
      },
    },

    required: ["title", "dueDate"],
  },
};