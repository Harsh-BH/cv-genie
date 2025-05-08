require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error'],
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

(async () => {
  try {
    console.log('🔍 Testing database connection and storage...');
    
    // Step 1: Create a temporary user for the test
    const testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        password: 'temporary-password',
      },
    });
    
    console.log(`✅ Created temporary test user with ID: ${testUser.id}`);
    
    // Rest of your code stays the same...
    
    // Step 2: Create a small test resume
    const testResume = await prisma.resume.create({
      data: {
        fileName: 'test-resume.pdf',
        fileType: 'application/pdf',
        fileData: 'VGhpcyBpcyBhIHRlc3QgcmVzdW1lIGZpbGUgY29udGVudC4=', // Base64 for test content
        userId: testUser.id,
        profileSummary: 'Test profile summary',
        sections: {
          create: [
            {
              title: 'Test Section',
              content: 'Test content for database health check',
              orderIndex: 1
            }
          ]
        }
      },
      include: {
        sections: true
      }
    });
    
    console.log(`✅ Created test resume with ID: ${testResume.id}`);
    console.log(`✅ Created ${testResume.sections.length} resume section(s)`);
    
    // Step 3: Verify data was properly stored by retrieving it
    const retrievedResume = await prisma.resume.findUnique({
      where: { id: testResume.id },
      include: { sections: true }
    });
    
    if (!retrievedResume) {
      throw new Error('Failed to retrieve the test resume');
    }
    
    console.log('✅ Successfully retrieved test resume from database');
    
    // Step 4: Clean up - Delete the test data
    await prisma.resume.delete({
      where: { id: testResume.id }
    });
    
    await prisma.user.delete({
      where: { id: testUser.id }
    });
    
    console.log('✅ Cleaned up test data');
    console.log('✅ Database connection and storage test passed successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database health check failed:');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
