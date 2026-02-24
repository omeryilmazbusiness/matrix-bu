// Admin User Types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminSession {
  user: AdminUser;
  accessToken: string;
  expiresAt: number;
}

// Profile Types
export interface Profile {
  id: string;
  
  // YouTube Data
  youtube_channel_id?: string;
  youtube_channel_url?: string;
  channel_title?: string;
  channel_description?: string;
  custom_url?: string;
  
  // Statistics
  subscriber_count?: number;
  video_count?: number;
  view_count?: number;
  
  // Images
  thumbnail_default?: string;
  thumbnail_medium?: string;
  thumbnail_high?: string;
  banner_url?: string;
  
  // Legacy/Custom Fields
  slug: string;
  title: string;
  name: string;
  image_url: string;
  topic: string;
  description: string;
  youtube_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  website_url?: string;
  status: string;
  
  // Metadata
  is_featured?: boolean;
  display_order?: number;
  published_at?: string;
  country?: string;
  keywords?: string;
  last_synced_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileFormData {
  slug: string;
  title: string;
  name: string;
  image_url: string;
  topic: string;
  description: string;
  youtube_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  status: string;
}

// Admin Operations Types
export interface CreateProfileRequest {
  slug: string;
  title: string;
  name: string;
  image_url: string;
  topic: string;
  description: string;
  youtube_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  status: string;
}

export interface CreateWeeklyPersonRequest {
  name: string;
  title: string;
  description: string;
  image: string;
  period: string;
  fullBiography: string;
  birthPlace: string;
  deathPlace?: string;
  majorWorks: string[];
  achievements: string[];
  quote: string;
  quoteAuthor?: string;
  historicalContext: string;
  legacy: string;
}

// Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Repository Interfaces (Dependency Inversion Principle)
export interface IAdminRepository {
  findByEmail(email: string): Promise<AdminUser | null>;
  create(data: Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>): Promise<AdminUser>;
  update(id: string, data: Partial<AdminUser>): Promise<AdminUser>;
}

export interface IProfileRepository {
  findAll(filters?: any): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<boolean>;
}

export interface IWeeklyPersonRepository {
  findAll(): Promise<any[]>;
  findById(id: number): Promise<any | null>;
  create(data: any): Promise<any>;
  update(id: number, data: any): Promise<any>;
  delete(id: number): Promise<boolean>;
}

// Service Interfaces (Interface Segregation Principle)
export interface IAuthService {
  login(credentials: AdminLoginCredentials): Promise<AdminSession>;
  validateSession(token: string): Promise<AdminUser | null>;
  logout(token: string): Promise<boolean>;
}

export interface IProfileService {
  getAllProfiles(filters?: any): Promise<any[]>;
  getProfileById(id: string): Promise<any>;
  createProfile(data: CreateProfileRequest): Promise<any>;
  updateProfile(id: string, data: Partial<CreateProfileRequest>): Promise<any>;
  deleteProfile(id: string): Promise<boolean>;
}

export interface IWeeklyPersonService {
  getAllWeeklyPersons(): Promise<any[]>;
  getWeeklyPersonById(id: number): Promise<any>;
  createWeeklyPerson(data: CreateWeeklyPersonRequest): Promise<any>;
  updateWeeklyPerson(id: number, data: Partial<CreateWeeklyPersonRequest>): Promise<any>;
  deleteWeeklyPerson(id: number): Promise<boolean>;
}
