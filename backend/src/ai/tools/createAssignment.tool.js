export const createAssignmentTool = {
  name: "createAssignment",

  description:
    "Create ONE assignment only. Do not use this tool when multiple assignments are requested.",

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