/**
 * Utility functions for making API calls
 */

/**
 * Makes a request to the Perplexity API with error handling
 * @param messages The messages to send to the API
 * @param model The model to use (defaults to "mixtral-8x7b-instruct")
 * @param maxTokens Maximum tokens for the response
 * @returns The API response content or null if there was an error
 */
export async function callPerplexityAPI(
  messages: Array<{role: string; content: string}>,
  model: string = "mixtral-8x7b-instruct",
  maxTokens: number = 1000
): Promise<string | null> {
  const perplexityApiKey = process.env.PERPLEXITY_API_KEY;
  if (!perplexityApiKey) {
    console.error("Missing Perplexity API key");
    return null;
  }
  
  try {
    console.log(`Making Perplexity API call to model: ${model}`);
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${perplexityApiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens
      })
    });

    if (!response.ok) {
      const errorText = await response.text().catch(e => "Could not read error response");
      console.error(`Perplexity API error (${response.status}): ${errorText}`);
      
      // Check for specific error types
      if (response.status === 400) {
        console.error("Bad request - check API parameters");
      } else if (response.status === 401) {
        console.error("Authentication error - check API key");
      } else if (response.status === 429) {
        console.error("Rate limit exceeded");
      }
      
      return null;
    }

    const result = await response.json();
    
    // Validate response format
    if (!result.choices || !Array.isArray(result.choices) || result.choices.length === 0) {
      console.error("Invalid API response format - missing choices array:", JSON.stringify(result));
      return null;
    }
    
    const firstChoice = result.choices[0];
    if (!firstChoice.message || !firstChoice.message.content) {
      console.error("Invalid API response format - missing message content:", JSON.stringify(firstChoice));
      return null;
    }
    
    return firstChoice.message.content;
  } catch (error) {
    console.error("Perplexity API call failed:", error);
    return null;
  }
}
