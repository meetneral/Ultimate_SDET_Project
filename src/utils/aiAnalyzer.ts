export async function analyzeError(errorMessage: string) {
    // Send the error message to an LLM (OpenAI/Anthropic) 
    // to explain WHY it failed (e.g., "Selector changed from #id to .class").
    console.log(`[AI Analysis Triggered]: Analyzing failure... ${errorMessage}`);
}






//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