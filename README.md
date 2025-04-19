# ToolNest - Rent DIY Tools From Your Neighbors

ToolNest is a web application that connects DIY enthusiasts with local tool owners. Users can rent tools for their projects at a fraction of the cost of buying them.

## Project Structure

The project follows a modern web application architecture with a clear separation of concerns:

```
projectWEB/
├── core/
│   ├── backend/           # Backend services (currently empty, planned for future)
│   ├── frontend/          # Next.js frontend application
│   │   ├── app/           # Next.js app directory (pages, layouts)
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ui/        # UI component library (shadcn/ui)
│   │   │   └── theme-provider.tsx
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and shared code
│   │   ├── public/        # Static assets
│   │   ├── styles/        # Global styles
│   │   ├── next.config.mjs # Next.js configuration
│   │   ├── package.json   # Frontend dependencies
│   │   ├── tailwind.config.ts # Tailwind CSS configuration
│   │   └── tsconfig.json  # TypeScript configuration
│   └── infrastructure/    # Infrastructure as code (currently empty, planned for future)
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

- **UI Components**:
  - Built with Radix UI primitives
  - Styled with Tailwind CSS
  - Fully accessible and customizable

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

### Building for Production

```bash
cd core/frontend
npm run build
# or if using pnpm
pnpm build
```

## Project Features

- Tool rental marketplace
- Search and filter tools by location
- User authentication (planned)
- Tool listing management (planned)
- Booking and payment system (planned)

## Future Development

- Backend API implementation
- User authentication and profiles
- Tool listing and rental management
- Payment processing integration
- Reviews and ratings system
- Notification system
