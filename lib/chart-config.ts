/**
 * Configuration settings for charts
 * This helps with SSR/CSR compatibility for recharts
 */

export const chartConfig = {
  // Common settings for all charts
  defaults: {
    margin: { top: 10, right: 30, left: 0, bottom: 5 },
    barSize: 20,
    animationDuration: 1000,
  },

  // Override specific chart settings
  radar: {
    outerRadius: 90,
    animationDuration: 1200,
  },
  
  bar: {
    animationDuration: 1400,
  },
  
  pie: {
    animationDuration: 1600,
    innerRadius: 40,
    outerRadius: 80,
  },
  
  // Colors
  colors: [
    '#8884d8', // Purple
    '#ff5500', // Orange
    '#4c1d95', // Deep purple
    '#0088FE', // Blue
    '#00C49F', // Teal
  ]
};
