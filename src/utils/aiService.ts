import ollama from 'ollama';

export async function analyzeWithAI(dom: string, description: string): Promise<string | null> {
    const prompt = `
        TASK: Find a CSS or XPath selector for: "${description}"
        HTML: ${dom.substring(0, 8000)}
        
        CRITICAL RULES:
        1. Return ONLY the raw selector string.
        2. NO explanation. NO markdown. NO backticks. NO "The selector is...".
        3. Prefer CSS selectors (e.g., #username) over XPath.
        
        Example Output: #username
    `;

    try {
        const response = await ollama.chat({
            model: 'llama3',
            messages: [{ role: 'user', content: prompt }],
        });

        // BRUTAL CLEANUP: Remove any backticks or extra text the AI might still send
        let cleanSelector = response.message.content.trim()
            .replace(/```/g, '')        // Removes backticks
            .replace(/`/g, '')          // Removes single backticks
            .split('\n')[0]             // Takes only the first line
            .trim();

        return cleanSelector;
    } catch (error) {
        console.error("[Ollama Error]:", error);
        return null;
    }
}



// import OpenAI from 'openai';
// require('dotenv').config();

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function analyzeWithAI(dom: string, description: string): Promise<string | null> {
//     const prompt = `
//         Context: A Playwright test failed to find an element described as "${description}".
//         Task: Based on the provided HTML snippet, find the most likely CSS or XPath selector for this element.
//         HTML: ${dom.substring(0, 5000)} // Send a chunk to save tokens
//         Return ONLY the selector string, nothing else.
//     `;

//     const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini", // Fast and cheap for 2026
//         messages: [{ role: "user", content: prompt }],
//     });

//     return response.choices[0].message.content?.trim() || null;
// }