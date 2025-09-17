import { motion } from 'framer-motion'
import { Heart, TrendingUp, Target, Activity, CheckCircle, Clock } from 'lucide-react'

const WellnessWidget = () => {
  const wellnessData = {
    overallScore: 85,
    weeklyGoal: 80,
    streak: 7,
    lastCheckIn: '2 hours ago'
  }

  const weeklyProgress = [
    { day: 'Mon', score: 75, completed: true },
    { day: 'Tue', score: 82, completed: true },
    { day: 'Wed', score: 78, completed: true },
    { day: 'Thu', score: 88, completed: true },
    { day: 'Fri', score: 85, completed: true },
    { day: 'Sat', score: 90, completed: true },
    { day: 'Sun', score: 85, completed: false }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return 'bg-green-100'
    if (score >= 70) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      <div className="text-center mb-6">
        <div className="text-4xl font-light text-gray-900 mb-2">
          {wellnessData.overallScore}%
        </div>
        <div className="text-sm text-gray-500">Wellness Score</div>
      </div>

      {/* Weekly Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-end h-12">
          {weeklyProgress.map((day, index) => (
            <div key={day.day} className="flex flex-col items-center flex-1">
              <div
                className={`w-full rounded-t transition-all duration-500 ${
                  day.completed ? 'bg-gray-900' : 'bg-gray-200'
                }`}
                style={{ height: `${(day.score / 100) * 32}px` }}
              />
              <div className="text-xs text-gray-500 mt-2">{day.day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div>
          <div className="text-lg font-light text-gray-900">{wellnessData.weeklyGoal}%</div>
          <div className="text-xs text-gray-500">Goal</div>
        </div>
        <div>
          <div className="text-lg font-light text-gray-900">{wellnessData.streak}</div>
          <div className="text-xs text-gray-500">Streak</div>
        </div>
        <div>
          <div className="text-lg font-light text-gray-900">{wellnessData.lastCheckIn}</div>
          <div className="text-xs text-gray-500">Last</div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">
        Check In Today
      </button>
    </motion.div>
  )
}

export default WellnessWidget
