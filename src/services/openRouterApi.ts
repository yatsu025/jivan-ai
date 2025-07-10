
interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
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

export const callOpenRouterAPI = async (prompt: string, religion: string): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    
    if (!apiKey) {
      throw new Error('API key not found');
    }

    const messages: OpenRouterMessage[] = [
      {
        role: 'system',
        content: getSystemPrompt(religion)
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Jivan AI - Spiritual Companion'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      if (response.status === 429) {
        return 'API अभी बहुत व्यस्त है। कृपया 2-3 मिनट बाद कोशिश करें। धैर्य रखें! 🙏';
      }
      throw new Error(`API Error: ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();
    return data.choices[0]?.message?.content || 'क्षमा करें, कुछ तकनीकी समस्या है। कृपया दोबारा कोशिश करें। 🙏';
    
  } catch (error) {
    console.error('OpenRouter API Error:', error);
    return 'API में तकनीकी समस्या है। कृपया थोड़ी देर बाद कोशिश करें। धन्यवाद! 🙏';
  }
};
