
# Video Streaming Application

A comprehensive video streaming application that allows users to upload, view, and manage video files. 
Built using Spring Boot for the backend, React.js for the frontend, and HLS for efficient video streaming.

---

## Features

1. **Video Play Section**: A player section where users can play videos by entering their unique video ID.
2. **Video Upload Section**: A form to upload new videos with a title and description.
3. **Play by Video ID**: A text input to enter a video ID and play that specific video.
4. **Show All Videos Section**: A table displaying all uploaded videos, showing their ID, title, and description.
   - Includes a "Copy Video ID" button to copy the video ID to the clipboard.
   - Provides feedback on successful copying with a "Copied to clipboard" message.

---

## Screenshots

### 1. Video Play and Upload Section
![Video Play and Upload Section](/images/ss1.png)

### 2. Show All Videos Section with Copy Video ID
![Show All Videos Section](/images/ss2.png)


---

## Setup and Installation

This repository contains two folders:
- **spring-videostream-backend**: The backend service developed using Spring Boot.
- **spring-videostream-frontend**: The frontend interface developed using React.js.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (for frontend setup)
- [Java 17+](https://jdk.java.net/) (for backend setup)
- [MySQL](https://www.mysql.com/) (for database)

### Backend Setup

1. **Navigate to Backend Directory**

   ```bash
   cd spring-videostream-backend
   ```

2. **Configure Database**

   Update the `application.properties` file in `src/main/resources` with your MySQL credentials:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/video_stream_db
   spring.datasource.username=YOUR_DB_USERNAME
   spring.datasource.password=YOUR_DB_PASSWORD
   ```

3. **Build and Run the Application**

   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

   The backend server will start at `http://localhost:8080`.

### Frontend Setup

1. **Navigate to Frontend Directory**

   ```bash
   cd spring-videostream-frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Frontend**

   ```bash
   npm run dev
   ```

   The frontend will be accessible at `http://localhost:3000`.

---

## Usage

1. **Uploading Videos**:
   - Use the "Upload Videos" form to select a video file and add metadata (title and description).
   - Submit the form to save the video.

2. **Playing Videos by ID**:
   - Enter a valid video ID in the provided text box and click "Play" to stream the selected video.

3. **Viewing All Videos**:
   - Navigate to the table section to see all videos in the database.
   - Use the "Copy" button next to any video ID to copy it, making it easy to paste into the player.

---

## Technologies Used

- **Backend**: Spring Boot, MySQL, HLS (HTTP Live Streaming)
- **Frontend**: React.js, Tailwind CSS
- **Others**: Flowbite, Axios, React Hot Toast

---

## Contributing

Feel free to open issues or submit pull requests for any improvements or bug fixes.

---

## License

This project is Made By Subham Mohanty.

---
