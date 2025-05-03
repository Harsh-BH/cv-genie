export const mockReviewerData = {
  cvUrl: "/sample-cv.jpg", // Replace with actual sample CV image
  score: 78,
  
  insights: [
    {
      id: "insight-1",
      title: "Strong professional summary",
      description: "Your professional summary effectively captures your experience and key strengths. It creates a good first impression.",
      bounds: { x: 100, y: 120, width: 500, height: 80 }
    },
    {
      id: "insight-2",
      title: "Good use of keywords",
      description: "You've incorporated relevant industry keywords that will help your CV pass through ATS (Applicant Tracking Systems).",
      bounds: { x: 100, y: 350, width: 500, height: 120 }
    },
    {
      id: "insight-3",
      title: "Consistent formatting",
      description: "Your CV maintains consistent formatting throughout, making it easy to read and scan quickly."
    }
  ],
  
  mistakes: [
    {
      id: "mistake-1",
      title: "Spelling error detected",
      description: "There's a spelling error in 'experiance' - it should be 'experience'.",
      severity: "medium",
      bounds: { x: 150, y: 220, width: 80, height: 20 }
    },
    {
      id: "mistake-2",
      title: "Inconsistent date format",
      description: "Your date formats are inconsistent. Some use MM/YYYY while others use Month YYYY.",
      severity: "low",
      bounds: { x: 450, y: 300, width: 150, height: 20 }
    },
    {
      id: "mistake-3",
      title: "Contact information incomplete",
      description: "Your contact section is missing a professional email address.",
      severity: "high",
      bounds: { x: 100, y: 80, width: 200, height: 30 }
    }
  ],
  
  improvements: [
    {
      id: "improvement-1",
      title: "Add quantifiable achievements",
      description: "Include specific metrics and results to strengthen your work experience. For example, 'Increased sales by 25%' instead of 'Increased sales'.",
      bounds: { x: 100, y: 400, width: 500, height: 150 }
    },
    {
      id: "improvement-2",
      title: "Enhance skills section",
      description: "Consider organizing your skills into categories such as technical, soft, and industry-specific skills for better readability.",
      bounds: { x: 100, y: 600, width: 500, height: 100 }
    },
    {
      id: "improvement-3",
      title: "Add a LinkedIn profile",
      description: "Including your LinkedIn profile would strengthen your professional online presence.",
      bounds: { x: 100, y: 80, width: 200, height: 30 }
    }
  ]
};

export default mockReviewerData;
