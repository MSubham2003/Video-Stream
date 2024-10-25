import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VideoUpload from './Components/VideoUpload'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0);
  const [videoId, setVideoId] = useState("23264ffd-744e-4066-937b-21d9c64d9a7c");

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center space-y-5 justify-center py-9">
        <h1 className="font-bold text-3xl text-gray-800 dark:text-gray-50">Video Streaming App</h1>
        <div>
          <h1 className="text-white">Playing Video</h1>
          {/* <video src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`} controls></video> */}
          <video
            id="my-video"
            class="video-js"
            controls
            preload="auto"
            width="640"
            height="264"
            poster="MY_VIDEO_POSTER.jpg"
            data-setup="{}"
          >
            <source src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`} type="video/mp4" />
            <p class="vjs-no-js">
              To view this video please enable JavaScript, and consider upgrading to a
              web browser that
              <a href="https://videojs.com/html5-video-support/" target="_blank"
              >supports HTML5 video</a
              >
            </p>
          </video>
        </div>
        <VideoUpload />
      </div>
    </>
  )
}

export default App
