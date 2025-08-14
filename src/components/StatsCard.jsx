import { motion } from "framer-motion";

const StatsCards = ({ stats = [] }) => { // Added a default empty array to the stats prop
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 z-1">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="relative"
        >
          {/* Outer gradient edge (the glossy rim) */}
          <div className="relative rounded-[28px] p-[1px] bg-gradient-to-br from-black/35 to-black/10">
            {/* Frosted glass body */}
            <div className="relative rounded-[26px] p-6 backdrop-blur-xs bg-white/6 ring-1 ring-white/15 text-white shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
              {/* Top-left sheen */}
              <div className="pointer-events-none absolute inset-0 rounded-[26px] opacity-60
                                   before:content-[''] before:absolute before:-inset-px before:rounded-[28px]
                                   before:bg-gradient-to-br before:from-white/35 before:to-transparent
                                   [mask-image:radial-gradient(200%_140%_at_0%_0%,black,transparent)]" />

              <div className="flex justify-between relative">
                <div>
                  <p className="text-sm text-gray-300">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                  <p
                    className={`text-sm mt-2 ${
                      stat.change.startsWith("+") ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>

                {/* Frosted icon puck */}
                <div className="h-12 w-12 rounded-full bg-white/12 backdrop-blur-md border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_18px_rgba(0,0,0,0.45)] flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>

              {/* Subtle bottom glow */}
              <div className="pointer-events-none absolute -bottom-4 left-8 right-8 h-8 rounded-full blur-2xl opacity-30 bg-white/10" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
