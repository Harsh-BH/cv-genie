import { GET } from '@/app/api/health/route';

// At the top of your test file
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
    jest.restoreAllMocks();
});

// Mock the NextRequest and NextResponse
jest.mock('next/server', () => ({
  NextRequest: jest.fn().mockImplementation(() => ({
    nextUrl: { pathname: '/api/health' },
    headers: new Map(),
    method: 'GET'
  })),
  NextResponse: {
    json: jest.fn((data, options) => ({
      status: options?.status || 200,
      json: async () => data
    }))
  }
}));

// Mock Prisma client
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    $queryRaw: jest.fn(() => Promise.resolve([{ now: new Date() }])),
  },
}));

describe('Health API', () => {
  it('returns 200 when database is up', async () => {
    // No need to create a NextRequest - the GET function will use our mock
    const response = await GET({} as any);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.status).toBe('ok');
    expect(data.services.database.status).toBe('up');
  });
  
  it('returns 503 when database is down', async () => {
    // Override the mock to simulate a database error
    const mockPrisma = require('@/lib/prisma').default;
    mockPrisma.$queryRaw.mockRejectedValueOnce(new Error('Database connection failed'));
    
    const response = await GET({} as any);
    const data = await response.json();
    
    expect(response.status).toBe(503);
    expect(data.status).toBe('error');
    expect(data.services.database.status).toBe('down');
    expect(data.services.database.error).toBe('Database connection failed');
  });
});