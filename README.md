# Vue Chat Application

A chat application built with Vue 3, TypeScript, and Vite. This application features a clean, responsive interface with room-based messaging capabilities.

## 🚀 Quick Start

### Prerequisites

Before running this project locally, ensure you have the following installed:

- **Node.js** (version 22 or higher)
- **pnpm** (recommended package manager)

### Installation & Setup

1. **Clone the repository** (if not already cloned):

   ```sh
   git clone https://github.com/hendraaagil/vue-chat
   cd vue-chat
   ```

2. **Install dependencies**:

   ```sh
   pnpm install
   ```

3. **Start the development server**:

   ```sh
   pnpm dev
   ```

4. **Open your browser** and navigate to:

   ```
   http://localhost:5173
   ```

The application will automatically reload when you make changes to the source code.

## 📁 Project Structure

```
vue-chat/
├── src/
│   ├── components/      # Reusable Vue components
│   │   └── chat/        # Chat-specific components
│   ├── views/           # Page-level components
│   ├── stores/          # Pinia state management
│   ├── router/          # Vue Router configuration
│   ├── types/           # TypeScript type definitions
│   ├── data/            # Mock data files
│   └── lib/             # Utility functions
├── public/              # Static assets
└── package.json         # Project dependencies and scripts
```

## 🔧 Development Workflow

### Running the Application

1. **Development Mode**:

   ```sh
   pnpm dev
   ```

2. **Production Preview**:

   ```sh
   pnpm build
   pnpm preview
   ```

### Code Quality

- **Type Checking**: The project uses TypeScript for type safety

  ```sh
  pnpm type-check
  ```

- **Linting**: ESLint is configured for code quality

  ```sh
  pnpm lint
  ```

- **Formatting**: Prettier handles code formatting
  ```sh
  pnpm format
  ```

## 🔧 Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **Development Tools**: Vue DevTools, ESLint, Prettier
