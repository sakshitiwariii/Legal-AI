 # **LegalAI**
## **⚖️ Simplifying Legal Access for All Indians**

LegalAI is an AI-powered platform designed to demystify the Indian justice system, making legal knowledge accessible and understandable for everyone. By leveraging cutting-edge artificial intelligence tools, it provides clear language explanations, personalized legal guidance, and real-time assistance, empowering citizens to understand and exercise their legal rights effectively.

## **✨ Core Features**

LegalAI offers a comprehensive suite of intelligent tools to simplify your legal journey:

### **1. AI Legal Assistant**
Get instant, AI-powered responses to your legal queries. Our intelligent assistant can be configured with various language models (including LLaMA 3 8B for quick responses and LLaMA 3 70B for complex legal analysis) to match your specific needs for speed and depth of understanding.

<img width="1000" height="500" alt="LegalAI Chatbot Interface" src="https://github.com/user-attachments/assets/9e7952d4-a2d9-44b2-838f-b387e34cb81f" />

### **2. Smart Case Monitor**
Track and manage your legal cases with real-time updates. Stay informed about case statuses, upcoming hearing dates, and important developments. Features include advanced search capabilities, status-based filtering, and multiple sorting options for efficient case management.

<img width="1000" height="500" alt="LegalAI Case Tracking Dashboard" src="https://github.com/user-attachments/assets/2765e469-05bb-4af0-90d0-f10c108f7f81" />

### **3. Interactive Rights Explorer**
Discover and understand your legal rights through intuitive, interactive visualizations. Explore comprehensive categories including Arrest Rights, Property Rights, Consumer Protection, Employment Rights, and Family Law Rights, all presented in simple, accessible language.

<img width="1000" height="500" alt="LegalAI Rights Visualizer" src="https://github.com/user-attachments/assets/bcf66795-0467-401f-ade1-52fef0361e87" />

### **4. Document Intelligence**
Upload complex legal documents (supporting PDF, Word, and Text formats up to 10MB) and receive simplified, plain-language explanations of their content, helping you understand complex legal terminology and clauses with ease.

<img width="1000" height="500" alt="LegalAI Document Simplifier" src="https://github.com/user-attachments/assets/d4b18a2e-e635-48fc-9cb8-a9deae2affce" />

### **5. Legal Connect Hub**
Connect with verified legal aid providers, experienced lawyers, and legal clinics across India. Search by professional name, area of specialization, or geographic location, with advanced filtering options by state and service type to find the perfect legal assistance.

<img width="1000" height="500" alt="LegalAI Help Finder" src="https://github.com/user-attachments/assets/76e2937c-6103-43d5-a23d-0ccd3903c125" />

## **🛠️ Technology Stack**

LegalAI is built on a robust MERN (MongoDB, Express, React, Node.js) architecture with Next.js powering the frontend, enhanced by cutting-edge libraries and AI services:

### **Frontend Architecture:**
- **Next.js**: Advanced React framework for server-side rendering and static generation
- **React**: Modern JavaScript library for building dynamic user interfaces
- **TypeScript**: Enhanced JavaScript with comprehensive type safety
- **Tailwind CSS**: Utility-first CSS framework for rapid, responsive UI development
- **Shadcn/ui**: Enterprise-grade UI components built on Radix UI and Tailwind CSS
- **OpenAI API**: Advanced AI capabilities for intelligent chatbot and document processing
- **Supabase**: Robust backend services for user management and data storage
- **react-day-picker**: Modern date selection components
- **framer-motion**: Advanced animation library for smooth user interactions
- **recharts**: Comprehensive charting library for data visualization
- **pdf-parse & pdfjs-dist**: Professional PDF document processing capabilities

### **Backend Infrastructure:**
- **Node.js**: High-performance JavaScript runtime environment
- **Express.js**: Scalable web application framework for Node.js
- **MongoDB**: Flexible NoSQL database for efficient data management
- **Mongoose**: Elegant MongoDB object modeling for Node.js
- **bcryptjs**: Secure password hashing and verification
- **express-session**: Robust session management middleware
- **cors**: Secure Cross-Origin Resource Sharing configuration
- **ts-node-dev**: Development environment with TypeScript hot-reloading
- **typescript**: Full-stack type safety implementation

## **🚀 Quick Start Guide**

Follow these steps to set up LegalAI on your local development environment:

### **Prerequisites**
Ensure your system meets the following requirements:
- **Node.js** (version 18 or higher recommended)
- **npm** (included with Node.js) or **yarn** package manager
- **Git** for version control
- **MongoDB** instance (local or cloud-based)
- **OpenAI API Key**: Available from OpenAI Platform
- **Supabase Credentials**: Project URL and Anonymous Key from Supabase Dashboard

## **Installation & Configuration**

### **1. Repository Setup:**
```bash
git clone https://github.com/sakshitiwariii/Legal-AI.git
cd Legal-AI
```

### **2. Backend Configuration:**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following configuration:
```
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
SESSION_SECRET=generate_a_secure_random_string_for_session_management
OPENAI_API_KEY=your_openai_api_key_here
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anonymous_key
```

Compile the backend TypeScript code:
```bash
npm run build
```

### **3. Frontend Setup:**
Return to the project root directory and install dependencies:
```bash
cd ..
npm install
```

Launch the development environment:
```bash
npm run dev
```

LegalAI will now be accessible at `http://localhost:3000` with the backend running on `http://localhost:5000`.

## **🎯 Key Benefits**
- **Democratized Legal Access**: Making complex legal information accessible to all citizens
- **AI-Powered Insights**: Advanced artificial intelligence for accurate legal guidance
- **Real-time Case Management**: Comprehensive tracking of legal proceedings
- **Document Intelligence**: Simplified understanding of complex legal documents
- **Verified Legal Network**: Trusted connections with legal professionals nationwide

LegalAI represents a significant step forward in legal technology, bridging the gap between complex legal systems and everyday citizens through intelligent, accessible technology solutions.
