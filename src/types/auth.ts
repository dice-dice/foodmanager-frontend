// 認証関連の型定義

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  password: string;
  role?: string[];
}

export interface JwtResponse {
  accessToken: string;
  tokenType: string;
  id: number;
  username: string;
  roles: string[];
}

export interface MessageResponse {
  message: string;
}

export interface AuthUser {
  id: number;
  username: string;
  roles: string[];
}
