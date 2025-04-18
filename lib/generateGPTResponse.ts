// /lib/generateGPTResponse.ts

export async function generateGPTResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Failed OpenAI API call:', errorDetails);
      throw new Error(`OpenAI API returned status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating GPT response:', error);
    throw new Error('Failed to generate GPT response');
  }
}
