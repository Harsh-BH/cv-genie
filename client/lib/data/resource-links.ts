export interface ResourceLink {
  title: string;
  url: string;
  description: string;
  category: ResourceCategory;
  isPremium?: boolean;
}

export type ResourceCategory = 
  | 'resume-builder'
  | 'template'
  | 'ats-optimization'
  | 'writing-guide'
  | 'industry-specific'
  | 'career-advice'
  | 'interview-prep'
  | 'skill-development'
  | 'networking';

export const categoryLabels: Record<ResourceCategory, string> = {
  'resume-builder': 'Resume Builders',
  'template': 'Resume Templates',
  'ats-optimization': 'ATS Optimization',
  'writing-guide': 'Writing Guides',
  'industry-specific': 'Industry-Specific Resources',
  'career-advice': 'Career Advice',
  'interview-prep': 'Interview Preparation',
  'skill-development': 'Skill Development',
  'networking': 'Networking Resources'
};

export const resourceLinks: ResourceLink[] = [
  // Resume Builders
  {
    title: "Resume.io",
    url: "https://resume.io/",
    description: "Professional resume builder with templates designed by experts",
    category: "resume-builder",
    isPremium: true
  },
  {
    title: "Zety",
    url: "https://zety.com/",
    description: "Resume builder with AI tools and professional templates",
    category: "resume-builder",
    isPremium: true
  },
  {
    title: "Canva Resume Builder",
    url: "https://www.canva.com/create/resumes/",
    description: "Design-focused resume builder with customizable templates",
    category: "resume-builder"
  },
  {
    title: "Resume Genius",
    url: "https://resumegenius.com/",
    description: "Step-by-step builder with industry-specific templates and examples",
    category: "resume-builder"
  },
  {
    title: "Novoresume",
    url: "https://novoresume.com/",
    description: "Modern resume builder with ATS-friendly templates",
    category: "resume-builder",
    isPremium: true
  },
  {
    title: "EnhanCV",
    url: "https://enhancv.com/",
    description: "Create standout resumes with unique sections and designs",
    category: "resume-builder",
    isPremium: true
  },
  {
    title: "LinkedIn Resume Builder",
    url: "https://www.linkedin.com/resume-builder/",
    description: "Create resumes from your LinkedIn profile",
    category: "resume-builder"
  },
  {
    title: "Kickresume",
    url: "https://www.kickresume.com/",
    description: "AI-powered resume builder with matching cover letters",
    category: "resume-builder",
    isPremium: true
  },

  // Templates
  {
    title: "Overleaf Resume Templates",
    url: "https://www.overleaf.com/gallery/tagged/cv",
    description: "Professional LaTeX resume templates for academic and technical roles",
    category: "template"
  },
  {
    title: "Resume.com Free Templates",
    url: "https://www.resume.com/",
    description: "Free resume templates with customization options",
    category: "template"
  },
  {
    title: "Microsoft Office Templates",
    url: "https://templates.office.com/en-us/resumes-and-cover-letters",
    description: "Professional templates for Microsoft Word",
    category: "template"
  },
  {
    title: "Google Docs Resume Templates",
    url: "https://docs.google.com/templates?category=resumes",
    description: "Free templates accessible with a Google account",
    category: "template"
  },
  {
    title: "Hloom",
    url: "https://www.hloom.com/resumes/",
    description: "Hundreds of free resume templates for download",
    category: "template"
  },
  {
    title: "Behance Resume Templates",
    url: "https://www.behance.net/search/projects?search=resume%20template",
    description: "Creative and designer-focused resume templates",
    category: "template"
  },
  {
    title: "GitHub Resume Templates",
    url: "https://github.com/topics/resume-template",
    description: "Open-source resume templates, particularly good for tech roles",
    category: "template"
  },

  // ATS Optimization
  {
    title: "JobScan",
    url: "https://www.jobscan.co/",
    description: "Match your resume against job descriptions for ATS optimization",
    category: "ats-optimization",
    isPremium: true
  },
  {
    title: "Resume Worded",
    url: "https://resumeworded.com/",
    description: "AI-powered resume scanner and optimization tool",
    category: "ats-optimization",
    isPremium: true
  },
  {
    title: "SkillSyncer",
    url: "https://skillsyncer.com/",
    description: "Tool to identify and add missing skills from job descriptions",
    category: "ats-optimization"
  },
  {
    title: "Resunate",
    url: "https://www.resunate.com/",
    description: "Resume optimization focused on job-specific scoring",
    category: "ats-optimization"
  },
  {
    title: "TopResume Free Review",
    url: "https://www.topresume.com/",
    description: "Get a free professional resume review with ATS insights",
    category: "ats-optimization"
  },
  {
    title: "CVScan",
    url: "https://www.cvscan.uk/",
    description: "Resume parser to test how ATS systems read your resume",
    category: "ats-optimization"
  },

  // Writing Guides
  {
    title: "Harvard Office of Career Services Resume Guide",
    url: "https://ocs.fas.harvard.edu/guide-template-library",
    description: "Comprehensive resume writing guides and examples",
    category: "writing-guide"
  },
  {
    title: "Yale Office of Career Strategy Resume Guide",
    url: "https://ocs.yale.edu/channels/resumes-cvs/",
    description: "University-backed resume writing best practices and examples",
    category: "writing-guide"
  },
  {
    title: "Indeed Resume Guide",
    url: "https://www.indeed.com/career-advice/resumes-cover-letters",
    description: "Comprehensive resume writing advice from one of the largest job sites",
    category: "writing-guide"
  },
  {
    title: "The Muse Resume Tips",
    url: "https://www.themuse.com/advice/resumes",
    description: "Modern resume writing advice and examples",
    category: "writing-guide"
  },
  {
    title: "Purdue Online Writing Lab",
    url: "https://owl.purdue.edu/owl/job_search_writing/resumes_and_vitas/index.html",
    description: "Academic-focused resume and CV writing guides",
    category: "writing-guide"
  },
  {
    title: "Monster Resume Writing Guide",
    url: "https://www.monster.com/career-advice/article/resume-writing-help",
    description: "Step-by-step resume writing guidance from Monster",
    category: "writing-guide"
  },
  {
    title: "Glassdoor Resume Guides",
    url: "https://www.glassdoor.com/blog/tag/resumes/",
    description: "Practical resume advice with insights from employers",
    category: "writing-guide"
  },
  {
    title: "Hubspot's Guide to Resume Writing",
    url: "https://blog.hubspot.com/marketing/resume-writing-tips",
    description: "Marketing and sales focused resume writing tips",
    category: "writing-guide"
  },

  // Industry-Specific Resources
  {
    title: "GitHub Profile README Generator",
    url: "https://rahuldkjain.github.io/gh-profile-readme-generator/",
    description: "Create impressive GitHub profiles for tech resumes",
    category: "industry-specific"
  },
  {
    title: "Dribbble",
    url: "https://dribbble.com/search/resume",
    description: "Resume inspiration and templates for designers",
    category: "industry-specific"
  },
  {
    title: "Stack Overflow Developer Survey",
    url: "https://insights.stackoverflow.com/survey",
    description: "Stay informed about industry trends for tech resumes",
    category: "industry-specific"
  },
  {
    title: "IEEE Resume Guidelines",
    url: "https://ieee.org/students",
    description: "Resume guidelines for engineering professionals",
    category: "industry-specific"
  },
  {
    title: "NIH Biosketch Format",
    url: "https://grants.nih.gov/grants/forms/biosketch.htm",
    description: "Format guidelines for scientific and medical CVs",
    category: "industry-specific"
  },
  {
    title: "American Medical Association CV Guide",
    url: "https://www.ama-assn.org/medical-residents/transition-practice/crafting-your-cv-tips-landing-residency-program",
    description: "CV guidelines for medical professionals",
    category: "industry-specific"
  },
  {
    title: "Legal Resume Guidelines - ABA",
    url: "https://www.americanbar.org/careercenter/career-resources/legal-career-central/",
    description: "American Bar Association guidelines for legal resumes",
    category: "industry-specific"
  },
  {
    title: "Finance Resume Guide - Wall Street Oasis",
    url: "https://www.wallstreetoasis.com/forums/wso-resume-review-investment-banking-template",
    description: "Investment banking and finance resume templates and advice",
    category: "industry-specific"
  },

  // Career Advice
  {
    title: "Career Sidekick",
    url: "https://careersidekick.com/",
    description: "Career advice from professional recruiters",
    category: "career-advice"
  },
  {
    title: "CareerCup",
    url: "https://www.careercup.com/",
    description: "Tech interview prep and career advice",
    category: "career-advice"
  },
  {
    title: "80,000 Hours",
    url: "https://80000hours.org/",
    description: "Research-backed career advice for high-impact careers",
    category: "career-advice"
  },
  {
    title: "Ask A Manager",
    url: "https://www.askamanager.org/",
    description: "Practical workplace and career advice",
    category: "career-advice"
  },
  {
    title: "CareerOne Stop",
    url: "https://www.careeronestop.org/",
    description: "US Department of Labor career resources",
    category: "career-advice"
  },
  {
    title: "Dice Insights",
    url: "https://insights.dice.com/",
    description: "Career advice for tech professionals",
    category: "career-advice"
  },
  {
    title: "Fast Company Career Evolution",
    url: "https://www.fastcompany.com/section/career-evolution",
    description: "Modern career advice for changing workplaces",
    category: "career-advice"
  },

  // Interview Prep
  {
    title: "LeetCode",
    url: "https://leetcode.com/",
    description: "Technical interview preparation platform",
    category: "interview-prep"
  },
  {
    title: "HackerRank",
    url: "https://www.hackerrank.com/",
    description: "Practice coding challenges for interviews",
    category: "interview-prep"
  },
  {
    title: "InterviewBit",
    url: "https://www.interviewbit.com/",
    description: "Complete interview preparation guide and practice",
    category: "interview-prep"
  },
  {
    title: "Big Interview",
    url: "https://biginterview.com/",
    description: "AI-powered interview practice platform",
    category: "interview-prep",
    isPremium: true
  },
  {
    title: "STAR Method Guide",
    url: "https://www.themuse.com/advice/star-interview-method",
    description: "Learn the STAR method for behavioral interviews",
    category: "interview-prep"
  },
  {
    title: "Pramp",
    url: "https://www.pramp.com/",
    description: "Free mock interviews with peers",
    category: "interview-prep"
  },
  {
    title: "Interview School",
    url: "https://interviewschool.com/",
    description: "AI-powered interview preparation",
    category: "interview-prep",
    isPremium: true
  },

  // Skill Development
  {
    title: "Coursera",
    url: "https://www.coursera.org/",
    description: "Online courses from top universities and companies",
    category: "skill-development"
  },
  {
    title: "edX",
    url: "https://www.edx.org/",
    description: "Free courses from Harvard, MIT, and more",
    category: "skill-development"
  },
  {
    title: "LinkedIn Learning",
    url: "https://www.linkedin.com/learning/",
    description: "Professional courses with LinkedIn integration",
    category: "skill-development",
    isPremium: true
  },
  {
    title: "Udemy",
    url: "https://www.udemy.com/",
    description: "Marketplace for online learning",
    category: "skill-development",
    isPremium: true
  },
  {
    title: "Codecademy",
    url: "https://www.codecademy.com/",
    description: "Interactive coding lessons",
    category: "skill-development"
  },
  {
    title: "Khan Academy",
    url: "https://www.khanacademy.org/",
    description: "Free education in math, science, and more",
    category: "skill-development"
  },
  {
    title: "freeCodeCamp",
    url: "https://www.freecodecamp.org/",
    description: "Learn to code for free with projects",
    category: "skill-development"
  },
  {
    title: "Kaggle",
    url: "https://www.kaggle.com/learn",
    description: "Free data science and machine learning courses",
    category: "skill-development"
  },

  // Networking
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/",
    description: "Professional networking platform",
    category: "networking"
  },
  {
    title: "Meetup",
    url: "https://www.meetup.com/",
    description: "Find local professional groups and events",
    category: "networking"
  },
  {
    title: "Lunchclub",
    url: "https://lunchclub.com/",
    description: "AI-powered networking platform",
    category: "networking"
  },
  {
    title: "AngelList",
    url: "https://angel.co/",
    description: "Startup job board and networking",
    category: "networking"
  },
  {
    title: "Slack Communities List",
    url: "https://slofile.com/",
    description: "Directory of open Slack communities for professionals",
    category: "networking"
  },
  {
    title: "Discord Communities",
    url: "https://disboard.org/servers/tag/professional",
    description: "Professional Discord communities for networking",
    category: "networking"
  },
  {
    title: "Handshake",
    url: "https://joinhandshake.com/",
    description: "Career network for college students and recent grads",
    category: "networking"
  },
  {
    title: "GitHub",
    url: "https://github.com/",
    description: "Connect with other developers through code",
    category: "networking"
  },
  {
    title: "Women Who Code",
    url: "https://www.womenwhocode.com/",
    description: "Networking for women in technology",
    category: "networking"
  }
];
