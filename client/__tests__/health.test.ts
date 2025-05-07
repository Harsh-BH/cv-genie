import { GET } from '@/app/api/health/route';
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

// Mock the Prisma client
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    $queryRaw: jest.fn()
  }
}));

describe('Health API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return status ok when database is up', async () => {
    // Mock successful database connection
    (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([1]);
    
    // Create a proper NextRequest object
    const mockRequest = new NextRequest(new Request('https://example.com/api/health'));
    const response = await GET(mockRequest);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.status).toBe('ok');
    expect(data.services.database.status).toBe('up');
    expect(data.services.database.responseTime).toBeDefined();
  });

  test('should return status error when database is down', async () => {
    // Mock database connection error
    (prisma.$queryRaw as jest.Mock).mockRejectedValueOnce(new Error('Database connection failed'));
    
    // Create a proper NextRequest object
    const mockRequest = new NextRequest(new Request('https://example.com/api/health'));
    const response = await GET(mockRequest);
    const data = await response.json();
    
    expect(response.status).toBe(503);
    expect(data.status).toBe('error');
    expect(data.services.database.status).toBe('down');
    expect(data.services.database.error).toBe('Database connection failed');
  });
});