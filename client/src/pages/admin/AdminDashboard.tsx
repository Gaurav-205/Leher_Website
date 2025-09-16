import { useState } from 'react'
import { Users, MessageCircle, Calendar, BookOpen, TrendingUp, AlertTriangle } from 'lucide-react'

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 1250,
    activeUsers: 890,
    totalSessions: 3450,
    crisisInterventions: 45,
    appointmentBookings: 1200,
    forumPosts: 560
  })

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'crisis',
      message: 'High-risk user detected in chatbot session',
      timestamp: '2 minutes ago',
      severity: 'high'
    },
    {
      id: 2,
      type: 'appointment',
      message: 'New appointment booked with Dr. Sharma',
      timestamp: '15 minutes ago',
      severity: 'low'
    },
    {
      id: 3,
      type: 'forum',
      message: 'New post in Anxiety Support forum',
      timestamp: '1 hour ago',
      severity: 'low'
    }
  ])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'crisis':
        return AlertTriangle
      case 'appointment':
        return Calendar
      case 'forum':
        return MessageCircle
      default:
        return TrendingUp
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'low':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-prata font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor platform activity and user engagement</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="card text-center">
          <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="card text-center">
          <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>
        <div className="card text-center">
          <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.totalSessions.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Chat Sessions</div>
        </div>
        <div className="card text-center">
          <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.crisisInterventions}</div>
          <div className="text-sm text-gray-600">Crisis Interventions</div>
        </div>
        <div className="card text-center">
          <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.appointmentBookings.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Appointments</div>
        </div>
        <div className="card text-center">
          <BookOpen className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.forumPosts}</div>
          <div className="text-sm text-gray-600">Forum Posts</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = getActivityIcon(activity.type)
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${getSeverityColor(activity.severity)}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full btn-primary">
              View Crisis Alerts
            </button>
            <button className="w-full btn-secondary">
              Manage Counselors
            </button>
            <button className="w-full btn-outline">
              Generate Reports
            </button>
            <button className="w-full btn-outline">
              System Settings
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Placeholder */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics Overview</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Analytics charts will be displayed here</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
