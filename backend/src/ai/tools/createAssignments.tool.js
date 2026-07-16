export const createAssignmentsTool = {

    name: "createAssignments",

    description:
        "Create MULTIPLE assignments in one call. Use this tool whenever the user requests two or more assignments.",

    parameters: {

        type: "object",

        properties: {

            assignments: {

                type: "array",

                items: {

                    type: "object",

                    properties: {

                        title: {
                            type: "string"
                        },

                        description: {
                            type: "string"
                        },

                        dueDate: {
                            type: "string"
                        }

                    },

                    required: [
                        "title",
                        "dueDate"
                    ]

                }

            }

        },

        required: ["assignments"]

    }

};