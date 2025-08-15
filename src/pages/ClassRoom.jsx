import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "../components/Classroom/TopBar";
import VideoArea from "../components/Classroom/VideoArea";
import Sidebar from "../components/Classroom/Sidebar";
import CapturedImagesRow from "../components/Classroom/CapturedImagesRow";

const ClassRoomCompass = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isCapturing, setIsCapturing] = useState(false);
  const [classDuration, setClassDuration] = useState(0);
  const [focusedPercentage, setFocusedPercentage] = useState(75);
  const [studentDoubts, setStudentDoubts] = useState([
    "How does this formula work?",
    "Can you explain the last point again?",
    "What's the difference between these two concepts?",
    "I didn't understand the example",
    "Is this going to be on the test?",
  ]);
  const [capturedImages, setCapturedImages] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const audioContextRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // Countdown timer
    if (!isCapturing) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCapturing(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCapturing]);

  // Class duration, clock, and attention
  useEffect(() => {
    const classTimer = setInterval(
      () => setClassDuration((prev) => prev + 1),
      1000
    );
    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);
    const attentionTimer = setInterval(() => {
      setFocusedPercentage((prev) => {
        const change = Math.floor(Math.random() * 10) - 3;
        return Math.min(100, Math.max(20, prev + change));
      });
    }, 8000);

    setupAudioVisualization();

    return () => {
      clearInterval(classTimer);
      clearInterval(clockTimer);
      clearInterval(attentionTimer);
      cancelAnimationFrame(animationRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const setupAudioVisualization = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      const dataArray = new Uint8Array(32);
      for (let i = 0; i < dataArray.length; i++) {
        dataArray[i] = Math.floor(Math.random() * 100) + 50;
      }
    };
    draw();
  };

  const handleNewImage = (imageUrl) => {
    setCapturedImages((prev) => [imageUrl, ...prev].slice(0, 10));
  };

  const handleEndClass = () => {
    alert("Class session ended");
  };

  return (
    <div className="min-h-screen bg-[url('https://i.pinimg.com/736x/8c/4b/29/8c4b29a40b142e7ad2094f18582714a5.jpg')] bg-cover bg-no-repeat text-white p-4 overflow-auto ">
      <TopBar currentTime={currentTime} onEndClass={handleEndClass} />

      <div className="flex flex-col lg:flex-row gap-4 mt-4 h-[calc(100vh-150px)]">
        {/* Sidebar */}
        <div className="w-full lg:w-[320px] flex-shrink-0">
          <Sidebar
            classDuration={classDuration}
            focusedPercentage={focusedPercentage}
            studentDoubts={studentDoubts}
          />
        </div>
        {/* Video Area - Fixed dimensions */}
        <div className="flex-1 max-w-3xl mx-auto flex flex-col p-5 justify-center items-center bg-black rounded-lg shadow-lg">
          <VideoArea
            timeLeft={timeLeft}
            isCapturing={isCapturing}
            onCapture={handleNewImage}
            className="w-full h-full max-h-[500px] aspect-video rounded-lg"
          />
          <CapturedImagesRow images={capturedImages} />
        </div>
      </div>
    </div>
  );
};

export default ClassRoomCompass;
