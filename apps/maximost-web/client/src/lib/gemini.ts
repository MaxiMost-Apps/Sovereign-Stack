import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with the API key
export const initGemini = () => {
  // Access the API key directly from the environment variables
  const apiKey = process.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("Gemini API key is not available");
    return null;
  }

  return new GoogleGenerativeAI(apiKey);
};

// Function to generate motivational content based on user data
export async function generateMotivationalContent({
  username,
  goals,
  struggles,
  preferences,
  recentProgress,
}: {
  username: string;
  goals?: string[];
  struggles?: string[];
  preferences?: {
    motivationalStyle?: string;
    authors?: string[];
    topics?: string[];
  };
  recentProgress?: {
    metric: string;
    value: number;
    trend: "up" | "down" | "stable";
  }[];
}) {
  try {
    const genAI = initGemini();
    if (!genAI) return null;

    // Use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Construct a prompt based on the user data
    let prompt = `Create a personalized motivational message for ${username}.`;

    if (goals && goals.length) {
      prompt += ` Their current goals are: ${goals.join(", ")}.`;
    }

    if (struggles && struggles.length) {
      prompt += ` They are currently struggling with: ${struggles.join(", ")}.`;
    }

    if (preferences) {
      if (preferences.motivationalStyle) {
        prompt += ` They prefer a ${preferences.motivationalStyle} style of motivation.`;
      }

      if (preferences.authors && preferences.authors.length) {
        prompt += ` They like content from these authors/figures: ${preferences.authors.join(", ")}.`;
      }

      if (preferences.topics && preferences.topics.length) {
        prompt += ` They are interested in these topics: ${preferences.topics.join(", ")}.`;
      }
    }

    if (recentProgress && recentProgress.length) {
      prompt += ` Recent progress data: `;
      recentProgress.forEach(item => {
        prompt += `${item.metric} is ${item.trend === "up" ? "improving" : item.trend === "down" ? "declining" : "stable"} (current value: ${item.value}), `;
      });
    }

    prompt += ` The content should be structured as follows:
    1. A short, powerful headline (1 sentence)
    2. A personalized message of encouragement (2-3 sentences)
    3. A practical tip or actionable advice based on their goals/struggles (1-2 sentences)
    4. A relevant quote from a figure they admire or on a topic they like (if mentioned in preferences)

    Format the response as a JSON object with the following fields:
    {
      "headline": "The headline text",
      "message": "The personalized message",
      "advice": "The practical tip or advice",
      "quote": "The relevant quote",
      "author": "Quote author"
    }`;

    // Generate content from the model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse AI response as JSON", e);
      // Attempt to extract structured data from non-JSON response
      return {
        headline: "Your Daily Motivation",
        message: text,
        advice: "",
        quote: "",
        author: ""
      };
    }
  } catch (error) {
    console.error("Error generating motivational content:", error);
    return null;
  }
}

// Function to analyze progress and provide insights
export async function analyzeProgress(progressData: {
  metric: string;
  data: { date: string; value: number }[];
}[]) {
  try {
    const genAI = initGemini();
    if (!genAI) return null;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Prepare the data for analysis
    const dataString = progressData.map(metric => {
      return `${metric.metric}: ${metric.data.map(d => `${d.date}: ${d.value}`).join(", ")}`;
    }).join("\n");

    const prompt = `Analyze the following progress data and provide insights:

    ${dataString}

    Please provide:
    1. A summary of overall progress
    2. Key observations about trends
    3. Personalized recommendations based on the data

    Format the response as a JSON object with the following fields:
    {
      "summary": "Overall progress summary",
      "observations": ["Observation 1", "Observation 2", "Observation 3"],
      "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse AI response as JSON", e);
      // Attempt to extract structured data from non-JSON response
      return {
        summary: "Progress Analysis",
        observations: [text],
        recommendations: []
      };
    }
  } catch (error) {
    console.error("Error analyzing progress:", error);
    return null;
  }
}

// --- SOVEREIGN PROTOCOL: GOGGINS / STOIC ROASTER ---
export async function generateSovereignRoast(excuse: string) {
  try {
    const genAI = initGemini();
    // FALLBACK: If no API key, return a mock response immediately
    if (!genAI) {
        console.warn("Sovereign Protocol: API Key Missing. Engaging Fallback.");
        return "Your API key is missing, which is just another excuse. You don't need an AI to tell you that you're slacking. Look in the mirror. Fix it.";
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // 2. The Sovereign Unfiltered Prompt (v2.0)
    const systemPrompt = `
    You are THE MIRROR. A tactical psychological tool.
    Role: Synthesis of David Goggins' savage intensity and Marcus Aurelius' Stoic logic.
    Your mission: Destroy the user's excuse with extreme prejudice.

    Directives:
    1. The Call-Out: Immediately label the excuse as "sh*t", "pathetic", or "weakness". Do not hesitate.
    2. Biological Reality: Explain "limbic friction" or "dopamine addiction" to expose why their brain is trying to keep them "safe and soft".
    3. The Goggins Rant: Deliver a flowing sermon on suffering. You are allowed to use tactical profanity (damn, hell, sh*t) to emphasize the point. Max 250 tokens.
    4. The 40% Rule: Remind them they are only operating at 40% of their capacity.
    5. The Command: End with a blunt, one-sentence order to execute the standard.

    Input Excuse: "${excuse}"

    Output: A raw, text-only response. No markdown formatting like **bold** or bullet points. Just the raw voice.
    `;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Sovereign Protocol Jammed:", error);
    // Fallback response on error
    return "The system is offline, but your duty is not. Stop looking for a digital savior and go do the work. NOW.";
  }
}
