import { motion } from "framer-motion";
import { Clock, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/C-R-CLogo.jpg";

const TopBar = ({ currentTime, onEndClass }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row justify-between items-center p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg"
    >
      <div className="mb-2 md:mb-0 gap-3.5 flex ">
        <Link to="/dashboard">
        <img src={Logo} alt="" className="h-12 rounded-full cursor-pointer" />
        </Link>
        <div className="flex flex-col gap-1 justify-center items-center">
          <h1 className="text-xl font-bold">ClassRoomCompass</h1>
          <p className="text-sm text-white/70 ">Live Class Monitoring</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Clock size={18} />
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
        <Link to="/report_class">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEndClass}
            className="flex items-center gap-2 bg-red-500/90 hover:bg-red-500 px-4 py-2 rounded-full text-sm font-medium shadow-md"
          >
            <XCircle size={18} />
            End Class
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default TopBar;
