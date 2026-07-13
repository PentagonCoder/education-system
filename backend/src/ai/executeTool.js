import { toolRegistry } from "./toolRegistry.js";

export async function executeTool(functionCall, req) {

    const tool = toolRegistry[functionCall.name];

    if (!tool) {
        throw new Error(`Unknown tool: ${functionCall.name}`);
    }

    return await tool(functionCall.args, req);
}