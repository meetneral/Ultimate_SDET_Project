// import ollama from 'ollama';

// export async function analyzeWithAI(dom: string, description: string): Promise<string | null> {
//     const prompt = `
//         TASK: Find a CSS or XPath selector for: "${description}"
//         HTML: ${dom.substring(0, 8000)}
        
//         CRITICAL RULES:
//         1. Return ONLY the raw selector string.
//         2. NO explanation. NO markdown. NO backticks. NO "The selector is...".
//         3. Prefer CSS selectors (e.g., #username) over XPath.
        
//         Example Output: #username
//     `;

//     try {
//         const response = await ollama.chat({
//             model: 'llama3',
//             messages: [{ role: 'user', content: prompt }],
//         });

//         // BRUTAL CLEANUP: Remove any backticks or extra text the AI might still send
//         let cleanSelector = response.message.content.trim()
//             .replace(/```/g, '')        // Removes backticks
//             .replace(/`/g, '')          // Removes single backticks
//             .split('\n')[0]             // Takes only the first line
//             .trim();

//         return cleanSelector;
//     } catch (error) {
//         console.error("[Ollama Error]:", error);
//         return null;
//     }
// }
import ollama from 'ollama';
import OpenAI from 'openai';

// 1. Initialize OpenAI (It will look for process.env.OPENAI_API_KEY)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function analyzeWithAI(dom: string, description: string): Promise<string | null> {
    const prompt = `Find CSS/XPath for: "${description}". HTML: ${dom.substring(0, 5000)}. Return ONLY the selector.`;

    // 2. LOGIC: If running in GitHub Actions, use OpenAI. Otherwise, use Local Ollama.
    if (process.env.CI) { 
        console.log("☁️ [Cloud Healing]: GitHub Environment detected. Using OpenAI...");
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
        });
        return cleanOutput(response.choices[0].message.content || "");
    } else {
        console.log("🏠 [Local Healing]: Pune Environment detected. Using Ollama (Llama3)...");
        try {
            const response = await ollama.chat({
                model: 'llama3',
                messages: [{ role: 'user', content: prompt }],
            });
            return cleanOutput(response.message.content);
        } catch (error) {
            console.error("Ollama not running? Defaulting to OpenAI locally...", error);
            // Fallback: If Ollama isn't started, use the local secret to call OpenAI
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
            });
            return cleanOutput(response.choices[0].message.content || "");
        }
    }
}

function cleanOutput(text: string): string {
    return text.trim().replace(/```/g, '').replace(/`/g, '').split('\n')[0].trim();
}



