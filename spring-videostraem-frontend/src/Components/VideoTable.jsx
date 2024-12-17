import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import toast from "react-hot-toast";

function VideoTable() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const deleteVideo = (videoId, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      axios
        .delete(`http://localhost:8080/api/v1/videos/${videoId}`)
        .then(() => {
          toast.success(`Video titled "${title}" deleted successfully.`);
          setVideos((prevVideos) =>
            prevVideos.filter((video) => video.videoId !== videoId)
          ); // Update state to remove deleted video
        })
        .catch((error) => {
          console.error("Error deleting video:", error);
          toast.error("Failed to delete video.");
        });
    }
  };

  // Filter videos based on search term (ID, title, description)
  const filteredVideos = videos.filter(
    (video) =>
      video.videoId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto w-full my-6">
      {/* Search input */}
      <div className="my-4">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg w-full"
          placeholder="Search by ID, title, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="min-w-full border border-gray-500 rounded-lg shadow-md bg-slate-950 text-yellow-50">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Video ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Action</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
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
                <td className="py-2 px-4 border-b">
                  <Button
                    size="xs"
                    color="failure"
                    onClick={() => deleteVideo(video.videoId, video.title)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-2 px-4 border-b text-center">
                No videos found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VideoTable;
