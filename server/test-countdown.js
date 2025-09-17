// Simple test script to demonstrate the countdown feature
const createCountdown = (total) => {
  let current = 0
  const startTime = Date.now()
  
  return {
    increment: () => {
      current++
      const elapsed = Date.now() - startTime
      const remaining = total - current
      const avgTimePerItem = elapsed / current
      const estimatedTimeRemaining = remaining * avgTimePerItem
      
      const progress = (current / total) * 100
      const progressBar = '█'.repeat(Math.floor(progress / 2)) + '░'.repeat(50 - Math.floor(progress / 2))
      
      process.stdout.write(`\r🚀 Progress: [${progressBar}] ${progress.toFixed(1)}% (${current}/${total}) | ⏱️ ETA: ${Math.round(estimatedTimeRemaining / 1000)}s | ⚡ ${Math.round(1000 / avgTimePerItem)}/s`)
      
      if (current === total) {
        console.log('\n✅ Countdown completed!')
      }
    },
    getCurrent: () => current,
    getTotal: () => total,
    getProgress: () => (current / total) * 100
  }
}

// Test the countdown with 100 items
console.log('🧪 Testing countdown feature with 100 items...')
console.log('')

const countdown = createCountdown(100)

// Simulate processing 100 items with random delays
const processItems = async () => {
  for (let i = 0; i < 100; i++) {
    // Simulate some work
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50))
    countdown.increment()
  }
}

processItems().then(() => {
  console.log('🎉 Test completed!')
  process.exit(0)
})
