const { GoogleGenAI } = require('@google/genai');

// Use the new SDK if API key is provided
let ai;
if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

/**
 * Returns a mock analysis when API quota is exceeded
 * @param {string} resumeText - The extracted text from the resume
 * @returns {Object} - Mock analysis structure
 */
const getMockAnalysis = (resumeText) => {
    const hasExperience = resumeText.toLowerCase().includes('experience') || resumeText.toLowerCase().includes('work');
    const hasSkills = resumeText.toLowerCase().includes('skill');
    const hasEducation = resumeText.toLowerCase().includes('education') || resumeText.toLowerCase().includes('degree');
    
    return {
        resumeScore: 72,
        improvedBulletPoints: [
            {
                original: "Worked on frontend features",
                improved: "Architected and delivered 15+ responsive frontend components using React and Next.js, improving user engagement by 20% and reducing load times by 35%",
                impact: "Impact & Quantification"
            },
            {
                original: "Helped with database",
                improved: "Optimized PostgreSQL database queries and implemented indexing strategy, reducing API response times by 40% and improving system scalability for 10K+ concurrent users",
                impact: "Performance & Leadership"
            }
        ],
        grammarSuggestions: [
            {
                error: "Worked on features",
                correction: "Led development of features / Architected features",
                type: "Action Verb Strength"
            },
            {
                error: "Helped with database",
                correction: "Optimized database / Enhanced database performance",
                type: "Action Verb Strength"
            }
        ],
        missingSkills: ["TypeScript", "Git/Version Control", "Agile/Scrum", "Cloud Deployment"],
        projectSuggestions: [
            "Build and showcase 1-2 portfolio projects with GitHub repos demonstrating full-stack capabilities",
            "Contribute to open-source projects to show collaborative development experience"
        ],
        linkedinSummary: "Results-driven Software Engineer passionate about building scalable, user-centric applications. Experienced in modern web technologies including React, Node.js, and databases. Proven track record of optimizing system performance and delivering high-quality code.",
        sectionFeedback: [
            {
                section: "Experience",
                score: hasExperience ? 65 : 40,
                feedback: "Add quantifiable metrics and impact statements to each role. Use strong action verbs and highlight technical achievements.",
                status: hasExperience ? "Strong" : "Improve"
            },
            {
                section: "Skills",
                score: hasSkills ? 70 : 50,
                feedback: "Consider organizing skills by proficiency level. Add emerging technologies and certifications if applicable.",
                status: hasSkills ? "Strong" : "Improve"
            },
            {
                section: "Education",
                score: hasEducation ? 75 : 60,
                feedback: "Include relevant coursework, GPA (if strong), and academic achievements. Highlight relevant projects.",
                status: hasEducation ? "Elite" : "Strong"
            }
        ],
        interviewQuestions: [
            "Tell us about your most challenging project and how you overcame obstacles.",
            "Describe your approach to writing clean, maintainable code.",
            "How do you stay current with emerging technologies and industry trends?",
            "Share an example of when you had to optimize performance in your application.",
            "How do you handle debugging and problem-solving in production issues?",
            "What development practices or methodologies do you follow?",
            "Describe your experience with version control and collaborative development.",
            "Tell us about a time you mentored someone or helped a team member succeed.",
            "How do you approach testing and quality assurance in your development process?",
            "What motivates you in your career, and where do you see yourself in 5 years?"
        ]
    };
};

/**
 * Calls Gemini API to analyze resume text and return structured JSON
 * @param {string} resumeText - The extracted text from the resume
 * @returns {Promise<Object>} - The structured AI analysis
 */
const analyzeResumeWithAI = async (resumeText) => {
    if (!ai || !process.env.GEMINI_API_KEY) {
        console.warn("⚠️ GEMINI_API_KEY not configured. Using mock analysis.");
        return getMockAnalysis(resumeText);
    }

    const prompt = `
You are an expert resume reviewer and career coach.
Analyze the following resume and provide structured improvements.

Tasks:
1 Improve bullet points using strong action verbs
2 Detect grammar issues
3 Suggest missing skills for the job role
4 Recommend projects to strengthen the resume
5 Improve experience descriptions
6 Generate a professional LinkedIn summary
7 Give a resume score out of 100
8 Generate 10 interview questions based on the resume (HR, Technical, Project, Problem-Solving)

Return the output AT ALL TIMES as a STRICT, VALID JSON object matching the exact structure below. Do not wrap it in markdown blockquotes or add any extra text outside the JSON.

JSON Structure Requirements:
{
  "resumeScore": number, // out of 100
  "improvedBulletPoints": [
    {
      "original": "string - snippet from resume",
      "improved": "string - suggested improved version",
      "impact": "string - short categorization like 'Leadership', 'Performance'"
    }
  ],
  "grammarSuggestions": [
    {
      "error": "string - original text",
      "correction": "string - suggested fix",
      "type": "string - e.g., 'Tone', 'Action Verb', 'Grammar'"
    }
  ],
  "missingSkills": ["string"],
  "projectSuggestions": ["string"],
  "linkedinSummary": "string",
  "sectionFeedback": [
    {
      "section": "string - e.g. 'Experience', 'Education', 'Skills'",
      "score": number, // out of 100
      "feedback": "string",
      "status": "string - either 'Elite', 'Strong', or 'Improve'"
    }
  ],
  "interviewQuestions": ["string"]
}

Resume Text:
"""
${resumeText.substring(0, 15000)}
"""`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.2, // Keep it deterministic
                responseMimeType: "application/json" // Force JSON output if possible (some environments support this natively in the SDK, otherwise we rely on the prompt)
            }
        });

        let textResponse = response.text;

        // Safety fallback: if it returned markdown wrapped json
        if (textResponse.startsWith('```json')) {
            textResponse = textResponse.replace(/^```json\n/, '').replace(/\n```$/, '');
        } else if (textResponse.startsWith('```')) {
            textResponse = textResponse.replace(/^```\n/, '').replace(/\n```$/, '');
        }

        return JSON.parse(textResponse);
    } catch (error) {
        console.error("AI Analysis Error:", error);
        
        // If quota exceeded (429) or any other error, fall back to mock analysis
        if (error.status === 429 || error.status === 503 || error.message.includes('quota') || error.message.includes('quota')) {
            console.warn("⚠️ API quota exceeded or service unavailable. Using mock analysis as fallback.");
            return getMockAnalysis(resumeText);
        }
        
        throw new Error("Failed to analyze resume with AI.");
    }
};

module.exports = {
    analyzeResumeWithAI
};
