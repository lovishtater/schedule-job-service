# Job Service Application

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Time Report](#time-report)
- [Setup Instructions](#setup-instructions)
- [Technologies Used](#technologies-used)

## Overview

This project is a full-stack application consisting of a backend service using Node.js and Express, and a frontend client built with React and Tailwind CSS. The backend handles job creation and processes the jobs in the background, sending real-time updates to the frontend using Socket.IO, while the frontend displays job information and updates in real-time.

### How the Application Works

1. **Job Creation**: The user can create a new job from the client. The job is added to the backend server, and a job ID is returned to the client with a status of "PENDING."
2. **Job Processing**: The backend processes the job asynchronously. Once the job is completed, its status is updated to "COMPLETED." Subsequently, a task is enqueued in the `NotifyUserJobResolved` queue to inform the user about the job completion.
3. **Real-time Updates**: The frontend receives real-time updates about the job status using Socket.IO. The job list is updated in real-time to reflect the latest status of the jobs.

## Architecture

### Backend Architecture
Backend consists of 3 routes:
1. **POST /jobs**: This route is used to create a new job.
2. **GET /jobs**: This route is used to fetch all the jobs from the fs database.
3. **GET /jobs/:id**: This route is used to fetch a specific job by its ID.

#### Job Processing
- As soon as a job is created, the client is notified with the job ID and status "PENDING". The job is then enqueued in Node.js's event loop to be processed asynchronously.
- Initially, I explored queue processing tools like BullMQ and Kafka. If we have a large number of jobs, we can use these tools to process jobs in a distributed manner with clustering to enhance scalability, but with the current setup, I am using a simple queue processing mechanism to avoid over-optimization.

#### Socket.IO Integration and Polling as a Fallback
- When a job is updated, the server emits an event to all clients, which updates the job list in real-time.
- To handle intermittent network issues, the client falls back on short polling (5-sec delay) to ensure real-time updates are delivered reliably.


### Frontend Architecture
The frontend is a simple React application that displays the list of jobs and their status. The frontend uses Tailwind CSS for styling and Socket.IO for real-time updates.

- **Job List**: The frontend displays a list of jobs with their status. The status is updated in real-time using Socket.IO.
- **Job Creation**: When a job is created, we add a dummy entry in the job list with a shimmer effect to show that the job is being created and currently processing.

## Time Report

### Development Phases

1. **Project Initialization and Setup**
   - **Initial Backend Setup and Git Configuration:** 1 hour
   - **Frontend Setup and Tailwind CSS Integration:** 0.5 hours

2. **Backend Development**
   - **Preparing the Approach and Design:** 2 hours
   - **Express Setup and Basic Routes:** 2 hours
   - **Job Processing Logic:** 2 hours 
   - **Socket.IO Integration:** 2 hours
   - **Experimenting with Clustering, Worker Threads, Kafka:** 3 hours

3. **Frontend Development**
   - **Preparing the Approach and Design:** 1 hour
   - **Job List UI:** 1 hour
   - **Socket.IO Integration for Real-time Updates:** 1.5 hours

4. **Documentation and Final Touches**
   - **Writing README and Setup Instructions:** 2 hours
   - **Final Testing and Cleanup:** 0.5 hours

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

   The server will be running on `http://localhost:3001`.

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

   The frontend will be running on `http://localhost:3000`.

## Technologies Used

- **Backend:** Node.js (v20), Express, Socket.IO
- **Frontend:** React (18), Tailwind CSS
- **Database:** File-based (JSON file)