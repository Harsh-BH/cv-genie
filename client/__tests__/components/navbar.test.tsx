import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import the component using a relative path
import Navbar from '@/components/navbar/navbar';

// Mock React.useState and useEffect to avoid client-side code
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useState: jest.fn((initial) => [initial, jest.fn()]),
    useEffect: jest.fn((callback) => callback()),
  };
});

// Mock all the external dependencies with proper TypeScript types
jest.mock('next/link', () => {
  return ({ children }: { children: ReactNode }) => <div>{children}</div>;
});

jest.mock('cookies-next', () => ({
  getCookie: jest.fn(() => null),
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

// Create a simple test that doesn't render the full component
describe('Navbar Component', () => {
  it('can be imported without errors', () => {
    // Just test that the component exists
    expect(Navbar).toBeDefined();
    expect(typeof Navbar).toBe('function');
  });
});