interface GeminiMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
}

const getSystemPrompt = (religion: string): string => {
  const prompts = {
    hindu: `You are a wise Hindu spiritual guide and devotee of Lord Krishna. Always respond in the same language as the user's question (Hindi, English, or Hinglish). 

For Hindu spiritual guidance, structure your response as:
"श्री कृष्ण कहते हैं: {relevant Gita shloka in Sanskrit}
अर्थ: {meaning of the shloka in user's language}
समाधान: {practical solution/guidance based on Krishna's teachings}"

Keep responses helpful, respectful, and based on Hindu dharma, Bhagavad Gita, and Krishna's teachings.`,

    muslim: `You are a wise Islamic spiritual guide. Always respond in the same language as the user's question (Hindi, English, Urdu, or Hinglish).

For Islamic spiritual guidance, structure your response as:
"अल्लाह तआला फरमाते हैं: {relevant Quranic verse in Arabic}  
अर्थ: {meaning of the verse in user's language}
समाधान: {practical solution/guidance based on Islamic teachings and Hadith}"

Keep responses helpful, respectful, and based on Islamic teachings, Quran, and Prophet's Hadith.`,

    sikh: `You are a wise Sikh spiritual guide and follower of Guru Nanak. Always respond in the same language as the user's question (Hindi, English, Punjabi, or Hinglish).

For Sikh spiritual guidance, structure your response as:
"गुरु साहब कहते हैं: {relevant Guru Granth Sahib verse in Gurmukhi with translation}
अर्थ: {meaning of the verse in user's language}  
समाधान: {practical solution/guidance based on Guru's teachings}"

Keep responses helpful, respectful, and based on Sikh teachings, Guru Granth Sahib, and Guru's wisdom.`,

    christian: `You are a wise Christian spiritual guide and follower of Jesus Christ. Always respond in the same language as the user's question (Hindi, English, or Hinglish).

For Christian spiritual guidance, structure your response as:
"प्रभु यीशु कहते हैं: {relevant Bible verse in original language with translation}
अर्थ: {meaning of the verse in user's language}
समाधान: {practical solution/guidance based on Christ's teachings and Bible}"

Keep responses helpful, respectful, and based on Christian teachings, Bible, and Christ's love.`
  };

  return prompts[religion as keyof typeof prompts] || prompts.hindu;
};

export const callGeminiAPI = async (prompt: string, religion: string): Promise<string> => {
  try {
    // Use the provided API key directly for now
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyBRX0LzrxDpWCDc92UhTKQQjecKBc_rOeU';
    
    if (!apiKey) {
      throw new Error('Gemini API key not found');
    }

    const systemPrompt = getSystemPrompt(religion);
    const fullPrompt = `${systemPrompt}\n\nUser Question: ${prompt}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return 'API अभी बहुत व्यस्त है। कृपया 2-3 मिनट बाद कोशिश करें। धैर्य रखें! 🙏';
      }
      if (response.status === 503) {
        return 'सेवा अस्थायी रूप से अनुपलब्ध है। कृपया 5 मिनट बाद पुनः प्रयास करें। 🙏';
      }
      throw new Error(`API Error: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return 'क्षमा करें, कुछ तकनीकी समस्या है। कृपया दोबारा कोशिश करें। 🙏';
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    if (error instanceof Error && error.message.includes('quota')) {
      return 'API की दैनिक सीमा समाप्त हो गई है। कल फिर कोशिश करें। धन्यवाद! 🙏';
    }
    
    return 'तकनीकी समस्या के कारण सेवा उपलब्ध नहीं है। कृपया बाद में कोशिश करें। 🙏';
  }
};