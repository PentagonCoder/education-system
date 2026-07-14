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

            - If the user asks to create a classroom, call createClassroom.
            - If the user also asks for assignments, call createClassroom FIRST.
            - Wait for the tool response.
            - After receiving the classroom creation result, call createAssignment once for EACH assignment.
            - Never combine multiple assignments into one tool call.
            - Continue calling createAssignment until every assignment has been created.
            - Only after every assignment has been created should you answer the user.
            `,
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