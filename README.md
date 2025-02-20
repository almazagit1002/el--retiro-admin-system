# El Retiro Admin System

A comprehensive user management system built with Expo Router and Supabase authentication. This application provides a secure login system and user management interface for El Retiro's operations.

## 🚀 Tech Stack

- **Framework**: Expo (SDK 52.0.33)
- **Navigation**: Expo Router 4.0.17
- **Authentication & Database**: Supabase
- **UI Components**: React Native core components
- **Icons**: Expo Vector Icons
- **Form Components**: @react-native-picker/picker

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
  - `index.tsx` - User Management Dashboard
    - Create new users with different roles
    - Form validation
    - Role-based access control
    - Key functions:
      - `handleCreateUser`: User creation process
      - `validateForm`: Form validation

#### `/lib` - Utility Functions
- `supabase.ts` - Supabase client configuration
  - Initializes Supabase connection
  - Handles environment variables

#### `/types` - TypeScript Type Definitions
- `supabase.ts` - Database type definitions
- `env.d.ts` - Environment variables type definitions

#### `/supabase/migrations` - Database Migrations
- `perfiles.sql` - User profiles schema
  - Table structure
  - Indexes
  - Row Level Security policies
  - Triggers for timestamp updates

## 🔐 User Management System

### User Roles

The system supports three types of users:
1. **Super Administrador** (super_admin)
   - Full system access
   - Can manage all users
   - Complete CRUD operations

2. **Administrador** (admin)
   - Can view all users
   - Can create employee-level users
   - Limited management capabilities

3. **Empleado** (employee)
   - Basic access level
   - Limited to viewing specific information

### User Profile Schema

Each user profile contains:
- Email (unique)
- Full Name
- Phone Number
- Employee Type
- Creation Date
- Last Update Date

### Security Features

- Row Level Security (RLS) policies
- Role-based access control
- Secure password handling
- Email validation
- Input sanitization

## 🛠 Setup Instructions

### Prerequisites

1. Node.js (v18 or higher)
2. npm or yarn
3. Expo CLI
\`\`\`bash
npm install -g expo-cli
\`\`\`

### Environment Setup

1. Create a \`.env\` file in the root directory:
\`\`\`bash
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### Installation

1. Clone the repository
2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## 📦 Dependencies

### Core Dependencies
\`\`\`json
{
  "@expo/vector-icons": "^14.0.2",
  "@react-native-picker/picker": "2.6.1",
  "@react-navigation/bottom-tabs": "^7.2.0",
  "@react-navigation/native": "^7.0.14",
  "@supabase/supabase-js": "^2.39.3",
  "expo": "52.0.33",
  "expo-constants": "^17.0.5",
  "expo-router": "4.0.17",
  "expo-secure-store": "~12.8.1"
}
\`\`\`

## 🔄 Navigation Flow

1. Initial Route (\`/\`)
   - Displays login screen for unauthenticated users
   - Redirects to dashboard for authenticated users

2. Authenticated Routes (\`/(tabs)\`)
   - User Management Dashboard
   - Create new users
   - Role-based interface

## 🎨 Styling

The application uses React Native's StyleSheet with a consistent color scheme:
- Primary Color: #8B4513 (Brown)
- Background: #fff (White)
- Error Color: #ff4444
- Success Color: #2e7d32

## 🚀 Deployment

The application can be deployed using Expo's build service:

1. For web:
\`\`\`bash
npm run build:web
\`\`\`

2. For iOS/Android:
\`\`\`bash
expo build:ios
expo build:android
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please contact [alemazav1002@gmail.com](alemazav1002@gmail.com)