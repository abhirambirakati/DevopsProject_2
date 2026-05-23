// src/config.ts
// Frontend configuration for API endpoints
// This file is imported where API calls are made.

export const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:8080/api' : '/api';
