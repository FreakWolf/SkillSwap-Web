# SkillSwap - Connect, Learn, Grow

SkillSwap is an innovative web application designed to foster a community of learning and skill exchange. Users can effortlessly offer their expertise in various domains and discover new skills they wish to acquire. Our platform aims to connect individuals, enabling them to share knowledge, collaborate, and grow together.

## Key Features

*   **Personalized Profiles**: Users can create and manage detailed profiles, showcasing their skills, availability, and preferences.
*   **Skill Management**: Easily add skills you can teach or want to learn, categorized by type and proficiency level.
*   **Availability Calendar**: Set your weekly availability for teaching or learning sessions.
*   **Skill Marketplace**: Browse and discover skills offered by other users.
*   **Analytics Dashboard**: Track your learning progress and session statistics.
*   **Responsive Design**: Optimized for desktop and mobile devices.

## Technologies Used

*   **React 19**: Modern JavaScript library for building user interfaces.
*   **TypeScript**: Type-safe JavaScript superset for improved development experience.
*   **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
*   **@radix-ui**: Accessible UI component library for building high-quality interfaces.
*   **class-variance-authority**: Utility for defining and managing component variants.
*   **react-day-picker**: Flexible date picker component for React.
*   **recharts**: Composable charting library built on React components.
*   **lucide-react**: Beautiful and consistent icon library.
*   **React Hook Form**: Performant, flexible forms library for React.
*   **Create React App**: Development environment and build tool for React applications.

## Getting Started (Development Setup)

To get a local copy of SkillSwap up and running for development, follow these steps.

### Prerequisites

*   Node.js (version 14 or higher)
*   npm or Yarn
*   Git

### 1. Clone the Repository

```sh
git clone [https://github.com/yourusername/skillswap.git](https://github.com/FreakWolf/SkillSwap-Web.git)
cd SkillSwap-Web
```

### 2. Install Dependencies

Navigate to the project's root directory in your terminal and install the required Node.js packages:

```sh
# Using npm
npm install

# OR using Yarn
yarn install
```

### 3. Start the Development Server

Start the development server with the following command:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

The application will automatically open in your default browser at [http://localhost:3000](http://localhost:3000).

### 4. Build for Production

To create a production build of the application, run:

```sh
# Using npm
npm run build

# OR using Yarn
yarn build
```

This will generate a `build` directory containing the optimized production build.

## Making Changes (Development Workflow)

*   **Fast Refresh**: When you modify files in your text editor and save them, your app will automatically update to reflect these changes, thanks to Fast Refresh.
*   **Full Reload**: To perform a full reload, press <kbd>F5</kbd> in your browser or use the reload button.

## Project Structure

```
skillswap/
├── src/
│   ├── components/          # React components
│   │   ├── ui/              # UI component library
│   │   ├── AnalyticsDashboard.tsx
│   │   ├── BookingScreen.tsx
│   │   ├── SkillMarketplace.tsx
│   │   └── ...
│   ├── App.tsx              # Main application component
│   ├── index.css            # Global styles with Tailwind directives
│   ├── index.js             # Application entry point
│   └── ...
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Troubleshooting

If you encounter any issues during setup or development, please refer to the following resources:

*   [Create React App Troubleshooting](https://create-react-app.dev/docs/troubleshooting/)
*   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
*   [React Documentation](https://react.dev/learn)

## Learn More

For further information on the technologies used in this project, explore these resources:

*   [React Official Website](https://react.dev)
*   [TypeScript Documentation](https://www.typescriptlang.org/docs/)
*   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
*   [@radix-ui Documentation](https://www.radix-ui.com/docs)
*   [Create React App Documentation](https://create-react-app.dev/docs/getting-started/)
