import { useLocation, useNavigate } from "react-router-dom"
import VideoPlayer from "./VideoPlayer";
import { useRef } from "react";
import videojs from "video.js";

export const LessonVideo=()=>{
    const location=useLocation();
    const navigate=useNavigate();
    const lessonName=location.state.lessonName;
    const lessonVideoUrl=location.state.videoUrl;
    const playerRef = useRef(null)
    // const videoLink = "http://localhost:8000/uploads/courses/120b2910-6be2-41ae-9f00-b987d87417f1/index.m3u8"
  
    const videoPlayerOptions = {
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: lessonVideoUrl,
          type: "application/x-mpegURL"
        // type: "video/mp4"
        }
      ]
    }
    const handlePlayerReady = (player:any) => {
      playerRef.current = player;
  
      // You can handle player events here, for example:
      player.on("waiting", () => {
        videojs.log("player is waiting");
      });
  
      player.on("dispose", () => {
        videojs.log("player will dispose");
      });
    };
    return (
      <div className="bg-gray-800 flex-1">
        <div className="md:mx-30 mx-2 sm:mx-8 my-8">
        <div className="flex justify-between items-center  mb-8">
          <h1 className="font-bold text-4xl">{lessonName}</h1>
          <button onClick={()=>{navigate(-1)}} className="bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 px-8 rounded-lg cursor-pointer">Back</button>
        </div>
        <VideoPlayer
        options={videoPlayerOptions}
        onReady={handlePlayerReady}
        />
      </div>
      </div>
    )
}