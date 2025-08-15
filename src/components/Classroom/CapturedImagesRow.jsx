import { motion } from 'framer-motion';

const CapturedImagesRow = ({ images }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg p-3 w-fit min-w-[75%]"
    >
      <h3 className="font-medium mb-2 ml-1">Recent Captures</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images?.length > 0 ? (
          images.map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 relative"
            >
              <img
                src={img}
                alt={`Capture ${index}`}
                className="h-20 rounded-lg object-cover shadow-md"
              />
              <div className="absolute bottom-1 right-1 bg-black/50 text-xs px-1 rounded">
                {index === 0 ? 'Just now' : `${index}m ago`}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-white/50 italic py-6 text-center w-full">
            Images will appear here after capturing starts
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CapturedImagesRow;
