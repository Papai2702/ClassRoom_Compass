import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const rand = (minMs, maxMs) => Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;

const VideoArea = ({ timeLeft, isCapturing, onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);

  // one self-rescheduling timeout id
  const loopTimeoutRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (isCapturing) {
      openCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera(); // cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCapturing]);

  const openCamera = async () => {
    try {
      // request front camera, no audio prompts
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      streamRef.current = stream;
      if (!videoRef.current) return;

      videoRef.current.srcObject = stream;

      // wait for dimensions; only then start the random loop
      const onReady = async () => {
        try {
          await videoRef.current.play();
        } catch (_) {}
        setCameraActive(true);
        startRandomCaptureLoop(); // begin random captures only once video has dimensions
      };

      if (videoRef.current.readyState >= 2 && videoRef.current.videoWidth > 0) {
        onReady();
      } else {
        videoRef.current.onloadedmetadata = onReady;
        videoRef.current.oncanplay = onReady;
      }
    } catch (error) {
      console.error('Camera access denied or not available:', error);
    }
  };

  const startRandomCaptureLoop = () => {
    clearLoop();

    const tick = () => {
      // if video not ready yet, retry soon
      const v = videoRef.current;
      if (!v || v.readyState < 2 || v.videoWidth === 0 || v.videoHeight === 0) {
        loopTimeoutRef.current = setTimeout(tick, 250);
        return;
      }

      takeSnapshot();

      // schedule next random capture (2s–7s)
      loopTimeoutRef.current = setTimeout(tick, rand(2000, 7000));
    };

    // first shot after a small random delay once
    loopTimeoutRef.current = setTimeout(tick, rand(500, 1500));
  };

  const clearLoop = () => {
    if (loopTimeoutRef.current) {
      clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }
  };

  const takeSnapshot = () => {
    const v = videoRef.current;
    const c = canvasRef.current;
    if (!v || !c) return;
    if (v.videoWidth === 0 || v.videoHeight === 0) return; // guard

    // match canvas to current video dimensions
    c.width = v.videoWidth;
    c.height = v.videoHeight;

    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(v, 0, 0, c.width, c.height);

    const imageUrl = c.toDataURL('image/png');

    // send the snapshot up to the parent (let parent store & forward to CapturedImagesRow)
    if (typeof onCapture === 'function') {
      onCapture(imageUrl);
    }
  };

  const stopCamera = () => {
    clearLoop();

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg overflow-hidden flex flex-col relative"
    >
      <AnimatePresence mode="wait">
        {!isCapturing ? (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center p-8"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl font-bold text-yellow-400 mb-4"
            >
              {formatTime(timeLeft)}
            </motion.div>
            <p className="text-xl text-white/80">Image Capturing in</p>
          </motion.div>
        ) : (
          <motion.div
            key="camera-feed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
            {cameraActive && (
              <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full text-sm">
                <span className="text-green-400">●</span> Capturing Randomly...
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoArea;
