export const createAssignmentsTool = {

    name: "createAssignments",

    description:
        "Create multiple assignments inside the current classroom.",

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