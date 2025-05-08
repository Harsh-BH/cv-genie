import 'dotenv/config';
import fetch from 'node-fetch';

const API_KEY = process.env.PERPLEXITY_API_KEY;

if (!API_KEY) {
  console.error('❌ PERPLEXITY_API_KEY is not defined in environment variables');
  process.exit(1);
}

// Function to test Perplexity API
async function testPerplexityAPI() {
  try {
    console.log('🔍 Testing Perplexity API connection...');
    
    // Make a simple request to check the API connection
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'sonar',  // Using a smaller model for the test
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: 'Hello, this is a test message to check API connectivity.'
          }
        ],
        max_tokens: 20  // Limiting token usage for test
      })
    });
    
    const data = await response.json();
    
    // Check if the API returned an error related to credits
    if (data.error) {
      const errorMessage = typeof data.error === 'string' 
        ? data.error 
        : JSON.stringify(data.error);
        
      // Check for credit-related errors using string comparison
      if (errorMessage.toLowerCase().includes('quota') || 
          errorMessage.toLowerCase().includes('credits') || 
          errorMessage.toLowerCase().includes('limit') ||
          errorMessage.toLowerCase().includes('exceeded')) {
        console.error('❌ Perplexity API test failed: No remaining credits');
      } else {
        console.error('❌ Perplexity API test failed with error:');
      }
      
      console.error(errorMessage);
      process.exit(1);
    }
    
    // Check for missing response data
    if (!data.choices || !data.choices[0]) {
      console.error('❌ Perplexity API test failed: Invalid response format');
      console.error(JSON.stringify(data));
      process.exit(1);
    }
    
    // Success - we got a response
    console.log('✅ Perplexity API connection successful');
    console.log('✅ Response received:', data.choices[0].message.content);
    console.log('✅ Credits are available');
    
    // If available, report usage information
    if (data.usage) {
      console.log('📊 Usage information:');
      console.log(`   - Prompt tokens: ${data.usage.prompt_tokens}`);
      console.log(`   - Completion tokens: ${data.usage.completion_tokens}`);
      console.log(`   - Total tokens: ${data.usage.total_tokens}`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Perplexity API test failed with exception:');
    console.error(error);
    process.exit(1);
  }
}

// Run the test
testPerplexityAPI();