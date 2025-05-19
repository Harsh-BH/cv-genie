<!-- filepath: /home/harsh1/github-repos/cv-genie/client/README.md -->
<div align="center">
  <img src="public/logo.png" alt="CV Genie Logo" width="200"/>
  <h1>CV Genie</h1>
  <p><strong>AI-powered resume analysis and optimization platform</strong></p>
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black.svg)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

## ✨ Overview

CV Genie helps job seekers create professional, ATS-friendly resumes with AI-powered analysis and optimization. Upload your existing resume, get instant feedback, and apply AI-suggested improvements to enhance your chances of landing interviews.

## 🧠 AI Technology

### Perplexity AI

CV Genie utilizes Perplexity's advanced language models for:

- **Content Analysis**: Deep semantic understanding of resume content to identify strengths and weaknesses
- **Industry-Specific Recommendations**: Tailored suggestions based on target industry standards
- **Natural Language Generation**: Human-like rewrites of resume bullets for greater impact and clarity
- **ATS Optimization**: Intelligent keyword analysis to improve applicant tracking system compatibility

### Sonar Model

The Sonar model is integrated for:

- **Document Structure Analysis**: Advanced parsing of resume structure and formatting
- **Visual Element Recognition**: Understanding the spatial relationships and hierarchy within documents
- **Multimodal Processing**: Handling both text and visual aspects of resume documents
- **Language-Agnostic Analysis**: Supporting resumes in multiple languages with consistent quality

## 🚀 Features

- **🔍 Smart Resume Analysis**
  - ATS compatibility checking
  - Keyword optimization
  - Content gap identification
  - Format and structure evaluation

- **💡 AI-Powered Optimization**
  - Action verb enhancement
  - Accomplishment highlighting
  - Quantifiable metrics suggestions
  - Industry-specific terminology recommendations

- **🎨 Design & Formatting**
  - Professional template selection
  - Customizable formatting options
  - Typography optimization
  - White space balancing

- **📄 Document Management**
  - Multiple resume versions
  - Section management
  - Version history
  - PDF export in high quality

- **🔧 Customization Tools**
  - Role-specific tailoring
  - Company-specific adjustments
  - Industry alignment
  - Personal branding options

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **State Management**: React Context API, Zustand
- **Forms**: React Hook Form, Zod
- **UI Components**: Radix UI, Shadcn UI
- **Backend**: Node.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Testing**: Jest, React Testing Library
- **CI/CD**: GitHub Actions
- **AI Integration**: Perplexity AI API, Sonar Model API

## 📁 Project Structure
client/               # Next.js frontend application
├── app/              # App router pages and layouts
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Core functionality
│   └── generated/    # Prisma client and types
├── prisma/           # Database schema and migrations
├── providers/        # React context providers
├── public/           # Static assets
├── styles/           # Global CSS styles
├── types/            # TypeScript type definitions
└── utils/            # Utility functions


## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn
- AI API keys (for Perplexity and Sonar)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cv-genie.git
   cd cv-genie/client

2. **Install Dependencies**
npm install
# or
yarn install

3. **Set up environment variables Create a .env.local file with:**
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cvgenie"
DIRECT_URL="postgresql://username:password@localhost:5432/cvgenie"

# Auth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# AI Services
PERPLEXITY_API_KEY="your-perplexity-api-key"

4. **Initialize the database**
npx prisma db push
# Optional: seed with sample data
npx prisma db seed

5. **Run the development server**
npm run dev
# or
yarn dev

**Open http://localhost:3000 in your browser**

📦 Build and Deployment

**Build for production**
npm run build
# or
yarn build

**Run production build**
npm start
# or
yarn start
**Testing**
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- components/ResumeAnalyzer.test.tsx


**Documentation**
For detailed documentation, see:

API Documentation
Component Library
AI Integration Guide
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgements
Perplexity AI for providing advanced language models
Sonar Model for document analysis capabilities
Next.js for the React framework
Tailwind CSS for styling
Prisma for database access




