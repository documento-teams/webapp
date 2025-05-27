# Documento - Collaborative Document Management Platform

## 📖 Overview

**Documento** is a modern, collaborative document management platform built with React and a Fastify backend. It provides a comprehensive solution for creating, editing, and managing documents with real-time collaboration features, workspace organization, and advanced permission management.

### ✨ Key Features

- **🔐 User Authentication**: Secure login/registration with JWT-based authentication
- **📝 MDX Document Editing**: Rich text editing with MDX support for enhanced formatting
- **🏢 Workspace Management**: Organize documents into dedicated workspaces
- **🛡️ Permission System**: Read-only and edit access controls for document sharing
- **📱 Responsive UI**: Modern, mobile-friendly interface built with Tailwind CSS
- **⚡ Real-time Updates**: Reactive UI with instant updates across the platform
- **🎨 Modern Design**: Clean, intuitive interface with smooth animations

### 🛠️ Technology Stack

**Frontend:**
- **React 19** - Modern React with latest features
- **Vite** - Lightning-fast build tool and development server
- **React Router v7** - Client-side routing with nested layouts
- **Tailwind CSS 4** - Utility-first CSS framework
- **MDXEditor** - Advanced MDX editing capabilities
- **React Hot Toast** - Elegant notification system
- **js-cookie** - Cookie management for authentication

**Backend Integration:**
- **Fastify API** - High-performance backend server
- **JWT Authentication** - Secure token-based authentication
- **Cookie-based Sessions** - Secure session management

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**, **yarn**, or **bun** package manager
- **Fastify backend** running on port 3000

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd documento/webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or with yarn
   yarn install
   # or with bun
   bun install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or with yarn
   yarn dev
   # or with bun
   bun dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

| Command | Bun Alternative | Description |
|---------|-----------------|-------------|
| `npm run dev` | `bun dev` | Start development server with hot reload |
| `npm run build` | `bun run build` | Build production bundle |
| `npm run preview` | `bun run preview` | Preview production build locally |
| `npm run lint` | `bun run lint` | Run ESLint code analysis |
| `npm run lint:fix` | `bun run lint:fix` | Fix ESLint issues automatically |

## 🏗️ Project Structure

```
webapp/
├── public/                  # Static assets
├── src/
│   ├── assets/             # Images, icons, and other assets
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Generic components (buttons, inputs, etc.)
│   │   ├── editor/         # Document editing components
│   │   ├── form/           # Form components (login, register)
│   │   ├── list/           # List and item components
│   │   ├── navigation/     # Navigation and sidebar components
│   │   ├── privateRoutes/  # Route protection components
│   │   └── workspaces/     # Workspace-specific components
│   ├── config/
│   │   └── router/         # Application routing configuration
│   ├── hooks/              # Custom React hooks
│   │   ├── useDocument.js  # Document management hooks
│   │   ├── useLogin.js     # Authentication hooks
│   │   ├── useRegister.js  # Registration hooks
│   │   └── useWorkspace.js # Workspace management hooks
│   ├── lib/
│   │   └── api.js          # API client configuration
│   ├── views/              # Page-level components
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Dashboard view
│   │   ├── documents/      # Document-related views
│   │   ├── profile/        # User profile page
│   │   └── workspaces/     # Workspace views
│   ├── App.jsx             # Main application component
│   ├── App.css             # Global styles
│   └── main.jsx            # Application entry point
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md              # This file
```

## 🎯 Core Features

### Authentication System
- **Registration**: Create new user accounts with email validation
- **Login**: Secure login with JWT tokens stored in HTTP-only cookies
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Session Management**: Persistent sessions with automatic token refresh

### Document Management
- **Create Documents**: Rich text documents with MDX support
- **Edit Documents**: Real-time editing with auto-save functionality
- **Delete Documents**: Secure document deletion with confirmation
- **Permission Control**: Read-only vs. edit access for collaborators
- **Document Organization**: Group documents within workspaces

### Workspace Features
- **Create Workspaces**: Organize documents into logical groups
- **Workspace Access**: Share workspaces with team members
- **Document Filtering**: View documents by workspace or author
- **Workspace Management**: Edit, delete, and manage workspace settings

### User Interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Sticky Navigation**: Persistent sidebar for easy navigation
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth loading indicators throughout the app

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` |

### Vite Configuration

The project uses a custom Vite configuration with:
- **React Plugin**: Hot module replacement for React
- **Tailwind CSS**: Integrated CSS processing
- **Path Aliases**: `@/` alias for the `src/` directory
- **Development Server**: Configured for optimal development experience

### Tailwind CSS Setup

The project uses Tailwind CSS v4 with:
- **Custom Utilities**: Project-specific utility classes
- **Responsive Design**: Mobile-first responsive breakpoints
- **Color Scheme**: Consistent color palette across the application

## 🔌 API Integration
```bash
 http://localhost:3000/documentation
```
## 🎨 UI Components

### Common Components
- **Input**: Customizable form input with validation
- **Button**: Consistent button styles with variants
- **Modal**: Reusable modal dialogs
- **Loading**: Animated loading indicators
- **Toast**: Notification system integration

### Specialized Components
- **MDXEditor**: Advanced document editor with syntax highlighting
- **DocumentItem**: Document list item with actions
- **WorkspaceCard**: Workspace display card
- **NavigationSidebar**: Main application navigation
- **CreateForms**: Document and workspace creation forms

## 🚀 Development

### Development Guidelines
1. **Component Structure**: Use functional components with hooks
2. **State Management**: Leverage custom hooks for complex state
3. **API Calls**: Use the centralized API client in `lib/api.js`
4. **Styling**: Follow Tailwind CSS conventions and DaisyUI patterns
5. **Error Handling**: Implement proper error boundaries and user feedback

### Code Quality
- **ESLint**: Configured with React and modern JavaScript rules
- **Prettier**: Code formatting (integrate with your editor)
- **Git Hooks**: Pre-commit hooks for code quality (recommended)

### Testing
While not yet implemented, the project structure supports:
- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: API integration testing
- **E2E Tests**: End-to-end testing with Playwright or Cypress

## 🐛 Troubleshooting

### Common Issues

**1. Authentication Problems**
- Clear browser cookies and localStorage
- Check JWT token expiration
- Verify backend authentication middleware

**2. Build Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
# or with bun
rm -rf node_modules bun.lockb
bun install

# Clear Vite cache
npm run dev -- --force
# or with bun
bun dev --force
```

**3. Styling Issues**
- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS rules

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Standards
- Follow existing code patterns and conventions
- Add appropriate comments for complex logic
- Update documentation for new features
- Test thoroughly before submitting PRs

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 🔗 Related Projects

- **Fastify Backend**: The corresponding backend API for this application
- **Database Schema**: Prisma-based database models and migrations

## 📞 Support

For questions, issues, or contributions:
- Create an issue in the GitHub repository
- Check existing documentation and README files
- Review the project's code structure and examples

---

**Built with ❤️ using React, Vite, and modern web technologies.**

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
