export interface RegisterUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  email_verification_otp: string;
  email_verification_otp_expiry: Date;
}

export interface UpdateUser {
  user_id: number;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface ForgotPassword {
  user_id: number;
  reset_password_otp: string;
  reset_password_otp_expiry: Date;
}

export interface ResetPassword {
  user_id: number;
  otp: string;
  new_password: string;
}
