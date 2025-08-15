import { motion } from 'framer-motion';
import { Mic, AlertCircle } from 'lucide-react';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const Sidebar = ({ classDuration, focusedPercentage, studentDoubts }) => {
  const distractedPercentage = 100 - focusedPercentage;
  const waveformData = Array.from({ length: 30 }, () => Math.random() * 40 + 10);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full lg:w-80 bg-black/10 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg p-4 
                 flex flex-col gap-6
                 max-h-[80vh] lg:max-h-[calc(100vh-32px)] overflow-y-auto"
    >
      {/* Class Duration */}
      <div className="bg-black/5 rounded-xl p-4">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <Mic size={16} /> Class Duration
        </h3>
        <div className="text-2xl font-bold mb-3">{formatTime(classDuration)}</div>
        <div className="flex items-end h-12 gap-1">
          {waveformData.map((height, index) => (
            <motion.div
              key={index}
              animate={{ height: [height, height * 0.7, height] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.02 }}
              className="bg-blue-400/80 w-1.5 rounded-t-sm"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {/* Attention Analysis */}
      <div className="bg-white/10 rounded-xl p-4">
        <h3 className="font-medium mb-3">Attention Analysis</h3>
        <div className="flex justify-between text-sm mb-1 font-bold">
          <span className="text-green-900">Focused: {focusedPercentage}%</span>
          <span className="text-red-400">Distracted: {distractedPercentage}%</span>
        </div>
        <div className="h-3 bg-black/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${focusedPercentage}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
          />
        </div>
      </div>

      {/* Student Doubts */}
      <div className="bg-white/5 rounded-xl p-4 flex-1 min-h-[150px] overflow-y-auto">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <AlertCircle size={16} /> Student Doubts
        </h3>
        <div className="flex flex-col gap-2">
          {studentDoubts.map((doubt, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/5 p-3 rounded-lg text-sm"
            >
              {doubt}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
