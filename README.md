# ToolNest - Rent DIY Tools From Your Neighbors

ToolNest is a web application that connects DIY enthusiasts with local tool owners. Users can rent tools for their projects at a fraction of the cost of buying them.

## Project Structure

The project follows a modern web application architecture with a clear separation of concerns:

```
projectWEB/
├── core/
│   ├── backend/           # Laravel backend application
│   │   ├── app/          # Application core
│   │   ├── database/     # Database migrations and seeders
│   │   ├── routes/       # API routes
│   │   └── .env          # Environment configuration
│   ├── frontend/         # Next.js frontend application
│   │   ├── app/          # Next.js app directory (pages, layouts)
│   │   │   ├── page.tsx  # Landing page with tool listings
│   │   │   ├── layout.tsx # Root layout
│   │   │   ├── auth/     # Authentication pages
│   │   │   └── globals.css # Global CSS
│   │   ├── components/   # Reusable UI components
│   │   │   ├── ui/       # UI component library (shadcn/ui with 45+ components)
│   │   │   └── theme-provider.tsx
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and shared code
│   │   ├── public/       # Static assets
│   │   ├── styles/       # Global styles
│   │   ├── next.config.mjs # Next.js configuration
│   │   ├── package.json  # Frontend dependencies
│   │   ├── tailwind.config.ts # Tailwind CSS configuration
│   │   └── tsconfig.json # TypeScript configuration
│   └── infrastructure/   # Infrastructure as code (planned for future implementation)
└── README.md            # Project documentation
```

## Technology Stack

- **Backend**:
  - Laravel 12
  - MySQL
  - RESTful API
  - JWT Authentication

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
- PHP 8.2 or later
- Composer
- MySQL 8.0 or later

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

3. Install backend dependencies
   ```bash
   cd core/backend
   composer install
   ```

4. Configure the backend environment
   ```bash
   cd core/backend
   cp .env.example .env
   php artisan key:generate
   ```

5. Update the .env file with your database credentials:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=mvc_web2
   DB_USERNAME=root
   DB_PASSWORD=
   ```

6. Run database migrations
   ```bash
   cd core/backend
   php artisan migrate
   ```

### Running the Application

1. Start the backend server
   ```bash
   cd core/backend
   php artisan serve
   ```
   The backend will be available at `http://localhost:8000`

2. Start the frontend development server
   ```bash
   cd core/frontend
   npm run dev
   # or if using pnpm
   pnpm dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

### Platform-Specific Instructions

#### Linux

1. Install PHP and MySQL:
   ```bash
   # Using apt (Debian/Ubuntu)
   sudo apt update
   sudo apt install php php-mysql mysql-server composer

   # Using dnf (Fedora)
   sudo dnf install php php-mysqlnd mysql-server composer
   ```

2. Install Node.js and npm:
   ```bash
   # Using apt (Debian/Ubuntu)
   sudo apt install nodejs npm

   # Using dnf (Fedora)
   sudo dnf install nodejs npm

   # Check installation
   node --version  # Should be v18 or later
   npm --version
   ```

3. Optionally install pnpm:
   ```bash
   npm install -g pnpm
   ```

4. Run the application:
   ```bash
   # Start backend
   cd core/backend
   php artisan serve

   # Start frontend (in a new terminal)
   cd core/frontend
   npm run dev
   # or with pnpm
   pnpm dev
   ```

#### macOS

1. Install PHP and MySQL using Homebrew:
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

   # Install PHP and MySQL
   brew install php mysql

   # Install Composer
   brew install composer
   ```

2. Install Node.js and npm:
   ```bash
   brew install node

   # Check installation
   node --version  # Should be v18 or later
   npm --version
   ```

3. Optionally install pnpm:
   ```bash
   npm install -g pnpm
   ```

4. Run the application:
   ```bash
   # Start backend
   cd core/backend
   php artisan serve

   # Start frontend (in a new terminal)
   cd core/frontend
   npm run dev
   # or with pnpm
   pnpm dev
   ```

#### Windows

1. Install PHP and MySQL:
   - Download XAMPP from [apachefriends.org](https://www.apachefriends.org/)
   - Run the installer and follow the installation wizard
   - Ensure you select PHP and MySQL during installation

2. Install Composer:
   - Download the installer from [getcomposer.org](https://getcomposer.org/)
   - Run the installer and follow the installation wizard

3. Install Node.js:
   - Download the installer from [nodejs.org](https://nodejs.org/)
   - Run the installer and follow the installation wizard

4. Open Command Prompt or PowerShell:

5. Optionally install pnpm:
   ```powershell
   npm install -g pnpm
   ```

6. Run the application:
   ```powershell
   # Start backend
   cd core\backend
   php artisan serve

   # Start frontend (in a new terminal)
   cd core\frontend
   npm run dev
   # or with pnpm
   pnpm dev
   ```

### Building for Production

```bash
# Build frontend
cd core/frontend
npm run build
# or if using pnpm
pnpm build

# Build backend
cd core/backend
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
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
