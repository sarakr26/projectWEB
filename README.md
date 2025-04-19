# ToolNest - Rent DIY Tools From Your Neighbors

ToolNest is a web application that connects DIY enthusiasts with local tool owners. Users can rent tools for their projects at a fraction of the cost of buying them.

## Project Structure

The project follows a modern web application architecture with a clear separation of concerns:

```
projectWEB/
├── core/
│   ├── backend/           # Backend services (planned for future implementation)
│   ├── frontend/          # Next.js frontend application
│   │   ├── app/           # Next.js app directory (pages, layouts)
│   │   │   ├── page.tsx   # Landing page with tool listings
│   │   │   ├── layout.tsx # Root layout
│   │   │   ├── auth/      # Authentication pages
│   │   │   └── globals.css # Global CSS
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ui/        # UI component library (shadcn/ui with 45+ components)
│   │   │   └── theme-provider.tsx
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and shared code
│   │   ├── public/        # Static assets
│   │   ├── styles/        # Global styles
│   │   ├── next.config.mjs # Next.js configuration
│   │   ├── package.json   # Frontend dependencies
│   │   ├── tailwind.config.ts # Tailwind CSS configuration
│   │   └── tsconfig.json  # TypeScript configuration
│   └── infrastructure/    # Infrastructure as code (planned for future implementation)
└── README.md             # Project documentation
```

## Technology Stack

- **Frontend**: 
  - Next.js 15.2.4
  - React 19
  - TypeScript
  - Tailwind CSS for styling
  - shadcn/ui component library
  - Lucide React for icons
  - Framer Motion for animations

- **UI Components**:
  - Built with Radix UI primitives (45+ components)
  - Styled with Tailwind CSS
  - Fully accessible and customizable
  - Motion animations with Framer Motion

- **Form Handling**:
  - React Hook Form
  - Zod for validation

## Current Features

- Responsive landing page with mobile menu
- Tool listing showcase with search functionality
- Category filtering
- Tool cards with rating, price, and location information
- Dark/light mode theming
- Animated UI elements for enhanced user experience

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or pnpm

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd projectWEB
   ```

2. Install frontend dependencies
   ```bash
   cd core/frontend
   npm install
   # or if using pnpm
   pnpm install
   ```

### Running the Application

1. Start the development server
   ```bash
   cd core/frontend
   npm run dev
   # or if using pnpm
   pnpm dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

### Platform-Specific Instructions

#### Linux

1. Install Node.js and npm:
   ```bash
   # Using apt (Debian/Ubuntu)
   sudo apt update
   sudo apt install nodejs npm

   # Using dnf (Fedora)
   sudo dnf install nodejs npm

   # Check installation
   node --version  # Should be v18 or later
   npm --version
   ```

2. Optionally install pnpm:
   ```bash
   npm install -g pnpm
   ```

3. Run the application:
   ```bash
   cd core/frontend
   npm run dev
   # or with pnpm
   pnpm dev
   ```

#### macOS

1. Install Node.js and npm using Homebrew:
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

   # Install Node.js
   brew install node

   # Check installation
   node --version  # Should be v18 or later
   npm --version
   ```

2. Optionally install pnpm:
   ```bash
   npm install -g pnpm
   ```

3. Run the application:
   ```bash
   cd core/frontend
   npm run dev
   # or with pnpm
   pnpm dev
   ```

#### Windows

1. Install Node.js:
   - Download the installer from [nodejs.org](https://nodejs.org/)
   - Run the installer and follow the installation wizard
   - Ensure you select the option to install npm during installation

2. Open Command Prompt or PowerShell:

3. Optionally install pnpm:
   ```powershell
   npm install -g pnpm
   ```

4. Navigate to the project directory:
   ```powershell
   cd path\to\projectWEB\core\frontend
   ```

5. Run the application:
   ```powershell
   npm run dev
   # or with pnpm
   pnpm dev
   ```

### Building for Production

```bash
cd core/frontend
npm run build
# or if using pnpm
pnpm build
```

## Roadmap

- **Backend Implementation**:
  - RESTful API with Node.js/Express or Next.js API routes
  - Database integration (MongoDB or PostgreSQL)
  - User authentication and authorization

- **Frontend Enhancements**:
  - Complete user authentication flow
  - Tool listing creation and management
  - User profiles and ratings
  - Booking system
  - Payment integration

- **Infrastructure**:
  - Deployment configuration
  - CI/CD pipeline
  - Containerization with Docker

## Project Goals

- Create a sustainable, community-driven tool sharing marketplace
- Reduce waste by maximizing the use of existing tools
- Make DIY projects more accessible and affordable
- Build a trust-based community of tool owners and renters
