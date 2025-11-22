import { motion } from "framer-motion";
import {
  Monitor,
  GraduationCap,
  Smartphone,
  Users,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection({ isDarkMode }) {
  const icons = [
    { Icon: Monitor, delay: 0.2, position: "top-20 left-[15%]" },
    { Icon: Smartphone, delay: 0.4, position: "top-20 right-[15%]" },

    { Icon: GraduationCap, delay: 0.3, position: "top-60 left-[10%]" },
    { Icon: Users, delay: 0.5, position: "top-60 left-[20%]" },
    { Icon: BookOpen, delay: 0.6, position: "top-60 right-[20%]" },
    { Icon: ClipboardCheck, delay: 0.7, position: "top-60 right-[10%]" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div
        className={`absolute inset-0 ${
          isDarkMode ? "bg-[#19202A]" : "bg-bluegradientR"
        }`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      </div>

      {/* Floating Icons */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {icons.map(({ Icon, delay, position }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay,
              duration: 0.5,
              type: "spring",
              stiffness: 100,
            }}
            className={`absolute ${position}`}
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/20"
            >
              <Icon className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="block text-5xl md:text-7xl">Learn Anything,</span>
            <span className="block text-5xl md:text-7xl">
              Anytime, Anywhere
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-blue-50 mb-12 max-w-3xl mx-auto"
          >
            Access high-quality courses from expert instructors and join a
            community of lifelong learners.
          </motion.p>

          <Link to={"/signup"}>
            <button className="bg-[#ffffff] rounded-full text-[#1674c9] px-8 py-4 font-bold hover:scale-105">
              Get Started
            </button>
          </Link>
        </motion.div>

        {/* Lower Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-64 h-64 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl"
            >
              <GraduationCap className="w-32 h-32 text-white" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-24 md:h-32"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,40 C300,100 900,0 1200,60 L1200,120 L0,120 Z"
            fill="white"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
        </svg>
      </div>
    </section>
  );
}
