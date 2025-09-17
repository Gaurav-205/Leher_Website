// Mock data for resources and categories
export const mockResourceCategories = [
  {
    _id: '1',
    name: 'Anxiety',
    description: 'Resources to help manage anxiety and panic disorders',
    icon: 'anxiety',
    color: '#3B82F6',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Depression',
    description: 'Tools and techniques for managing depression',
    icon: 'depression',
    color: '#8B5CF6',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '3',
    name: 'Stress Management',
    description: 'Stress relief techniques and coping strategies',
    icon: 'stress',
    color: '#10B981',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '4',
    name: 'Relationships',
    description: 'Building healthy relationships and communication skills',
    icon: 'relationships',
    color: '#F59E0B',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '5',
    name: 'Self-Help',
    description: 'Personal development and self-improvement resources',
    icon: 'self-help',
    color: '#EF4444',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '6',
    name: 'Crisis Support',
    description: 'Emergency resources and crisis intervention tools',
    icon: 'crisis',
    color: '#DC2626',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '7',
    name: 'Sleep & Wellness',
    description: 'Sleep hygiene and overall wellness resources',
    icon: 'wellness',
    color: '#06B6D4',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '8',
    name: 'Academic Support',
    description: 'Study skills and academic stress management',
    icon: 'academic',
    color: '#84CC16',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export const mockResources = [
  // Anxiety Resources
  {
    _id: '1',
    title: '5-Minute Anxiety Relief Breathing Exercise',
    description: 'A quick and effective breathing technique to calm anxiety attacks and reduce stress in just 5 minutes.',
    content: 'This breathing exercise uses the 4-7-8 technique to activate your parasympathetic nervous system and quickly reduce anxiety symptoms.',
    type: 'video' as const,
    category: mockResourceCategories[0],
    language: 'English',
    difficulty: 'beginner' as const,
    duration: 5,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/videos/anxiety-breathing.mp4',
    tags: ['anxiety', 'breathing', 'quick-relief', 'calm'],
    isPublished: true,
    isFeatured: true,
    views: 2847,
    downloads: 156,
    likes: ['user1', 'user2', 'user3'],
    author: {
      _id: '1',
      firstName: 'Dr.',
      lastName: 'Sarah Chen',
      profile: {
        avatar: '/avatars/sarah-chen.jpg'
      }
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 127
  },
  {
    _id: '2',
    title: 'Progressive Muscle Relaxation Guide',
    description: 'Step-by-step video guide to progressive muscle relaxation technique for anxiety and stress relief.',
    content: 'Learn to systematically tense and relax different muscle groups to achieve deep relaxation and reduce physical tension.',
    type: 'video' as const,
    category: mockResourceCategories[0],
    language: 'Hindi',
    difficulty: 'intermediate' as const,
    duration: 15,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/videos/progressive-relaxation.mp4',
    tags: ['anxiety', 'relaxation', 'muscle-tension', 'stress'],
    isPublished: true,
    isFeatured: false,
    views: 1923,
    downloads: 89,
    likes: ['user4', 'user5'],
    author: {
      _id: '2',
      firstName: 'Dr.',
      lastName: 'Rajesh Kumar',
      profile: {
        avatar: '/avatars/rajesh-kumar.jpg'
      }
    },
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 78
  },
  {
    _id: '3',
    title: 'Anxiety Thought Challenge Worksheet',
    description: 'Interactive worksheet to identify and challenge negative thought patterns that contribute to anxiety.',
    content: 'Use cognitive behavioral therapy techniques to identify, challenge, and reframe anxious thoughts.',
    type: 'worksheet' as const,
    category: mockResourceCategories[0],
    language: 'English',
    difficulty: 'intermediate' as const,
    duration: 20,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/worksheets/anxiety-thought-challenge.pdf',
    tags: ['anxiety', 'cognitive-therapy', 'thought-challenging', 'cbt'],
    isPublished: true,
    isFeatured: true,
    views: 1654,
    downloads: 234,
    likes: ['user6', 'user7', 'user8'],
    author: {
      _id: '3',
      firstName: 'Dr.',
      lastName: 'Emily Rodriguez',
      profile: {
        avatar: '/avatars/emily-rodriguez.jpg'
      }
    },
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 92
  },

  // Depression Resources
  {
    _id: '4',
    title: 'Daily Mood Tracking Exercise',
    description: 'Simple daily exercise to track mood patterns and identify triggers for better depression management.',
    content: 'Track your daily mood, activities, and triggers to identify patterns and develop better coping strategies.',
    type: 'worksheet' as const,
    category: mockResourceCategories[1],
    language: 'English',
    difficulty: 'beginner' as const,
    duration: 10,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/worksheets/mood-tracking.pdf',
    tags: ['depression', 'mood-tracking', 'self-awareness', 'journaling'],
    isPublished: true,
    isFeatured: false,
    views: 2134,
    downloads: 187,
    likes: ['user9', 'user10'],
    author: {
      _id: '4',
      firstName: 'Dr.',
      lastName: 'Michael Thompson',
      profile: {
        avatar: '/avatars/michael-thompson.jpg'
      }
    },
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 156
  },
  {
    _id: '5',
    title: 'Gratitude Practice: 30-Day Challenge',
    description: 'Video series teaching gratitude practices proven to help combat depression and improve mental well-being.',
    content: 'Learn evidence-based gratitude exercises that can significantly improve mood and overall life satisfaction.',
    type: 'video' as const,
    category: mockResourceCategories[1],
    language: 'Hindi',
    difficulty: 'beginner' as const,
    duration: 25,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/videos/gratitude-challenge.mp4',
    tags: ['depression', 'gratitude', 'positive-thinking', 'wellness'],
    isPublished: true,
    isFeatured: true,
    views: 3456,
    downloads: 298,
    likes: ['user11', 'user12', 'user13', 'user14'],
    author: {
      _id: '5',
      firstName: 'Dr.',
      lastName: 'Priya Sharma',
      profile: {
        avatar: '/avatars/priya-sharma.jpg'
      }
    },
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 203
  },

  // Stress Management Resources
  {
    _id: '6',
    title: 'Quick Stress Relief: 3-Minute Meditation',
    description: 'Short meditation session designed for busy students to quickly reduce stress and regain focus.',
    content: 'A guided meditation using mindfulness techniques to quickly center yourself and reduce stress.',
    type: 'video' as const,
    category: mockResourceCategories[2],
    language: 'English',
    difficulty: 'beginner' as const,
    duration: 3,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/videos/quick-meditation.mp4',
    tags: ['stress', 'meditation', 'quick-relief', 'mindfulness'],
    isPublished: true,
    isFeatured: true,
    views: 4567,
    downloads: 345,
    likes: ['user15', 'user16', 'user17', 'user18', 'user19'],
    author: {
      _id: '6',
      firstName: 'Dr.',
      lastName: 'Lisa Wang',
      profile: {
        avatar: '/avatars/lisa-wang.jpg'
      }
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 287
  },
  {
    _id: '7',
    title: 'Exam Stress Management Toolkit',
    description: 'Comprehensive worksheet with strategies, breathing exercises, and study techniques to manage exam stress.',
    content: 'Complete toolkit including study schedules, stress reduction techniques, and exam day strategies.',
    type: 'worksheet' as const,
    category: mockResourceCategories[2],
    language: 'English',
    difficulty: 'intermediate' as const,
    duration: 30,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/worksheets/exam-stress-toolkit.pdf',
    tags: ['stress', 'exams', 'academic-pressure', 'study-skills'],
    isPublished: true,
    isFeatured: false,
    views: 2789,
    downloads: 456,
    likes: ['user20', 'user21', 'user22'],
    author: {
      _id: '7',
      firstName: 'Dr.',
      lastName: 'James Wilson',
      profile: {
        avatar: '/avatars/james-wilson.jpg'
      }
    },
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 198
  },

  // Relationships Resources
  {
    _id: '8',
    title: 'Healthy Communication Skills Workshop',
    description: 'Video workshop teaching essential communication skills for building and maintaining healthy relationships.',
    content: 'Learn active listening, assertiveness, conflict resolution, and emotional expression techniques.',
    type: 'video' as const,
    category: mockResourceCategories[3],
    language: 'Hindi',
    difficulty: 'intermediate' as const,
    duration: 35,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/videos/communication-workshop.mp4',
    tags: ['relationships', 'communication', 'social-skills', 'conflict-resolution'],
    isPublished: true,
    isFeatured: false,
    views: 1892,
    downloads: 123,
    likes: ['user23', 'user24'],
    author: {
      _id: '8',
      firstName: 'Dr.',
      lastName: 'Anita Desai',
      profile: {
        avatar: '/avatars/anita-desai.jpg'
      }
    },
    createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 134
  },
  {
    _id: '9',
    title: 'Boundary Setting Exercise',
    description: 'Interactive worksheet to help identify personal boundaries and practice setting healthy limits in relationships.',
    content: 'Identify your personal limits, practice saying no, and learn to communicate boundaries effectively.',
    type: 'worksheet' as const,
    category: mockResourceCategories[3],
    language: 'English',
    difficulty: 'intermediate' as const,
    duration: 25,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/worksheets/boundary-setting.pdf',
    tags: ['relationships', 'boundaries', 'self-care', 'assertiveness'],
    isPublished: true,
    isFeatured: true,
    views: 1567,
    downloads: 234,
    likes: ['user25', 'user26', 'user27'],
    author: {
      _id: '9',
      firstName: 'Dr.',
      lastName: 'Maria Garcia',
      profile: {
        avatar: '/avatars/maria-garcia.jpg'
      }
    },
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 89
  },

  // Self-Help Resources
  {
    _id: '10',
    title: 'Building Self-Esteem: Daily Affirmations',
    description: 'Video guide with daily affirmations and exercises to build confidence and improve self-esteem.',
    content: 'Learn to create and use positive affirmations effectively to build self-confidence and self-worth.',
    type: 'video' as const,
    category: mockResourceCategories[4],
    language: 'English',
    difficulty: 'beginner' as const,
    duration: 12,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/videos/self-esteem-affirmations.mp4',
    tags: ['self-esteem', 'confidence', 'affirmations', 'self-worth'],
    isPublished: true,
    isFeatured: true,
    views: 3245,
    downloads: 267,
    likes: ['user28', 'user29', 'user30'],
    author: {
      _id: '10',
      firstName: 'Dr.',
      lastName: 'David Kim',
      profile: {
        avatar: '/avatars/david-kim.jpg'
      }
    },
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 178
  },
  {
    _id: '11',
    title: 'Goal Setting and Achievement Planner',
    description: 'Comprehensive worksheet to set realistic goals, track progress, and celebrate achievements for personal growth.',
    content: 'SMART goal setting framework with progress tracking and milestone celebration techniques.',
    type: 'worksheet' as const,
    category: mockResourceCategories[4],
    language: 'Hindi',
    difficulty: 'intermediate' as const,
    duration: 40,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/worksheets/goal-setting-planner.pdf',
    tags: ['goal-setting', 'personal-growth', 'achievement', 'productivity'],
    isPublished: true,
    isFeatured: false,
    views: 2134,
    downloads: 189,
    likes: ['user31', 'user32'],
    author: {
      _id: '11',
      firstName: 'Dr.',
      lastName: 'Sunita Patel',
      profile: {
        avatar: '/avatars/sunita-patel.jpg'
      }
    },
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 145
  },

  // Crisis Support Resources
  {
    _id: '12',
    title: 'Crisis Safety Planning Worksheet',
    description: 'Essential worksheet for creating a personal safety plan during mental health crises with emergency contacts and coping strategies.',
    content: 'Create a comprehensive safety plan including warning signs, coping strategies, and emergency contacts.',
    type: 'worksheet' as const,
    category: mockResourceCategories[5],
    language: 'English',
    difficulty: 'beginner' as const,
    duration: 20,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/worksheets/crisis-safety-plan.pdf',
    tags: ['crisis', 'safety-planning', 'emergency', 'support'],
    isPublished: true,
    isFeatured: true,
    views: 1456,
    downloads: 345,
    likes: ['user33', 'user34', 'user35'],
    author: {
      _id: '12',
      firstName: 'Dr.',
      lastName: 'Robert Johnson',
      profile: {
        avatar: '/avatars/robert-johnson.jpg'
      }
    },
    createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 67
  },
  {
    _id: '13',
    title: 'Grounding Techniques for Panic Attacks',
    description: 'Video demonstration of 5-4-3-2-1 grounding technique and other methods to manage panic attacks and overwhelming emotions.',
    content: 'Learn multiple grounding techniques including sensory grounding, breathing exercises, and mindfulness practices.',
    type: 'video' as const,
    category: mockResourceCategories[5],
    language: 'Hindi',
    difficulty: 'beginner' as const,
    duration: 8,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/videos/grounding-techniques.mp4',
    tags: ['crisis', 'panic-attacks', 'grounding', 'mindfulness'],
    isPublished: true,
    isFeatured: true,
    views: 2789,
    downloads: 456,
    likes: ['user36', 'user37', 'user38', 'user39'],
    author: {
      _id: '13',
      firstName: 'Dr.',
      lastName: 'Kavita Singh',
      profile: {
        avatar: '/avatars/kavita-singh.jpg'
      }
    },
    createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 234
  },

  // Sleep & Wellness Resources
  {
    _id: '14',
    title: 'Sleep Hygiene: Better Sleep Guide',
    description: 'Comprehensive video guide with tips and techniques to improve sleep quality and establish healthy sleep routines.',
    content: 'Learn about sleep hygiene, bedtime routines, and environmental factors that affect sleep quality.',
    type: 'video' as const,
    category: mockResourceCategories[6],
    language: 'English',
    difficulty: 'beginner' as const,
    duration: 18,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/videos/sleep-hygiene-guide.mp4',
    tags: ['sleep', 'wellness', 'hygiene', 'routine'],
    isPublished: true,
    isFeatured: false,
    views: 3456,
    downloads: 278,
    likes: ['user40', 'user41', 'user42'],
    author: {
      _id: '14',
      firstName: 'Dr.',
      lastName: 'Jennifer Lee',
      profile: {
        avatar: '/avatars/jennifer-lee.jpg'
      }
    },
    createdAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 189
  },
  {
    _id: '15',
    title: 'Mindfulness Practice: Body Scan Exercise',
    description: 'Guided audio exercise for mindfulness and body awareness to reduce stress and improve mental clarity.',
    content: 'Progressive body scan meditation to increase body awareness and reduce physical tension.',
    type: 'audio' as const,
    category: mockResourceCategories[6],
    language: 'English',
    difficulty: 'intermediate' as const,
    duration: 22,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/audio/body-scan-meditation.mp3',
    tags: ['mindfulness', 'body-scan', 'meditation', 'awareness'],
    isPublished: true,
    isFeatured: true,
    views: 1892,
    downloads: 156,
    likes: ['user43', 'user44'],
    author: {
      _id: '15',
      firstName: 'Dr.',
      lastName: 'Thomas Brown',
      profile: {
        avatar: '/avatars/thomas-brown.jpg'
      }
    },
    createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 123
  },

  // Academic Support Resources
  {
    _id: '16',
    title: 'Study Stress Management Techniques',
    description: 'Video guide with practical techniques to manage academic stress and improve study efficiency.',
    content: 'Learn time management, study techniques, and stress reduction methods specifically for students.',
    type: 'video' as const,
    category: mockResourceCategories[7],
    language: 'Hindi',
    difficulty: 'beginner' as const,
    duration: 16,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/videos/study-stress-management.mp4',
    tags: ['academic', 'study-stress', 'time-management', 'efficiency'],
    isPublished: true,
    isFeatured: true,
    views: 2678,
    downloads: 198,
    likes: ['user45', 'user46', 'user47'],
    author: {
      _id: '16',
      firstName: 'Dr.',
      lastName: 'Amit Kumar',
      profile: {
        avatar: '/avatars/amit-kumar.jpg'
      }
    },
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 167
  },
  {
    _id: '17',
    title: 'Academic Performance Anxiety Workbook',
    description: 'Interactive workbook to address performance anxiety and build confidence in academic settings.',
    content: 'Cognitive behavioral techniques to manage test anxiety, presentation fears, and academic pressure.',
    type: 'worksheet' as const,
    category: mockResourceCategories[7],
    language: 'English',
    difficulty: 'intermediate' as const,
    duration: 35,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    fileUrl: '/worksheets/academic-anxiety-workbook.pdf',
    tags: ['academic', 'performance-anxiety', 'test-anxiety', 'confidence'],
    isPublished: true,
    isFeatured: false,
    views: 1923,
    downloads: 234,
    likes: ['user48', 'user49'],
    author: {
      _id: '17',
      firstName: 'Dr.',
      lastName: 'Rachel Green',
      profile: {
        avatar: '/avatars/rachel-green.jpg'
      }
    },
    createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 112
  },

  // Additional Video Resources
  {
    _id: '18',
    title: 'Mindfulness Meditation for Beginners',
    description: 'Complete beginner guide to mindfulness meditation with step-by-step instructions and breathing techniques.',
    content: 'Learn the fundamentals of mindfulness meditation, including proper posture, breathing, and focus techniques.',
    type: 'video' as const,
    category: mockResourceCategories[6],
    language: 'English',
    difficulty: 'beginner' as const,
    duration: 20,
    thumbnail: 'https://img.youtube.com/vi/ZToicYcHIOU/maxresdefault.jpg',
    fileUrl: '/videos/mindfulness-meditation.mp4',
    tags: ['mindfulness', 'meditation', 'beginner', 'breathing'],
    isPublished: true,
    isFeatured: true,
    views: 4567,
    downloads: 345,
    likes: ['user50', 'user51', 'user52', 'user53'],
    author: {
      _id: '18',
      firstName: 'Dr.',
      lastName: 'Emma Watson',
      profile: {
        avatar: '/avatars/emma-watson.jpg'
      }
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 298
  },
  {
    _id: '19',
    title: 'Yoga for Stress Relief',
    description: 'Gentle yoga session designed specifically for stress relief and mental relaxation.',
    content: 'A 15-minute yoga flow focusing on stress relief, including gentle stretches and relaxation poses.',
    type: 'video' as const,
    category: mockResourceCategories[2],
    language: 'Hindi',
    difficulty: 'beginner' as const,
    duration: 15,
    thumbnail: 'https://img.youtube.com/vi/v7AYKMP6rOE/maxresdefault.jpg',
    fileUrl: '/videos/yoga-stress-relief.mp4',
    tags: ['yoga', 'stress-relief', 'exercise', 'relaxation'],
    isPublished: true,
    isFeatured: false,
    views: 3245,
    downloads: 234,
    likes: ['user54', 'user55', 'user56'],
    author: {
      _id: '19',
      firstName: 'Dr.',
      lastName: 'Arjun Mehta',
      profile: {
        avatar: '/avatars/arjun-mehta.jpg'
      }
    },
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 189
  },
  {
    _id: '20',
    title: 'Cognitive Behavioral Therapy Basics',
    description: 'Introduction to CBT techniques for managing negative thoughts and improving mental health.',
    content: 'Learn the fundamental principles of CBT and how to apply them to everyday challenges.',
    type: 'video' as const,
    category: mockResourceCategories[1],
    language: 'English',
    difficulty: 'intermediate' as const,
    duration: 30,
    thumbnail: 'https://img.youtube.com/vi/g7XddaJXvJY/maxresdefault.jpg',
    fileUrl: '/videos/cbt-basics.mp4',
    tags: ['cbt', 'therapy', 'cognitive', 'behavioral'],
    isPublished: true,
    isFeatured: true,
    views: 2789,
    downloads: 456,
    likes: ['user57', 'user58', 'user59', 'user60'],
    author: {
      _id: '20',
      firstName: 'Dr.',
      lastName: 'Sophie Anderson',
      profile: {
        avatar: '/avatars/sophie-anderson.jpg'
      }
    },
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 234
  },
  {
    _id: '21',
    title: 'Building Resilience: Mental Toughness Training',
    description: 'Video series on developing mental resilience and emotional strength to handle life challenges.',
    content: 'Learn strategies to build mental toughness, emotional resilience, and adaptive coping skills.',
    type: 'video' as const,
    category: mockResourceCategories[4],
    language: 'English',
    difficulty: 'intermediate' as const,
    duration: 25,
    thumbnail: 'https://img.youtube.com/vi/H14bBuluwB8/maxresdefault.jpg',
    fileUrl: '/videos/resilience-training.mp4',
    tags: ['resilience', 'mental-toughness', 'coping', 'strength'],
    isPublished: true,
    isFeatured: true,
    views: 1892,
    downloads: 156,
    likes: ['user61', 'user62', 'user63'],
    author: {
      _id: '21',
      firstName: 'Dr.',
      lastName: 'Marcus Johnson',
      profile: {
        avatar: '/avatars/marcus-johnson.jpg'
      }
    },
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 167
  },
  {
    _id: '22',
    title: 'Social Anxiety: Overcoming Fear of Social Situations',
    description: 'Comprehensive guide to understanding and managing social anxiety with practical exercises.',
    content: 'Learn about social anxiety, its causes, and evidence-based techniques to overcome social fears.',
    type: 'video' as const,
    category: mockResourceCategories[0],
    language: 'Hindi',
    difficulty: 'intermediate' as const,
    duration: 28,
    thumbnail: 'https://img.youtube.com/vi/78I9dTB9vqM/maxresdefault.jpg',
    fileUrl: '/videos/social-anxiety-guide.mp4',
    tags: ['social-anxiety', 'fear', 'social-skills', 'confidence'],
    isPublished: true,
    isFeatured: false,
    views: 2134,
    downloads: 189,
    likes: ['user64', 'user65', 'user66'],
    author: {
      _id: '22',
      firstName: 'Dr.',
      lastName: 'Neha Gupta',
      profile: {
        avatar: '/avatars/neha-gupta.jpg'
      }
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 145
  },
  {
    _id: '23',
    title: 'Time Management for Students',
    description: 'Practical video guide on effective time management techniques specifically designed for students.',
    content: 'Learn proven time management strategies, study scheduling, and productivity techniques for academic success.',
    type: 'video' as const,
    category: mockResourceCategories[7],
    language: 'English',
    difficulty: 'beginner' as const,
    duration: 18,
    thumbnail: 'https://img.youtube.com/vi/arj7oStGLkU/maxresdefault.jpg',
    fileUrl: '/videos/time-management-students.mp4',
    tags: ['time-management', 'productivity', 'study-skills', 'organization'],
    isPublished: true,
    isFeatured: true,
    views: 3456,
    downloads: 278,
    likes: ['user67', 'user68', 'user69', 'user70'],
    author: {
      _id: '23',
      firstName: 'Dr.',
      lastName: 'Alex Chen',
      profile: {
        avatar: '/avatars/alex-chen.jpg'
      }
    },
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 223
  },

  // Famous Mental Health YouTube Videos
  {
    _id: '38',
    title: 'The Power of Vulnerability - Brené Brown',
    description: 'Brené Brown\'s famous TED Talk on vulnerability, courage, and authentic connection.',
    content: 'A groundbreaking talk about the power of vulnerability and how it leads to courage, authenticity, and connection.',
    type: 'video' as const,
    category: mockResourceCategories[0],
    language: 'English',
    difficulty: 'beginner' as const,
    duration: 20,
    thumbnail: 'https://img.youtube.com/vi/iCvmsMzlF7o/maxresdefault.jpg',
    fileUrl: 'https://www.youtube.com/watch?v=iCvmsMzlF7o',
    tags: ['vulnerability', 'courage', 'authenticity', 'connection', 'ted talk'],
    isPublished: true,
    isFeatured: true,
    views: 25000000,
    downloads: 0,
    likes: ['user100', 'user101', 'user102', 'user103', 'user104'],
    author: {
      _id: '38',
      firstName: 'Brené',
      lastName: 'Brown',
      profile: {
        avatar: '/avatars/brene-brown.jpg'
      }
    },
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 450000
  },
  {
    _id: '39',
    title: 'Depression: The Secret We Share - Andrew Solomon',
    description: 'Andrew Solomon\'s powerful TED Talk about depression and the importance of talking about mental health.',
    content: 'A deeply personal and moving talk about depression, resilience, and the power of sharing our struggles.',
    type: 'video' as const,
    category: mockResourceCategories[0],
    language: 'English',
    difficulty: 'intermediate' as const,
    duration: 28,
    thumbnail: 'https://img.youtube.com/vi/XiCrniLQGYc/maxresdefault.jpg',
    fileUrl: 'https://www.youtube.com/watch?v=XiCrniLQGYc',
    tags: ['depression', 'mental health', 'resilience', 'ted talk', 'stigma'],
    isPublished: true,
    isFeatured: true,
    views: 8500000,
    downloads: 0,
    likes: ['user105', 'user106', 'user107', 'user108'],
    author: {
      _id: '39',
      firstName: 'Andrew',
      lastName: 'Solomon',
      profile: {
        avatar: '/avatars/andrew-solomon.jpg'
      }
    },
    createdAt: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 180000
  },
  {
    _id: '40',
    title: 'The Science of Happiness - Dan Gilbert',
    description: 'Harvard psychologist Dan Gilbert explains the science behind happiness and how we can control it.',
    content: 'An insightful talk about the psychology of happiness and how our brains predict and experience joy.',
    type: 'video' as const,
    category: mockResourceCategories[1],
    language: 'English',
    difficulty: 'intermediate' as const,
    duration: 22,
    thumbnail: 'https://img.youtube.com/vi/4q1dgn_C0AU/maxresdefault.jpg',
    fileUrl: 'https://www.youtube.com/watch?v=4q1dgn_C0AU',
    tags: ['happiness', 'psychology', 'science', 'ted talk', 'wellbeing'],
    isPublished: true,
    isFeatured: true,
    views: 12000000,
    downloads: 0,
    likes: ['user109', 'user110', 'user111', 'user112', 'user113'],
    author: {
      _id: '40',
      firstName: 'Dan',
      lastName: 'Gilbert',
      profile: {
        avatar: '/avatars/dan-gilbert.jpg'
      }
    },
    createdAt: new Date(Date.now() - 500 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 220000
  },
  {
    _id: '41',
    title: 'How to Make Stress Your Friend - Kelly McGonigal',
    description: 'Health psychologist Kelly McGonigal shows how to make stress your friend and use it to your advantage.',
    content: 'A revolutionary talk about changing your mindset about stress and using it as a tool for growth.',
    type: 'video' as const,
    category: mockResourceCategories[2],
    language: 'English',
    difficulty: 'beginner' as const,
    duration: 14,
    thumbnail: 'https://img.youtube.com/vi/RcGyVTAoXEU/maxresdefault.jpg',
    fileUrl: 'https://www.youtube.com/watch?v=RcGyVTAoXEU',
    tags: ['stress', 'mindset', 'resilience', 'ted talk', 'psychology'],
    isPublished: true,
    isFeatured: true,
    views: 18000000,
    downloads: 0,
    likes: ['user114', 'user115', 'user116', 'user117', 'user118'],
    author: {
      _id: '41',
      firstName: 'Kelly',
      lastName: 'McGonigal',
      profile: {
        avatar: '/avatars/kelly-mcgonigal.jpg'
      }
    },
    createdAt: new Date(Date.now() - 600 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 320000
  },
  {
    _id: '42',
    title: 'The Art of Stillness - Pico Iyer',
    description: 'Travel writer Pico Iyer talks about the importance of stillness and finding peace in our busy world.',
    content: 'A beautiful meditation on the value of slowing down and finding stillness in our fast-paced lives.',
    type: 'video' as const,
    category: mockResourceCategories[6],
    language: 'English',
    difficulty: 'beginner' as const,
    duration: 16,
    thumbnail: 'https://img.youtube.com/vi/ZToicYcHIOU/maxresdefault.jpg',
    fileUrl: 'https://www.youtube.com/watch?v=ZToicYcHIOU',
    tags: ['stillness', 'meditation', 'mindfulness', 'ted talk', 'peace'],
    isPublished: true,
    isFeatured: false,
    views: 6500000,
    downloads: 0,
    likes: ['user119', 'user120', 'user121', 'user122'],
    author: {
      _id: '42',
      firstName: 'Pico',
      lastName: 'Iyer',
      profile: {
        avatar: '/avatars/pico-iyer.jpg'
      }
    },
    createdAt: new Date(Date.now() - 700 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 150000
  },
  {
    _id: '43',
    title: 'How to Spot a Liar - Pamela Meyer',
    description: 'Pamela Meyer shows how to spot deception and become more aware of the lies we tell ourselves.',
    content: 'An engaging talk about the psychology of deception and how to develop better lie detection skills.',
    type: 'video' as const,
    category: mockResourceCategories[3],
    language: 'English',
    difficulty: 'intermediate' as const,
    duration: 18,
    thumbnail: 'https://img.youtube.com/vi/P_6vDLq64gE/maxresdefault.jpg',
    fileUrl: 'https://www.youtube.com/watch?v=P_6vDLq64gE',
    tags: ['deception', 'psychology', 'communication', 'ted talk', 'awareness'],
    isPublished: true,
    isFeatured: false,
    views: 9500000,
    downloads: 0,
    likes: ['user123', 'user124', 'user125', 'user126'],
    author: {
      _id: '43',
      firstName: 'Pamela',
      lastName: 'Meyer',
      profile: {
        avatar: '/avatars/pamela-meyer.jpg'
      }
    },
    createdAt: new Date(Date.now() - 800 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 190000
  },
  {
    _id: '44',
    title: 'The Happy Secret to Better Work - Shawn Achor',
    description: 'Positive psychologist Shawn Achor explains how happiness leads to success, not the other way around.',
    content: 'A humorous and insightful talk about the science of positive psychology and how to rewire your brain for happiness.',
    type: 'video' as const,
    category: mockResourceCategories[1],
    language: 'English',
    difficulty: 'beginner' as const,
    duration: 12,
    thumbnail: 'https://img.youtube.com/vi/fLJsdqxnZb0/maxresdefault.jpg',
    fileUrl: 'https://www.youtube.com/watch?v=fLJsdqxnZb0',
    tags: ['happiness', 'positive psychology', 'success', 'ted talk', 'work'],
    isPublished: true,
    isFeatured: true,
    views: 15000000,
    downloads: 0,
    likes: ['user127', 'user128', 'user129', 'user130', 'user131'],
    author: {
      _id: '44',
      firstName: 'Shawn',
      lastName: 'Achor',
      profile: {
        avatar: '/avatars/shawn-achor.jpg'
      }
    },
    createdAt: new Date(Date.now() - 900 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 280000
  },
  {
    _id: '45',
    title: 'How to Practice Emotional First Aid - Guy Winch',
    description: 'Psychologist Guy Winch explains how to practice emotional first aid and take care of your mental health.',
    content: 'A practical guide to emotional hygiene and how to treat psychological wounds with the same care as physical ones.',
    type: 'video' as const,
    category: mockResourceCategories[0],
    language: 'English',
    difficulty: 'beginner' as const,
    duration: 17,
    thumbnail: 'https://img.youtube.com/vi/F2hc2FLOdhI/maxresdefault.jpg',
    fileUrl: 'https://www.youtube.com/watch?v=F2hc2FLOdhI',
    tags: ['emotional health', 'mental health', 'self-care', 'ted talk', 'psychology'],
    isPublished: true,
    isFeatured: true,
    views: 11000000,
    downloads: 0,
    likes: ['user132', 'user133', 'user134', 'user135', 'user136'],
    author: {
      _id: '45',
      firstName: 'Guy',
      lastName: 'Winch',
      profile: {
        avatar: '/avatars/guy-winch.jpg'
      }
    },
    createdAt: new Date(Date.now() - 1000 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 240000
  },
  {
    _id: '46',
    title: 'The Power of Introverts - Susan Cain',
    description: 'Susan Cain\'s influential talk about the power of introverts in a world that can\'t stop talking.',
    content: 'A compelling argument for the value of introversion and how introverts can thrive in an extroverted world.',
    type: 'video' as const,
    category: mockResourceCategories[3],
    language: 'English',
    difficulty: 'intermediate' as const,
    duration: 19,
    thumbnail: 'https://img.youtube.com/vi/c0KYU2j0TM4/maxresdefault.jpg',
    fileUrl: 'https://www.youtube.com/watch?v=c0KYU2j0TM4',
    tags: ['introversion', 'personality', 'leadership', 'ted talk', 'psychology'],
    isPublished: true,
    isFeatured: false,
    views: 13000000,
    downloads: 0,
    likes: ['user137', 'user138', 'user139', 'user140'],
    author: {
      _id: '46',
      firstName: 'Susan',
      lastName: 'Cain',
      profile: {
        avatar: '/avatars/susan-cain.jpg'
      }
    },
    createdAt: new Date(Date.now() - 1100 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 260000
  },
  {
    _id: '47',
    title: 'How to Build Your Creative Confidence - David Kelley',
    description: 'Designer David Kelley talks about building creative confidence and overcoming the fear of judgment.',
    content: 'An inspiring talk about developing creative confidence and learning to think like a creative person.',
    type: 'video' as const,
    category: mockResourceCategories[1],
    language: 'English',
    difficulty: 'beginner' as const,
    duration: 11,
    thumbnail: 'https://img.youtube.com/vi/16p9YRF0l-g/maxresdefault.jpg',
    fileUrl: 'https://www.youtube.com/watch?v=16p9YRF0l-g',
    tags: ['creativity', 'confidence', 'design thinking', 'ted talk', 'innovation'],
    isPublished: true,
    isFeatured: false,
    views: 8000000,
    downloads: 0,
    likes: ['user141', 'user142', 'user143', 'user144'],
    author: {
      _id: '47',
      firstName: 'David',
      lastName: 'Kelley',
      profile: {
        avatar: '/avatars/david-kelley.jpg'
      }
    },
    createdAt: new Date(Date.now() - 1200 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 170000
  }
]

// Helper function to filter resources based on parameters
export const filterResources = (resources: typeof mockResources, params?: {
  category?: string
  type?: string
  difficulty?: string
  language?: string
  search?: string
  featured?: boolean
  sortBy?: 'createdAt' | 'views' | 'downloads' | 'likes' | 'title'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}) => {
  let filtered = [...resources]

  // Apply filters
  if (params?.category) {
    filtered = filtered.filter(resource => resource.category._id === params.category)
  }

  if (params?.type) {
    filtered = filtered.filter(resource => resource.type === params.type)
  }

  if (params?.difficulty) {
    filtered = filtered.filter(resource => resource.difficulty === params.difficulty)
  }

  if (params?.language) {
    filtered = filtered.filter(resource => resource.language === params.language)
  }

  if (params?.search) {
    const searchLower = params.search.toLowerCase()
    filtered = filtered.filter(resource => 
      resource.title.toLowerCase().includes(searchLower) ||
      resource.description.toLowerCase().includes(searchLower) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  if (params?.featured !== undefined) {
    filtered = filtered.filter(resource => resource.isFeatured === params.featured)
  }

  // Apply sorting
  if (params?.sortBy) {
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (params.sortBy) {
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        case 'views':
          aValue = a.views
          bValue = b.views
          break
        case 'downloads':
          aValue = a.downloads
          bValue = b.downloads
          break
        case 'likes':
          aValue = a.likeCount
          bValue = b.likeCount
          break
        case 'title':
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        default:
          return 0
      }

      if (params.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }

  // Apply pagination
  const page = params?.page || 1
  const limit = params?.limit || 12
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  const paginatedResources = filtered.slice(startIndex, endIndex)

  return {
    resources: paginatedResources,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filtered.length / limit),
      totalResources: filtered.length,
      hasNext: endIndex < filtered.length,
      hasPrev: page > 1
    }
  }
}
