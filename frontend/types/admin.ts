export interface ApiEnvelope<T> {
  message: string;
  response: T;
  error: string | null;
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminLoginResponse {
  data: { email: string };
  token: string;
}

export interface AdminUserRow {
  id: number;
  first_name: string;
  last_name: string;
  status: string;
  createdAt: string;
}

export interface AdminUserDetail {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  last_login_at: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminContentUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface AdminContentRow {
  id: number;
  topic: string;
  title: string | null;
  word_count: number;
  language: string;
  status: string;
  createdAt: string;
  user: AdminContentUser;
}

export interface AdminContentDetail extends AdminContentRow {
  content: string;
  metadata: unknown;
  linking_strategy: unknown;
  faq: unknown;
  updatedAt: string;
}

export interface AdminSubscriptionRow {
  id: number;
  status: string;
  credits_remaining: number;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at: string | null;
  canceled_at: string | null;
  createdAt: string;
  user: AdminContentUser;
  plan: {
    id: number;
    plan_name: string;
    price: number;
    currency: string;
    credit_limit: number;
    interval: string;
  };
}

export interface AdminPlan {
  id: number;
  plan_name: string;
  price: number;
  interval: string;
  description: string;
  features: string[] | null;
  currency: string;
  active: boolean;
  credit_limit: number;
  stripe_price_id: string;
  createdAt: string;
  updatedAt: string;
  subscriberCount?: number;
}

export interface AdminPlanInput {
  plan_name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  currency: string;
  credit_limit: number;
  active: boolean;
  stripe_price_id?: string;
}

export interface AdminStats {
  totals: {
    totalUsers: number;
    activeUsers: number;
    blockedUsers: number;
    newUsersThisMonth: number;
    totalArticles: number;
    articlesThisMonth: number;
    totalSubscriptions: number;
    activeSubscriptions: number;
    mrr: number;
  };
  planDistribution: { plan_id: number; plan_name: string; count: number }[];
  monthly: { key: string; label: string; users: number; articles: number }[];
  recentUsers: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    createdAt: string;
  }[];
  recentArticles: {
    id: number;
    topic: string;
    title: string | null;
    word_count: number;
    language: string;
    createdAt: string;
    user: AdminContentUser;
  }[];
}
