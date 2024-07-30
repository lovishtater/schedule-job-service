# Job Service Application

## Overview

This project is a full-stack application consisting of a backend service using Node.js and Express, and a frontend client built with React and Tailwind CSS. The backend handles job creation and processing, while the frontend displays job information and updates in real-time using WebSockets.

## Table of Contents

- [Time Report](#time-report)
- [Setup Instructions](#setup-instructions)
- [Technologies Used](#technologies-used)

## Time Report

### Development Phases

1. **Project Initialization and Setup**
   - **Initial Backend Setup and Git Configuration:** 1 hour
   - **Frontend Setup and Tailwind CSS Integration:** 1 hour

2. **Backend Development**
   - **Preparing the Approach and Design:** 2 hour
   - **Express Setup and Basic Routes:** 2 hours
   - **Job Processing Logic:** 2 hours 
   - **Socket.IO Integration:** 2 hours
   - **Experimenting around clustering, worker threads, bullmq:** 3 hour

3. **Frontend Development**
   - **Preparing the Approach and Design:** 0.5 hour
   - **Job List UI:** 2 hours
   - **Socket.IO Integration for Real-time Updates:** 1.5 hours

4. **Documentation and Final Touches**
   - **Writing README and Setup Instructions:** 1 hour
   - **Final Testing and Cleanup:** 0.5 hour

**Total Time Spent:** 18.5 hours

## Setup Instructions

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>/backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` File:**

   Sign in to unsplash.com and create an application to get the access key. Create a `.env` file in the `backend` directory and add the following:

   ```env
   UNSPLASH_ACCESS_KEY=<your-access-key>
   ```

4. **Start the Server:**

   ```bash
   npm run dev
   ```

   The server will be running on `http://localhost:3000`.

### Frontend Setup

1. **Navigate to the Frontend Directory:**

   ```bash
   cd <repository-directory>/frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Development Server:**

   ```bash
   npm start
   ```

   The frontend will be running on `http://localhost:3001`.


## Technologies Used

- **Backend:** Node.js, Express, Socket.IO
- **Frontend:** React, Tailwind CSS
- **Database:** File-based (JSON files)
- **Deployment:** Vercel
