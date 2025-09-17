# Seeded Data Documentation

## Database Information
- **Database Name:** `test`
- **MongoDB Cluster:** `cluster0.urnv9wg.mongodb.net`
- **Connection String:** `mongodb+srv://gauravkhandelwal205_db_user:gaurav@cluster0.urnv9wg.mongodb.net/test`
- **Seeded Date:** September 16, 2025
- **Purpose:** Development and testing data for Mental Health Support Platform

## Data Overview
- **Total Users:** 18
- **Total Counselor Profiles:** 3
- **Database Collections:** users, counselors

## User Accounts

### Admin Users (2)
| Email | Password | Role | Name |
|-------|----------|------|------|
| admin1@leher.com | Admin@123 | admin | Admin1 User |
| admin2@leher.com | Admin@123 | admin | Admin2 User |

### Moderator Users (1)
| Email | Password | Role | Name |
|-------|----------|------|------|
| gauravkhandelwal205@gmail.com | Moderator@123 | moderator | Gaurav Khandelwal |

### Counselor Users (5)
| Email | Password | Role | Name |
|-------|----------|------|------|
| kavita@counselor.com | Couns@123 | counselor | Dr. Kavita Rao |
| sunil@counselor.com | Couns@123 | counselor | Dr. Sunil Bansal |
| preeti@counselor.com | Couns@123 | counselor | Dr. Preeti Yadav |
| naveen@counselor.com | Couns@123 | counselor | Dr. Naveen Shah |
| mina@counselor.com | Couns@123 | counselor | Dr. Mina Sethi |

### Student Users (10)
| Email | Password | Role | Name |
|-------|----------|------|------|
| aanya@student.com | User@123 | student | Aanya Sharma |
| arjun@student.com | User@123 | student | Arjun Kumar |
| priya@student.com | User@123 | student | Priya Patel |
| rahul@student.com | User@123 | student | Rahul Singh |
| sneha@student.com | User@123 | student | Sneha Gupta |
| vikram@student.com | User@123 | student | Vikram Sharma |
| kavya@student.com | User@123 | student | Kavya Joshi |
| rohan@student.com | User@123 | student | Rohan Agarwal |
| ananya@student.com | User@123 | student | Ananya Verma |
| arjun.malhotra@student.com | User@123 | student | Arjun Malhotra |

## Counselor Profiles

### Dr. Kavita Rao
- **Email:** kavita@counselor.com
- **Specializations:** anxiety, depression, stress-management
- **Experience:** 8 years
- **Languages:** English, Hindi
- **Rating:** 4.8
- **Available:** Yes
- **Qualifications:** PhD in Clinical Psychology, Licensed Clinical Psychologist, CBT Certified
- **Bio:** Experienced counselor specializing in anxiety and depression. I help students navigate academic stress and personal challenges with evidence-based approaches.

### Dr. Sunil Bansal
- **Email:** sunil@counselor.com
- **Specializations:** academic-pressure, career-guidance, relationship-issues
- **Experience:** 12 years
- **Languages:** English, Hindi, Tamil
- **Rating:** 4.9
- **Available:** Yes
- **Qualifications:** MSc in Counseling Psychology, Career Guidance Specialist, NLP Practitioner
- **Bio:** Career counselor with extensive experience helping students with academic pressure and career decisions.

### Dr. Preeti Yadav
- **Email:** preeti@counselor.com
- **Specializations:** trauma, grief-counseling, family-therapy
- **Experience:** 6 years
- **Languages:** English, Hindi, Bengali
- **Rating:** 4.7
- **Available:** Yes
- **Qualifications:** MA in Clinical Psychology, Trauma-Informed Care Certified, Grief Counseling Specialist
- **Bio:** Specialized in trauma recovery and grief counseling. I provide a safe space for students dealing with difficult life experiences.

## Data Management Commands

### Connect to Database
```bash
# Using MongoDB Compass or CLI
mongodb+srv://gauravkhandelwal205_db_user:gaurav@cluster0.urnv9wg.mongodb.net/test
```

### Backup Database
```bash
mongodump --uri="mongodb+srv://gauravkhandelwal205_db_user:gaurav@cluster0.urnv9wg.mongodb.net/test" --out=backup/
```

### Restore Database
```bash
mongorestore --uri="mongodb+srv://gauravkhandelwal205_db_user:gaurav@cluster0.urnv9wg.mongodb.net/test" backup/test/
```

### Clear All Data
```bash
# Using Node.js
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb+srv://gauravkhandelwal205_db_user:gaurav@cluster0.urnv9wg.mongodb.net/test').then(async () => { await mongoose.connection.db.dropDatabase(); console.log('Database cleared'); process.exit(0); });"
```

### Reseed Data
```bash
cd server
node seed.js
```

## File Locations
- **Seeding Script:** `server/seed.js`
- **Test Script:** `server/test-counselors.js`
- **Database Config:** `server/src/config/database.ts`
- **Compiled Config:** `server/dist/config/database.js`
- **Environment Template:** `server/temp_env.txt`

## Notes
- All passwords are hashed using bcrypt with 12 rounds
- User emails are unique across the database
- Counselor profiles are linked to their respective user accounts
- Availability schedules are set for weekdays (Monday-Friday, 9 AM - 5 PM)
- All users have `isEmailVerified: true` for testing purposes
- Database name is "test" for development and testing purposes

## Last Updated
- **Date:** September 16, 2025
- **Action:** Initial seeding with comprehensive test data
- **Status:** ✅ Complete and verified
