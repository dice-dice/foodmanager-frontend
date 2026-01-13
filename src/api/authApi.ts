import apiClient from './axios';
import type { LoginRequest, SignupRequest, JwtResponse, MessageResponse } from '../types';

const AUTH_URL = '/auth';

export const authApi = {
  signin: async (data: LoginRequest): Promise<JwtResponse> => {
    const response = await apiClient.post<JwtResponse>(`${AUTH_URL}/signin`, data);
    return response.data;
  },

  signup: async (data: SignupRequest): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>(`${AUTH_URL}/signup`, data);
    return response.data;
  },
};
