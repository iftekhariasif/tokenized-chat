## TOKENIZED CHAT APP

The Tokenized Chat App streamlines real-time messaging in a secure and scalable environment. Utilizing NestJS, React, WebSocket, and PostgreSQL, it simplifies user interaction by allowing chat room creation, message exchange, and tokenized nickname-based access without passwords.

### TABLE OF CONTENTS
- [Requirement Definitions](#requirement-definitions)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Database Schema](#database-schemas)
- [API Reference](#api-reference)
- [Deployment](#deployment)
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

## API Reference

Explore the API endpoints provided by the Tokenized Chat App, designed for seamless user authentication, chat room interactions, and messaging functionalities. Here's a step-by-step guide through the user journey:

### User Authentication

- **Login/Create User**: Start by logging in or creating a new user profile with a unique nickname.

    ```
    POST /auth/login
    Body: { "nickname": "SpiderMan" }
    ```

    Upon successful login, you'll receive an access token. Include this token in the Authorization header of subsequent requests needing authentication.

### Chat Rooms

- **Create a Chat Room**: Authenticated users can initiate new chat rooms.

    ```
    POST /chat-rooms
    Headers: Authorization: Bearer <YourAccessToken>
    Body: { "name": "Avengers HQ" }
    ```

- **List Chat Rooms**: Discover all the chat rooms available.

    ```
    GET /chat-rooms
    ```

- **Join a Chat Room**: Interact with any chat room by participating in discussions or viewing messages. (Note: Joining a chat room is conceptual; users interact by sending or receiving messages.)

- **Delete a Chat Room**: Creators can dissolve their chat rooms.

    ```
    DELETE /chat-rooms/:chatRoomId
    Headers: Authorization: Bearer <YourAccessToken>
    ```

### Messaging

- **Send a Message**: Contribute to the chat room's dialogue.

    ```
    POST /messages
    Headers: Authorization: Bearer <YourAccessToken>
    Body: { "chatRoomId": "1", "content": "Let's save the world!" }
    ```

- **Edit the Last Message**: Modify your most recent message, provided it remains the latest contribution.

    ```
    PATCH /messages/edit-last
    Headers: Authorization: Bearer <YourAccessToken>
    Body: { "chatRoomId": "1", "newContent": "Time to assemble the team!" }
    ```

- **List Messages in a Chat Room**: Retrieve the dialogue history of a specific chat room.

    ```
    GET /messages/:chatRoomId
    ```


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details. This means anyone is free to use, modify, distribute, and contribute back to the project under the same license.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repository and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Don't forget to give the project a star! Thanks again!

## Contact

For any inquiries or further information about the project, feel free to connect with us:

- **GitHub**: [https://github.com/iftekhariasif](https://github.com/iftekhariasif)
- **LinkedIn**: [https://www.linkedin.com/in/iftekhariasif/](https://www.linkedin.com/in/iftekhariasif/)
- **X**: [https://x.com/iftekhariasif](https://x.com/iftekhariasif)

