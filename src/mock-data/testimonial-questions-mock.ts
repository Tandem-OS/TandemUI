// --- MOCK DATA FOR DYNAMIC QUESTIONS FOR FINAL TESTIMOIAL ---
export const mockFeedbackQuestionData = {
    title: "Write a short review of your experience",
    subtitle: "Your feedback helps others make confident decisions. We genuinely appreciate it.",
    ratingQuestion: "How would you rate your overall experience with us?",
    questions: [
        {
            id: "standout",
            label: "What stood out most about working with us? (Optional)",
            placeholder: "Share what made this experience memorable..."
        },
        {
            id: "recommend",
            label: "Would you recommend Tandem to others? Why? (Optional)",
            placeholder: "Tell us why you'd recommend our services..."
        }
    ]
};

// --- MOCK DATA FOR THE DESIGNER FEEDBACK ---

export const mockDesignerFeedbackQuestions = {
    name: "Alex Denton",
    logoUrl: "/images/avatar.png",
    enableRating: true,
    ratingQuestion: "How would you rate your experience with Alex?",
    questions: [
        {
            id: "unique",
            label: "What makes this designer unique to work with? (Optional)",
            placeholder: "e.g., Their communication style, creativity, attention to detail..."
        },
        {
            id: "recommend",
            label: "Why would you recommend them to others? (Optional)",
            placeholder: "e.g., They delivered on time and exceeded expectations..."
        }
    ],
    emojiMap: {
        0: '😊', 1: '😡', 2: '😞', 3: '😐', 4: '😊', 5: '🤩'
    }
};
