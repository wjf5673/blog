import { motion } from "motion/react";
import { Trophy, Target, Gamepad2, Star, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export function FunZone() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [targetCode, setTargetCode] = useState("");
  const [achievements, setAchievements] = useState({
    beginner: false,
    intermediate: false,
    expert: false,
  });

  const codeSnippets = [
    "const hello = 'world';",
    "function add(a, b) { return a + b; }",
    "import React from 'react';",
    "export default App;",
    "console.log('Hello');",
    "useState(0);",
    "useEffect(() => {});",
    "npm install react",
  ];

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
  }, [timeLeft, isPlaying]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setCurrentCode("");
    nextSnippet();
  };

  const nextSnippet = () => {
    const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    setTargetCode(randomSnippet);
    setCurrentCode("");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentCode(value);

    if (value === targetCode) {
      setScore(score + 10);
      nextSnippet();
      
      // Check achievements
      if (score + 10 >= 50 && !achievements.beginner) {
        setAchievements({ ...achievements, beginner: true });
      }
      if (score + 10 >= 100 && !achievements.intermediate) {
        setAchievements({ ...achievements, intermediate: true });
      }
      if (score + 10 >= 200 && !achievements.expert) {
        setAchievements({ ...achievements, expert: true });
      }
    }
  };

  const endGame = () => {
    setIsPlaying(false);
  };

  return (
    <section id="fun-zone" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-30" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gamepad2 className="w-8 h-8 text-purple-600" />
            <h2 className="text-4xl">趣味挑战</h2>
          </div>
          <p className="text-xl text-gray-600">
            测试你的代码打字速度，挑战自我！
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Game Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 h-full"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full">
              {/* Game Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm opacity-80 mb-1">得分</div>
                    <motion.div
                      key={score}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      className="text-3xl"
                    >
                      {score}
                    </motion.div>
                  </div>
                  <div>
                    <div className="text-sm opacity-80 mb-1">剩余时间</div>
                    <motion.div
                      animate={{
                        scale: timeLeft <= 5 && isPlaying ? [1, 1.1, 1] : 1,
                        color: timeLeft <= 5 && isPlaying ? "#fca5a5" : "#ffffff",
                      }}
                      transition={{ duration: 0.5, repeat: timeLeft <= 5 && isPlaying ? Infinity : 0 }}
                      className="text-3xl"
                    >
                      {timeLeft}s
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Game Content */}
              <div className="p-8">
                {!isPlaying && timeLeft === 30 ? (
                  <div className="text-center py-12">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Target className="w-24 h-24 mx-auto text-purple-600 mb-6" />
                    </motion.div>
                    <h3 className="text-2xl mb-4">代码打字挑战</h3>
                    <p className="text-gray-600 mb-8">
                      在 30 秒内尽可能多地输入正确的代码片段
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-lg hover:shadow-xl transition-shadow"
                    >
                      开始挑战
                    </motion.button>
                  </div>
                ) : !isPlaying && timeLeft === 0 ? (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                    >
                      <Trophy className="w-24 h-24 mx-auto text-yellow-500 mb-6" />
                    </motion.div>
                    <h3 className="text-2xl mb-2">挑战结束！</h3>
                    <p className="text-4xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {score} 分
                    </p>
                    <p className="text-gray-600 mb-8">
                      {score >= 200
                        ? "🎉 太厉害了！你是真正的代码高手！"
                        : score >= 100
                        ? "👍 做得很好！继续保持！"
                        : "💪 不错的开始，再试一次吧！"}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-lg hover:shadow-xl transition-shadow"
                    >
                      再玩一次
                    </motion.button>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <label className="block text-sm text-gray-600 mb-2">
                        请输入以下代码：
                      </label>
                      <motion.div
                        key={targetCode}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-gray-900 text-green-400 rounded-xl text-lg font-mono mb-4"
                      >
                        {targetCode}
                      </motion.div>
                    </div>

                    <input
                      type="text"
                      value={currentCode}
                      onChange={handleInput}
                      autoFocus
                      className="w-full px-4 py-4 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-lg font-mono"
                      placeholder="在这里输入..."
                    />

                    <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(currentCode.length / targetCode.length) * 100}%`,
                        }}
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 h-full flex flex-col">
              <h3 className="text-xl mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                成就系统
              </h3>

              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    achievements.beginner
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200 opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achievements.beginner ? "bg-yellow-400" : "bg-gray-300"
                      }`}
                    >
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">初出茅庐</div>
                      <div className="text-sm text-gray-600">得分达到 50</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    achievements.intermediate
                      ? "border-purple-400 bg-purple-50"
                      : "border-gray-200 opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achievements.intermediate ? "bg-purple-400" : "bg-gray-300"
                      }`}
                    >
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">小有成就</div>
                      <div className="text-sm text-gray-600">得分达到 100</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    achievements.expert
                      ? "border-pink-400 bg-pink-50"
                      : "border-gray-200 opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achievements.expert ? "bg-pink-400" : "bg-gray-300"
                      }`}
                    >
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">代码大师</div>
                      <div className="text-sm text-gray-600">得分达到 200</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-indigo-50 rounded-xl">
                <div className="text-sm mb-2">💡 小贴士</div>
                <p className="text-sm text-gray-600">
                  每输入正确一个代码片段得 10 分。专注和准确性是关键！
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
