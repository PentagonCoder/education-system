import { motion } from "framer-motion";

function TypingIndicator() {
  return (
    <div className="flex gap-4 mb-8">

      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
        AI
      </div>

      <div className="bg-white shadow rounded-2xl px-6 py-4 flex gap-2">

        {[0,1,2].map((i)=>(
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-gray-500"
            animate={{
              y:[0,-6,0]
            }}
            transition={{
              duration:0.6,
              repeat:Infinity,
              delay:i*0.15
            }}
          />
        ))}

      </div>

    </div>
  );
}

export default TypingIndicator;