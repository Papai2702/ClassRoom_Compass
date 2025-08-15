import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "../components/Classroom/TopBar";
import VideoArea from "../components/Classroom/VideoArea";
import Sidebar from "../components/Classroom/Sidebar";
import CapturedImagesRow from "../components/Classroom/CapturedImagesRow";
import { Link } from "react-router-dom";
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
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [classEnded, setClassEnded] = useState(false);

  const audioContextRef = useRef(null);
  const animationRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);

  // Start audio recording immediately when component mounts
  useEffect(() => {
    startAudioRecording();
    
    return () => {
      stopAudioRecording();
    };
  }, []);

  useEffect(() => {
    // Countdown timer only for image capturing
    if (!isCapturing && !classEnded) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCapturing(true); // This now only affects image capturing
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCapturing, classEnded]);

  // Class duration, clock, and attention
  useEffect(() => {
    if (classEnded) return;

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
  }, [classEnded]);

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

  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      setAudioChunks(chunks);
      
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Collect data every second
      mediaRecorder.start(1000);
      
    } catch (error) {
      console.error("Error starting audio recording:", error);
      // Handle error (e.g., show message to user)
    }
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const handleNewImage = (imageUrl) => {
    if (!classEnded) {
      setCapturedImages((prev) => [imageUrl, ...prev].slice(0, 10));
    }
  };

  const handleEndClass = () => {
    setIsCapturing(false); // Stop image capturing
    stopAudioRecording(); // Stop audio recording
    setClassEnded(true); // Set class as ended
  };

  return (
    <div className="min-h-screen bg-[url('https://i.pinimg.com/736x/8c/4b/29/8c4b29a40b142e7ad2094f18582714a5.jpg')] bg-cover bg-no-repeat text-white p-4 overflow-auto">
      
      <TopBar currentTime={currentTime} onEndClass={handleEndClass} />

      <div className="flex flex-col lg:flex-row gap-4 mt-4 h-[calc(100vh-150px)]">
        {/* Sidebar */}
        <div className="w-full lg:w-[320px] flex-shrink-0">
          <Sidebar
            classDuration={classDuration}
            focusedPercentage={focusedPercentage}
            studentDoubts={studentDoubts}
            isRecording={isRecording}
            audioUrl={audioUrl}
            classEnded={classEnded}
          />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 max-w-3xl mx-auto flex flex-col p-5 justify-center items-center bg-black rounded-lg shadow-lg">
          {classEnded ? (
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 bg-white/10 rounded-lg"
              >
                <h2 className="text-xl font-bold mb-4">Class Recording</h2>
                {audioUrl && (
                  <div className="mb-4">
                    <p className="text-sm mb-2">Duration: {Math.floor(classDuration/60)}m {classDuration%60}s</p>
                    <audio controls src={audioUrl} className="w-full" />
                  </div>
                )}
                <h3 className="text-lg font-semibold mb-2">Captured Moments</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {capturedImages.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="overflow-hidden rounded-lg"
                    >
                      <img 
                        src={img} 
                        alt={`Captured moment ${index}`}
                        className="w-full h-24 object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            <>
              <VideoArea
                timeLeft={timeLeft}
                isCapturing={isCapturing}
                onCapture={handleNewImage}
                className="w-full h-full max-h-[500px] aspect-video rounded-lg"
              />
              <CapturedImagesRow images={capturedImages} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassRoomCompass;