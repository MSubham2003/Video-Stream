import { useState } from "react";
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

  function playVideo(videoId) {
    setVideoId(videoId);
  }
  return (
    <>
      <Toaster />
      <div className="flex flex-col  items-center space-y-9 justify-center py-9">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-100">
          Video Streaming App
        </h1>

        <div className="flex mt-14 w-full space-x-2  justify-between">
          <div className="w-full">
            <h1 className="text-white text-center mt-2">Playing Video</h1>

            {/* <video
              style={{
                width: "100%",
              }}
              // src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`}
              src="http://localhost:8080/api/v1/videos/f6e21144-c462-459b-af96-1cde95621710/master.m3u8"
              controls
            ></video> */}

            <div>
              <VideoPlayer
                src={`http://localhost:8080/api/v1/videos/${videoId}/master.m3u8`}
              ></VideoPlayer>
            </div>

            {/* <video
              id="my-video"
              class="video-js"
              controls
              preload="auto"
              width="640"
              height="264"
              data-setup="{}"
            >
              <source
                src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`}
                type="video/mp4"
              />

              <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider
                upgrading to a web browser that
                <a
                  href="https://videojs.com/html5-video-support/"
                  target="_blank"
                >
                  supports HTML5 video
                </a>
              </p>
            </video>  */}
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
          />
          <Button
            onClick={() => {
              setVideoId(fieldValue);
            }}
          >
            Play
          </Button>
        </div>

        <h2 className=" text-white text-3xl underline">Videos present in DB</h2>

        <VideoTable />
      </div>
    </>
  );
}

export default App;