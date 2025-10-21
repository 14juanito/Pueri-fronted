import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useAuth } from '../stores/auth';
import type { UserRole } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Token ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized error (e.g., token expired)
          const auth = useAuth.getState();
          if (auth.isAuthenticated) {
            auth.logout();
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Auth endpoints
  public async login(email: string, password: string): Promise<{ user: any; token: string }> {
    const response = await this.api.post('/auth/login/', { email, password });
    return response.data;
  }

  public async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  }): Promise<void> {
    await this.api.post('/auth/register/', userData);
  }

  public async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout/');
    } finally {
      // Always clear local storage and state
      localStorage.removeItem('authToken');
    }
  }

  public async getProfile(): Promise<any> {
    const response = await this.api.get('/auth/profile/');
    return response.data;
  }

  public async updateProfile(profileData: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }): Promise<any> {
    const response = await this.api.put('/auth/profile/', profileData);
    return response.data;
  }

  public async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.api.post('/auth/change-password/', { currentPassword, newPassword });
  }

  // Generic CRUD methods
  public async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<T>(endpoint, config);
    return response.data;
  }

  public async post<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.post<T>(endpoint, data, config);
    return response.data;
  }

  public async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.put<T>(endpoint, data, config);
    return response.data;
  }

  public async patch<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.patch<T>(endpoint, data, config);
    return response.data;
  }

  public async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<T>(endpoint, config);
    return response.data;
  }

  // Special actions
  public async autoAssignSubdivisions(): Promise<void> {
    await this.api.post('/eleves/affecter_subdivision_auto/');
  }

  public async calculateTermGrades(): Promise<void> {
    await this.api.post('/notes-trimestrielles/calculer_notes_trimestrielles/');
  }

  public async autoPromoteStudents(threshold: number): Promise<void> {
    await this.api.post('/notes-annuelles/promotion_automatique/', { threshold });
  }

  public async markNotificationAsRead(notificationId: string): Promise<void> {
    await this.api.patch(`/notifications/${notificationId}/marquer_lu/`);
  }

  public async markAllNotificationsAsRead(): Promise<void> {
    await this.api.post('/notifications/marquer_toutes_lues/');
  }

  // File upload helper
  public async uploadFile(endpoint: string, file: File, fieldName = 'file'): Promise<any> {
    const formData = new FormData();
    formData.append(fieldName, file);

    const response = await this.api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }
}

export const api = ApiService.getInstance();

// Type for API response with pagination
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Type for query parameters
export interface QueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  [key: string]: any;
}

// Helper function to convert query params object to URLSearchParams
export const buildQueryString = (params: QueryParams): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, v.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};
