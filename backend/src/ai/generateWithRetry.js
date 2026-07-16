import { tools } from "./tools.js";

export async function generateWithRetry(ai, contents) {

  let retries = 3;

  while (retries > 0) {

    try {

      return await ai.models.generateContent({
        model: "gemini-3.5-flash",

        config: {
          tools,
          systemInstruction: `
            You are an AI classroom assistant.

            Rules:

            - If the user wants a classroom, call createClassroom.
            - If the user wants ONE assignment, call createAssignment.
            - If the user wants MULTIPLE assignments, call createAssignments.
            - Always wait for the classroom creation result before creating assignments.
            - Never ask for classroomId.
            - The backend automatically provides classroomId.
            - After all tools finish, answer the user.`,
          },

          contents,
        });

    } catch (err) {

      if (err.status !== 503) { throw err; }

      console.log("Gemini busy... retrying");
      retries--;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

    throw new Error("Gemini unavailable after retries.");
}