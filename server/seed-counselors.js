const { exec } = require('child_process');
const path = require('path');

console.log('🌱 Starting counselor seeding process...');

// Run the TypeScript seeding script
exec('npx ts-node -r tsconfig-paths/register src/scripts/seedCounselors.ts', {
  cwd: __dirname,
  stdio: 'inherit'
}, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Error running seed script:', error);
    return;
  }
  if (stderr) {
    console.error('⚠️ Warning:', stderr);
  }
  console.log('✅ Seeding completed successfully!');
});
