import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';

const ActivityChart = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
    className="w-full max-w-full rounded-[28px] p-[1px] bg-gradient-to-br from-black/25 to-black/5"
  >
    {/* Frosted glass body */}
    <div className="relative w-full rounded-[26px] p-4 sm:p-6 md:p-6 backdrop-blur-xs bg-white/8 ring-1 ring-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
      {/* Top sheen overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-[26px] opacity-50
                      before:content-[''] before:absolute before:-inset-px before:rounded-[28px]
                      before:bg-gradient-to-br before:from-white/25 before:to-transparent
                      [mask-image:radial-gradient(200%_140%_at_0%_0%,black,transparent)]" />

      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Activity Trends</h3>

      <div className="w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: '#fff',
                  boxWidth: 12,
                  boxHeight: 12,
                  padding: 10,
                },
              },
              tooltip: {
                backgroundColor: 'rgba(0,0,0,0.6)',
                titleColor: '#fff',
                bodyColor: '#fff',
              },
            },
            scales: {
              x: {
                grid: { color: 'rgba(255,255,255,0.08)' },
                ticks: { color: '#fff', font: { size: 12 } },
              },
              y: {
                grid: { color: 'rgba(255,255,255,0.08)' },
                ticks: { color: '#fff', font: { size: 12 } },
              },
            },
          }}
        />
      </div>
    </div>
  </motion.div>
);

export default ActivityChart;
