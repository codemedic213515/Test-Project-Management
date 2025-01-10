# Project Management Application

A modern project management application built with Next.js, React 18, and shadcn/ui components.

## Features

- Project listing with sorting and filtering
- Project details view
- Create and edit projects
- Favorite projects functionality
- Responsive design
- Error handling and loading states
- Form validation
- Unit testing

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Hook Form
- Zod validation
- React Testing Library
- Vitest

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/codemedic213515/test-project-management.git
   cd project-management
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install

# or

yarn install
\`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev

# or

yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running Tests

To run the test suite:

\`\`\`bash
npm test

# or

yarn test
\`\`\`

## Project Structure

\`\`\`
├── app/ # Next.js app directory
│ ├── projects/ # Project-related pages
│ └── page.tsx # Home page (project list)
├── components/ # Reusable components
├── context/ # React Context providers
├── lib/ # Utilities and API functions
├── types/ # TypeScript type definitions
└── **tests**/ # Test files
\`\`\`

## Features in Detail

### Project List

- View all projects in a table format
- Toggle favorite status
- Sort by different columns
- Quick access to project details

### Project Details

- View comprehensive project information
- Edit project details
- Toggle favorite status
- Delete project

### Create/Edit Project

- Form validation
- Date picker for start and end dates
- Error handling
- Loading states

### Favorite Projects

- Quick access sidebar
- Synchronized state across components
- Persistent storage

## Error Handling

The application includes comprehensive error handling:

- API failure simulation
- Loading states
- User-friendly error messages
- Form validation errors
- Network error handling

## Responsive Design

The application is fully responsive and works on:

- Mobile devices
- Tablets
- Desktop computers

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
