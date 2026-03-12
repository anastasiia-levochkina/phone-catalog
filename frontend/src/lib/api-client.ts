import { TestData, User, CreateUserDto } from '@/types/api.types';

const API_URL = process.env.PUBLIC_API_URL || 'http://localhost:4000';

class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `HTTP error! status: ${response.status}`,
    }));
    throw new ApiError(
      error.message || 'An error occurred',
      response.status,
    );
  }

  return response.json();
}

export const apiClient = {
  test: {
    getTestData: (): Promise<TestData> => fetchApi<TestData>('/api/test'),
  },
  users: {
    getAll: (): Promise<User[]> => fetchApi<User[]>('/api/users'),
    create: (data: CreateUserDto): Promise<User> =>
      fetchApi<User>('/api/users', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
};

export { ApiError };
