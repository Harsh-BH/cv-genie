
<div align="center">
  <img src="client/public/logo.svg" alt="CV Genie Logo" width="200"/>
  <h1>CV Genie</h1>
  <p><strong>AI-powered resume analysis and optimization platform</strong></p>

  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-4.9.5-blue.svg" alt="TypeScript" />
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-14.0.0-black.svg" alt="Next.js" />
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-18.2.0-61DAFB.svg" alt="React" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind%20CSS-3.3.0-38B2AC.svg" alt="Tailwind CSS" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" />
  </a>
</div>

---

## ✨ Overview

**CV Genie** helps job seekers craft professional, ATS-friendly resumes with AI-powered analysis and optimization. Upload your resume, receive instant feedback, and enhance it with AI-suggested improvements tailored to your target industry.

---

## 🧠 AI Technology

### 🔹 Perplexity AI

- **Content Analysis**: Identifies strengths and weaknesses using deep semantic understanding  
- **Industry-Specific Recommendations**: Tailored suggestions aligned with industry standards  
- **Natural Language Generation**: Rewrites resume bullets for impact and clarity  
- **ATS Optimization**: Analyzes keywords to improve compatibility with applicant tracking systems  

### 🔸 Sonar Model

- **Document Structure Analysis**: Parses formatting and structural elements  
- **Visual Element Recognition**: Understands spatial relationships in resumes  
- **Multimodal Processing**: Handles both text and visuals  
- **Language-Agnostic Analysis**: Maintains consistent quality across languages  

---

## 🚀 Features

### 🔍 Smart Resume Analysis
- ATS compatibility check  
- Keyword optimization  
- Content gap detection  
- Formatting evaluation  

### 💡 AI-Powered Optimization
- Enhanced action verbs  
- Achievement-focused phrasing  
- Metrics-based suggestions  
- Industry-specific terminology  

### 🎨 Design & Formatting
- Professional templates  
- Custom formatting  
- Typography enhancements  
- Balanced white space  

### 📄 Document Management
- Multiple resume versions  
- Section rearrangement  
- Version history tracking  
- High-quality PDF exports  

### 🔧 Customization Tools
- Role-specific tailoring  
- Company-level adjustments  
- Industry alignment  
- Personal branding support  

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS  
- **State Management**: React Context API, Zustand  
- **Forms**: React Hook Form, Zod  
- **UI**: Radix UI, Shadcn UI  
- **Backend**: Node.js (TypeScript)  
- **Database**: PostgreSQL with Prisma ORM  
- **Authentication**: NextAuth.js  
- **Testing**: Jest, React Testing Library  
- **CI/CD**: GitHub Actions  
- **AI Integration**: Perplexity AI API, Sonar Model API  

---

## 📁 Project Structure

```

client/               # Next.js frontend
├── app/              # App router pages/layouts
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Core functionality
│   └── generated/    # Prisma client and types
├── prisma/           # DB schema and migrations
├── providers/        # Context providers
├── public/           # Static assets
├── styles/           # Global CSS
├── types/            # TypeScript definitions
└── utils/            # Utility functions

````

---

## 🧪 Getting Started

### ✅ Prerequisites

- Node.js v18+
- PostgreSQL
- `npm` or `yarn`
- Perplexity & Sonar AI API keys

---

### ⚙️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/cv-genie.git
cd cv-genie/client
````

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cvgenie"
DIRECT_URL="postgresql://username:password@localhost:5432/cvgenie"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# AI Services
PERPLEXITY_API_KEY="your-perplexity-api-key"
```

4. **Initialize the database**

```bash
npx prisma db push
# (Optional) Seed with sample data:
npx prisma db seed
```

5. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📦 Build & Deployment

### 🔨 Build for production

```bash
npm run build
# or
yarn build
```

### 🚀 Start production server

```bash
npm start
# or
yarn start
```

---

## 🧪 Testing

Run all tests:

```bash
npm test
```

Run with coverage:

```bash
npm test -- --coverage
```

Run specific test file:

```bash
npm test -- components/ResumeAnalyzer.test.tsx
```

---


## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes

   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push the branch

   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

* [Perplexity AI](https://www.perplexity.ai/) — for advanced language model support
* [Sonar Model](#) — for document structure analysis
* [Next.js](https://nextjs.org/) — for the React framework
* [Tailwind CSS](https://tailwindcss.com/) — for utility-first styling
* [Prisma](https://www.prisma.io/) — for ORM and database management

---

