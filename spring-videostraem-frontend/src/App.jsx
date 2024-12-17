import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import VideoUpload from "./Components/VideoUpload";
import { Toaster } from "react-hot-toast";
import VideoPlayer from "./Components/VideoPlayer";
import { Button, TextInput } from "flowbite-react";
import VideoTable from "./Components/VideoTable";

function App() {
  const [count, setCount] = useState(0);
  const [fieldValue, setFieldValue] = useState(null);
  const [videoId, setVideoId] = useState(
    "49abab9e-b06b-4c5b-a760-bad24dbd165a"
  );
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Toggle Dark Mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Effect to apply the dark theme
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  function playVideo(videoId) {
    setVideoId(videoId);
  }

  return (
    <>
      <Toaster />
      <div
        className={`flex flex-col items-center space-y-9 justify-center py-9 ${
          isDarkMode ? "bg-slate-950" : "bg-sky-500"
        }`}
      >
        {/* Theme toggle button */}
        <Button
          size="sm"
          onClick={toggleTheme}
          className={`absolute top-4 right-4 ${
            isDarkMode ? "bg-sky-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>

        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? "text-gray-100" : "text-gray-950"
          }`}
        >
          Video Streaming App
        </h1>

        <div className="flex mt-14 w-full space-x-2 justify-between">
          <div className="w-full">
            <h1
              className={`text-center mt-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Playing Video
            </h1>

            <div>
              <VideoPlayer
                src={`http://localhost:8080/api/v1/videos/${videoId}/master.m3u8`}
              ></VideoPlayer>
            </div>
          </div>

          <div className="w-full">
            <VideoUpload />
          </div>
        </div>

        <div className="my-4 flex space-x-4">
          <TextInput
            onChange={(event) => setFieldValue(event.target.value)} // Change onClick to onChange
            placeholder="Enter video id here"
            name="video_id_field"
            className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
          />
          <Button
            onClick={() => {
              setVideoId(fieldValue);
            }}
            className={`${
              isDarkMode ? "bg-sky-950 text-white" : "bg-blue-200 text-black"
            }`}
          >
            Play
          </Button>
        </div>

        <h2
          className={`text-3xl underline ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Videos present in DB
        </h2>

        <VideoTable />
      </div>
    </>
  );
}

export default App;
