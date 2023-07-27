# Connex One Technical Test

This is a web application that displays the current server time and the time difference since the last time the data was fetched from the server. It also shows prometheus output from the server.

## Getting Started

To get started with this project follow these steps:

1. Clone the repository

```bash
git clone https://github.com/ravenkls/connex-one-test.git
```

### Setting up the Frontend

1. Install the frontend dependencies

```bash
cd connex-one-test
cd frontend
yarn install
```

2. Start the development server

```bash
yarn dev
```

### Setting up the Backend

1. Install the backend dependencies

```bash
cd connex-one-test
cd backend
yarn install
```

2. Start the development server

```bash
yarn dev
```

### Opening the application

Once the frontend and backend servers are running, open your browser and navigate to http://localhost:5173

## Testing

There are also tests in each project, to run the tests navigate into the project (frontend or backend) and run the following command:

```bash
yarn test
```