import prisma from '@/lib/prisma';

describe('Database Health Check', () => {
  // Set a longer timeout for all tests in this describe block
  jest.setTimeout(30000); // 30 seconds timeout

  it('should connect to the database', async () => {
    // Simple query to test connection
    const result = await prisma.$queryRaw`SELECT NOW()`;
    expect(result).toBeDefined();
  });

  it('should be able to create, read, and delete data', async () => {
    // Add a longer timeout for this specific test (30 seconds)
    // Step 1: Create a test user
    const testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        password: 'temporary-password',
      },
    });
    
    expect(testUser.id).toBeDefined();
    
    try {
      // Step 2: Create a test resume
      const testResume = await prisma.resume.create({
        data: {
          fileName: 'test-resume.pdf',
          fileType: 'application/pdf',
          fileData: 'VGhpcyBpcyBhIHRlc3QgcmVzdW1lIGZpbGUgY29udGVudC4=', // Base64 test content
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
      
      expect(testResume.id).toBeDefined();
      expect(testResume.sections.length).toBeGreaterThan(0);
      
      // Step 3: Retrieve the data to verify storage
      const retrievedResume = await prisma.resume.findUnique({
        where: { id: testResume.id },
        include: { sections: true }
      });
      
      expect(retrievedResume).not.toBeNull();
      expect(retrievedResume?.sections.length).toBe(testResume.sections.length);
      
      // Step 4: Clean up - delete resume first
      await prisma.resumeSection.deleteMany({
        where: { resumeId: testResume.id }
      });
      
      await prisma.resume.delete({
        where: { id: testResume.id }
      });
    } finally {
      // Always clean up the user, even if test fails
      await prisma.user.delete({
        where: { id: testUser.id }
      }).catch(e => console.log('Error cleaning up test user:', e));
    }
  }, 30000); // 30 second timeout for this test specifically
});