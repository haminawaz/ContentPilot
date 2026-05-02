
export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface EmailPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyUserPayload {
  email: string;
  otp: string;
}

export interface GenerateArticlePayload {
  topic: string;
  language: string;
  wordCount: number;
}
