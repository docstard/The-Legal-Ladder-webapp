/**
 * API Client for The Legal Ladder Backend
 * Handles all API calls to the server
 */

// Automatic environment detection
const getApiBaseUrl = () => {
  // 1. If explicitly set, use that
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // 2. In browser, use relative path (works in both dev and production)
  if (typeof window !== 'undefined') {
    return '/api';
  }
  
  // 3. Server-side fallback
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 
    (process.env.NODE_ENV === 'production'
      ? 'https://yourdomain.com'
      : 'http://localhost:3000');
  
  return `${appUrl}/api`;
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Get authentication headers
 */
async function getAuthHeaders(): Promise<HeadersInit> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Clerk will automatically include auth token in cookies
  // For server-side, we might need to pass the token explicitly
  return headers;
}

/**
 * Generic API request handler
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(endpoint)
  console.log(url)
  const headers = await getAuthHeaders();
  console.log("API Request Headers:", headers);

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
    credentials: "include", // Include cookies for Clerk auth
  });
  console.log("API Response Status:", response.status);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || `API Error: ${response.status}`);
  }

  return response.json();
}

/**
 * API Client Methods
 */
export const api = {
  // Mock Tests
  getMockTests: (params?: { examCategoryId?: string; type?: string }) => {
    const query = new URLSearchParams();
    if (params?.examCategoryId) query.append("examCategoryId", params.examCategoryId);
    if (params?.type) query.append("type", params.type);
    console.log("Fetching mock tests with params:", params);
    const queryString = query.toString();
    return apiRequest<{ mockTests: any[] }>(`/mock-tests${queryString ? `?${queryString}` : ""}`);
  },

  getMockTest: (testId: string) => {
    console.log("Fetching mock test with ID:", testId);
    return apiRequest<{ mockTest: any }>(`/mock-tests/${testId}`);
  },

  startTest: (testId: string) => {
    console.log("Starting test with ID:", testId);
    return apiRequest<{ attempt: any }>(`/mock-tests/${testId}/start`, {
      method: "POST",
    });
  },

  getTestState: (testId: string) => {
    return apiRequest<{
      attempt: any;
      mockTest: any;
      questions: any[];
    }>(`/mock-tests/${testId}/state`);
  },

  saveAnswer: (testId: string, questionId: string, selectedOption: number | null) => {
    return apiRequest<{ answer: any; remainingSeconds: number }>(
      `/mock-tests/${testId}/answer`,
      {
        method: "POST",
        body: JSON.stringify({ questionId, selectedOption }),
      }
    );
  },

  submitTest: (testId: string) => {
    return apiRequest<{ message: string; result: any }>(`/mock-tests/${testId}/submit`, {
      method: "POST",
    });
  },

  getResult: (testId: string) => {
    return apiRequest<{
      attempt: any;
      result: any;
      questions: any[];
    }>(`/mock-tests/${testId}/result`);
  },

  // Courses
  getCourses: () => {
    return apiRequest<{ courses: any[] }>("/courses");
  },

  getCourse: (courseId: string) => {
    return apiRequest<{ course: any }>(`/courses/${courseId}`);
  },

  enrollInCourse: (courseId: string) => {
    return apiRequest<{ enrollment: any }>(`/courses/${courseId}/enroll`, {
      method: "POST",
    });
  },

  // Exam Categories
  getExamCategories: () => {
    return apiRequest<{ categories: any[] }>("/exam-categories");
  },

  // Blogs
  getBlogs: (params?: { isFree?: boolean }) => {
    const query = new URLSearchParams();
    if (params?.isFree !== undefined) query.append("isFree", String(params.isFree));
    const queryString = query.toString();
    return apiRequest<{ blogs: any[] }>(`/blogs${queryString ? `?${queryString}` : ""}`);
  },

  getBlog: (blogId: string) => {
    return apiRequest<{ blog: any }>(`/blogs/${blogId}`);
  },

  // Notes
  getNotes: (params?: { isFree?: boolean }) => {
    const query = new URLSearchParams();
    if (params?.isFree !== undefined) query.append("isFree", String(params.isFree));
    const queryString = query.toString();
    return apiRequest<{ notes: any[] }>(`/notes${queryString ? `?${queryString}` : ""}`);
  },

  getNote: (noteId: string) => {
    return apiRequest<{ note: any }>(`/notes/${noteId}`);
  },

  // Rankings
  getRankings: (testId: string, params?: { state?: string; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.state) query.append("state", params.state);
    if (params?.limit) query.append("limit", String(params.limit));
    const queryString = query.toString();
    return apiRequest<{ rankings: any[] }>(
      `/analytics/rankings/${testId}${queryString ? `?${queryString}` : ""}`
    );
  },
};

