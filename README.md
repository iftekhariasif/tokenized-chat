## TOKENIZED CHAT APP

The Tokenized Chat App streamlines real-time messaging in a secure and scalable environment. Utilizing NestJS, React, WebSocket, and PostgreSQL, it simplifies user interaction by allowing chat room creation, message exchange, and tokenized nickname-based access without passwords.

### TABLE OF CONTENTS
- [Requirement Definitions](#requirement-definitions)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Development](#development)
    - [Setup](#setup)
    - [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Infrastructure](#infrastructure)
- [Database Schemas](#database-schemas)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


### Requirement Definitions

- **User Authentication**: Users can choose a unique nickname to serve as their identity within the app. No password is required.
- **Chat Rooms**: Users can create, join, and delete chat rooms. They can see a list of chat rooms and join any of their choices.
- **Messaging**: Within a chat room, users can send messages, see a list of all messages, and edit their last message provided no one else has sent a message since.
- **Real-Time Interaction**: The application utilizes WebSocket for real-time data transfer, enabling immediate receipt of messages and updates within chat rooms.
- **Data Persistence**: All user data, chat rooms, and messages are stored in a PostgreSQL database to ensure that information is retained and accessible across sessions.
- **Dockerized Application**: The entire application, including the backend (NestJS), frontend (React), and database (PostgreSQL), is containerized using Docker, facilitating easy setup and deployment.

## Getting Started

This section outlines the steps to get the Tokenized Chat App running on your local machine for development and testing purposes.

### Prerequisites

- Docker and Docker Compose
- Git
- Node.js (if you wish to run the application outside Docker for any reason)

### Installation

1. **Clone the Repository**: First, clone the repository to your local machine.

    ```bash
    git clone https://github.com/iftekhariasif/tokenized-chat.git
    cd tokenized-chat
    ```

### Setup and Running the Application

2. **Build Docker Services**: This command builds the Docker services, replacing old builds if necessary.

    ```bash
    make services.build
    ```

3. **Start Docker Services**: Once the build process is complete, you can start all services in detached mode.

    ```bash
    make services.up
    ```

4. **Seed the Database**: To populate the database with initial seed data, run the following command. This step is optional but recommended for testing purposes.

    ```bash
    make db.seed
    ```

5. **Access the Application**: The React frontend can be accessed at `http://localhost:3000`, and the NestJS backend API at `http://localhost:4000`.

6. **Stop Docker Services**: To stop all running services and clean up, use the command below.

    ```bash
    make services.down
    ```

7. **Clean the Database**: If you need to clean the database, removing all data and resetting IDs, use this command. Be cautious, as this will delete all existing data in the database.

    ```bash
    make db.clean
    ```

Follow these steps to set up and start using the Tokenized Chat App on your development machine.
