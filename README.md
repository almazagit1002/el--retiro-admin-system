# El Retiro Admin System

A comprehensive administration system built with Expo Router and Supabase authentication. This application provides a secure login system and a dashboard interface for managing El Retiro's operations.

## 🚀 Tech Stack

- **Framework**: Expo (SDK 52.0.33)
- **Navigation**: Expo Router 4.0.17
- **Authentication**: Supabase
- **UI Components**: React Native core components
- **Icons**: Expo Vector Icons

## 📁 Project Structure

### Root Configuration Files

- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `app.json` - Expo configuration
- `.env` - Environment variables (Supabase configuration)
- `.prettierrc` - Code formatting rules

### Core Directories

#### `/app` - Application Routes
- `_layout.tsx` - Root layout with authentication flow
  - Handles session management
  - Manages navigation based on auth state
  - Key function: `useEffect` hook for auth state monitoring

- `index.tsx` - Login screen
  - Implements responsive login form
  - Handles Supabase authentication
  - Form validation and error handling
  - Key functions: 
    - `handleLogin`: Manages login process
    - `validateForm`: Form validation logic

- `/app/(tabs)` - Post-authentication screens
  - `_layout.tsx` - Tab navigation configuration
  - `index.tsx` - Home dashboard
  - `profile.tsx` - User profile and logout
    - Key function: `handleSignOut` for user logout

#### `/lib` - Utility Functions
- `supabase.ts` - Supabase client configuration
  - Initializes Supabase connection
  - Handles environment variables

#### `/types` - TypeScript Type Definitions
- `supabase.ts` - Database type definitions
- `env.d.ts` - Environment variables type definitions

#### `/assets`
- `/images`
  - `icon.png` - App icon
  - `favicon.png` - Web favicon
  - `logo_retiro.png` - Application logo

## 🛠 Setup Instructions

### Prerequisites

1. Node.js (v18 or higher)
2. npm or yarn
3. Expo CLI
```bash
npm install -g expo-cli
```

### Environment Setup

1. Create a `.env` file in the root directory:
```bash
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/el-retiro-admin-system.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🔐 Authentication

The application uses Supabase authentication with email and password. The authentication flow is handled in the following files:

- `app/_layout.tsx`: Manages auth state and navigation
- `app/index.tsx`: Login screen implementation
- `lib/supabase.ts`: Supabase client configuration

### Login Process

1. User enters email and password
2. Form validation occurs
3. Credentials are verified with Supabase
4. On successful login, user is redirected to the dashboard
5. Session is maintained until logout

## 📱 Main Features

### Login Screen (`app/index.tsx`)
- Responsive design
- Form validation
- Error handling
- Keyboard-aware layout

### Dashboard (`app/(tabs)/index.tsx`)
- Welcome header
- Statistics cards
- System overview
- Responsive layout

### Profile (`app/(tabs)/profile.tsx`)
- User information
- Logout functionality

## 🎨 Styling

The application uses React Native's StyleSheet for styling with a consistent color scheme:

- Primary Color: #8B4513 (Brown)
- Background: #fff (White)
- Text Colors: Various shades of gray
- Error Color: #ff4444

## 🔄 Navigation Flow

1. Initial Route (`/`)
   - Displays login screen for unauthenticated users
   - Redirects to dashboard for authenticated users

2. Authenticated Routes (`/(tabs)`)
   - Home Dashboard
   - Profile Section

## 📦 Dependencies

### Core Dependencies
```json
{
  "@expo/vector-icons": "^14.0.2",
  "@react-navigation/bottom-tabs": "^7.2.0",
  "@react-navigation/native": "^7.0.14",
  "@supabase/supabase-js": "^2.39.3",
  "expo": "52.0.33",
  "expo-router": "4.0.17",
  "react": "18.3.1",
  "react-native": "0.76.6"
}
```

### Development Dependencies
```json
{
  "@babel/core": "^7.25.2",
  "@types/react": "~18.3.12",
  "typescript": "^5.3.3"
}
```

## 🚀 Deployment

The application can be deployed using Expo's build service:

1. For web:
```bash
npm run build:web
```

2. For iOS/Android:
```bash
expo build:ios
expo build:android
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please contact [alemazav1002@gmail.com](alemazav1002@gmail.com.)