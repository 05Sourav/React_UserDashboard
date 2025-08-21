# React User Dashboard

A simple user dashboard built with React, Axios, React Router, and Tailwind CSS.

## Features

- Fetch and display users from API
- Search/filter users by name
- Create new users (client-side only)
- View user details including address and geo-location
- Responsive design

## Project Structure

src/
 ├── api/
 │    └── users.js              # API utilities for fetching users
 │
 ├── assets/
 │    └── react.svg             # Static assets (e.g., logo, images)
 │
 ├── components/
 │    ├── CreateUserForm.jsx    # Form component for adding a new user
 │    └── UserCard.jsx          # Card UI component for displaying user info
 │
 ├── context/
 │    └── UserContext.jsx       # React Context for global user state management
 │
 ├── hooks/
 │    └── useDebouncedValue.js  # Custom hook for debouncing (used in search/filter)
 │
 ├── pages/
 │    ├── DashboardPage.jsx     # Dashboard view showing list of users
 │    └── UserDetailsPage.jsx   # Detailed user info page
 │
 ├── App.jsx                    # Root component with route setup
 ├── App.css                    # App-level styles
 ├── index.css                  # Global styles
 └── main.jsx                   # Application entry point


## Setup

```sh
git clone https://github.com/05Sourav/React_UserDashboard.git
cd React_UserDashboard
npm install
npm run dev
```

## Screenshots

![Dashboard Screenshot](screenshots/dashboard.png)
![User Details Screenshot](screenshots/details.png)

## Tech Stack

- React (hooks)
- Axios
- React Router DOM
- Tailwind CSS
