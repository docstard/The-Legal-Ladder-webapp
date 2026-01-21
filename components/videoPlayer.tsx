"use client";
import { useEffect, useRef } from "react";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

//   useEffect(() => {
//     const video = videoRef.current;

//     if (video) {
//       // Prevent pausing on click/touch
//       const keepPlaying = (e : any) => {
//         e.preventDefault();
//         video.play();
//       };

//       video.addEventListener("click", keepPlaying);
//       video.addEventListener("touchstart", keepPlaying);

//       // If video somehow pauses, force play
//       const enforcePlay = () => {
//         if (video.paused) video.play();
//       };
//       video.addEventListener("pause", enforcePlay);

//       return () => {
//         video.removeEventListener("click", keepPlaying);
//         video.removeEventListener("touchstart", keepPlaying);
//         video.removeEventListener("pause", enforcePlay);
//       };
//     }
//   }, []);

  return (
    <div className="h-screen overflow-hidden bg-white rounded-t-2xl">
      <video
        ref={videoRef}
        src="/video.mp4"  // Replace with your video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controls={false}
        className="w-full h-full object-cover pointer-events-none"
      />
    </div>
  );
}

export default VideoPlayer;