# 🚀 AI Analytics Dashboard

A modern, responsive analytics dashboard built with React, TypeScript, and shadcn/ui. Features real-time data visualization, interactive charts, and smooth animations.

## 🌐 Live Demo

**[View Live Demo](https://admybrand-aidashboard.netlify.app/)** - Experience the dashboard in action!


## ✨ Features

### 📊 **Data Visualization**
- **Interactive Charts**: Line charts, bar charts, and donut charts with Recharts
- **Real-time Metrics**: Animated KPI cards with trend indicators
- **Responsive Design**: Adapts seamlessly across all devices
- **Data Filtering**: Time period selection (This month, This year, etc.)

### 🎨 **Modern UI/UX**
- **Glass Morphism Design**: Beautiful glass-like components
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Dark/Light Theme**: Toggle between themes with persistent state
- **Loading Skeletons**: Progressive loading states with staggered animations

### 🧭 **Navigation & Layout**
- **Collapsible Sidebar**: Responsive navigation with smooth transitions
- **Page Transitions**: Smooth route changes with Framer Motion
- **Search & Filters**: Advanced filtering and search capabilities
- **Export Functionality**: CSV and PDF export options


## 🛠️ Tech Stack

| **Category** | **Technologies** |
|--------------|------------------|
| **Frontend** | React 18, TypeScript, Vite |
| **UI Library** | shadcn/ui, Tailwind CSS |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Routing** | React Router DOM |
| **Deployment** | Netlify |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-analytics-dashboard.git
   cd ai-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── charts/          # Chart components
│   │   ├── skeletons/       # Loading skeletons
│   │   ├── header.tsx       # Top navigation
│   │   ├── sidebar.tsx      # Sidebar navigation
│   │   └── metric-card.tsx  # KPI cards
│   └── ui/                  # shadcn/ui components
├── contexts/
│   ├── DataContext.tsx      # Global data management
│   └── LoadingContext.tsx   # Loading state management
├── hooks/
│   └── useReducedMotion.ts  # Accessibility hook
├── pages/
│   ├── Dashboard.tsx        # Main dashboard
│   ├── Analytics.tsx        # Analytics page
│   ├── Revenue.tsx          # Revenue page
│   ├── Campaigns.tsx        # Campaigns page
│   ├── Performance.tsx      # Performance page
│   ├── Growth.tsx           # Growth page
│   └── NotFound.tsx         # 404 page
└── App.tsx                  # Main app component
```

## 🎯 Key Features

### Dashboard Components
- **Metric Cards**: Real-time KPI displays with animated counters
- **Interactive Charts**: Line, bar, and donut charts with tooltips
- **Data Tables**: Sortable and filterable data presentation
- **Loading States**: Beautiful skeleton screens during loading

### Navigation System
- **Responsive Sidebar**: Collapsible navigation with smooth animations
- **Header Controls**: Search, notifications, theme toggle, and export options
- **Page Transitions**: Smooth route changes with Framer Motion

### Data Management
- **Context Providers**: Global state management with React Context
- **Time Period Filtering**: Dynamic data filtering by time periods
- **Export Functionality**: CSV and PDF export capabilities

## 🎨 Design System

### Color Palette
- **Primary**: Modern blue gradient
- **Secondary**: Neutral grays
- **Accent**: Success/error states
- **Background**: Glass morphism effects

### Typography
- **Headings**: Inter font family
- **Body**: System font stack
- **Monospace**: Code and data display

### Components
- **Cards**: Glass morphism with subtle shadows
- **Buttons**: Hover effects and loading states
- **Charts**: Custom tooltips and animations
- **Navigation**: Smooth transitions and active states

## 📱 Responsive Design

| **Breakpoint** | **Layout** | **Features** |
|----------------|------------|--------------|
| **Mobile** (320px-768px) | Single column | Bottom navigation, stacked cards |
| **Tablet** (768px-1024px) | 2-column grid | Partial sidebar, adaptive charts |
| **Desktop** (1024px+) | 3-column grid | Full sidebar, expanded features |

## 🚀 Deployment

### Netlify Deployment
1. **Connect Repository**: Link your GitHub repository to Netlify
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment Variables**: Configure if needed
4. **Deploy**: Automatic deployment on push to main branch

### Local Build
```bash
npm run build
npm run preview
```

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **Husky**: Git hooks for quality checks

## 🤖 AI-Assisted Development

This project was built using AI-assisted development tools:

- **Cursor IDE**: AI-powered development environment
- **GitHub Copilot**: Code completion and generation

See [AI_USAGE_REPORT.md](./AI_USAGE_REPORT.md) for detailed information about the AI development process.


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


