export interface TestData {
  message: string;
  timestamp: string;
  status: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
