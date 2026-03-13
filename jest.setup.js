import '@testing-library/jest-dom';

// jsdom does not implement IntersectionObserver — mock it so components
// that use it (e.g. ProductList sentinel) don't throw in tests.
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
