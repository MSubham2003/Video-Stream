import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import toast from "react-hot-toast";

function VideoTable() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/videos")
      .then((response) => setVideos(response.data))
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  const copyToClipboard = (videoId) => {
    navigator.clipboard.writeText(videoId);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="overflow-x-auto w-full my-6">
      <table className="min-w-full border border-gray-500 rounded-lg shadow-md bg-slate-950 text-yellow-50">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Video ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id} className="text-center">
              <td className="py-2 px-4 border-b flex items-center justify-center">
                {video.videoId}
                <Button
                  size="xs"
                  className="ml-2"
                  onClick={() => copyToClipboard(video.videoId)}
                >
                  Copy
                </Button>
              </td>
              <td className="py-2 px-4 border-b">{video.title}</td>
              <td className="py-2 px-4 border-b">{video.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VideoTable;
