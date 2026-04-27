import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../middleware/errorHandler";
import userQueries from "../../queries/user/auth";
import emailService from "../../services/email.service";
import emailTemplates from "../../lib/email-templates";
import configs from "../../config/env";

const getFrontendAuthUrl = (
  path: "verify-user" | "reset-password",
  email: string,
  otp: string,
) => {
  const baseUrl = configs.frontendBaseUrl.replace(/\/+$/, "");
  const params = new URLSearchParams({
    email,
    otp,
  });
  console.log("baseUrl", `${baseUrl}/auth/${path}?${params.toString()}`)

  return `${baseUrl}/auth/${path}?${params.toString()}`;
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { first_name, last_name, email, password, phone } = req.body;

  const existingUser = await userQueries.getUserByEmail(email);
  if (existingUser) {
    if (existingUser.email_verified) {
      return res.status(409).json({
        message: "User already exists",
        response: null,
        error: "User already exists",
      });
    }

    const isOtpExpired =
      !existingUser.email_verification_expires_at ||
      existingUser.email_verification_expires_at < new Date();

    if (!isOtpExpired) {
      return res.status(409).json({
        message: "User already exists",
        response: null,
        error: "User already exists",
      });
    }
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
  const hashedNewPassword = await bcrypt.hash(password, 10);

  await userQueries.createOrUpdateUserTransaction({
    first_name,
    last_name,
    email,
    password: hashedNewPassword,
    phone,
    email_verification_otp_expiry: otpExpiry,
    email_verification_otp: String(otp),
  });

  const fullName = `${first_name} ${last_name}`;
  const verificationUrl = getFrontendAuthUrl("verify-user", email, otp);
  const dynamicData = {
    subject: "Verify Your Email",
    to_email: email,
  };
  await emailService.sendMail(
    emailTemplates.getRegistrationEmailBody(
      fullName,
      Number(otp),
      verificationUrl,
    ),
    dynamicData,
  );

  return res.status(201).json({
    message: "User created successfully",
    response: null,
    error: null,
  });
});

export const resendOTP = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Email is required",
      response: null,
      error: "Email is required",
    });
  }

  const existingUser = await userQueries.getUserByEmail(email);
  if (!existingUser) {
    return res.status(404).json({
      message: "User not found",
      response: null,
      error: "User not found",
    });
  }

  if (existingUser.email_verified) {
    return res.status(400).json({
      message: "Email is already verified",
      response: null,
      error: "Email is already verified",
    });
  }

  // if (
  //   existingUser.email_verification_expires_at &&
  //   existingUser.email_verification_expires_at > new Date()
  // ) {
  //   return res.status(403).json({
  //     message: "Verification email has already been sent",
  //     response: null,
  //     error: "Verification email has already been sent",
  //   });
  // }

  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  await userQueries.updateUserOtp({
    email,
    otp,
    otpExpiry,
  });

  const fullName = `${existingUser.first_name} ${existingUser.last_name}`;
  const verificationUrl = getFrontendAuthUrl("verify-user", email, otp);
  const dynamicData = {
    subject: "Verify Your Email",
    to_email: email,
  };
  await emailService.sendMail(
    emailTemplates.getRegistrationEmailBody(
      fullName,
      Number(otp),
      verificationUrl,
    ),
    dynamicData,
  );

  return res.status(200).json({
    message: "OTP sent successfully",
    response: null,
    error: null,
  });
});

export const verifyUserEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const otp = req.query.otp as string;

    const user = await userQueries.verifyUserEmail(email, otp);
    if (!user) {
      return res.status(400).json({
        message: "Invalid otp or expired",
        response: null,
        error: "Invalid otp or expired",
      });
    }

    return res.status(200).json({
      message: "Email verified successfully",
      response: null,
      error: null,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return res.status(500).json({
      message: errorMessage,
      response: null,
      error: errorMessage,
    });
  }
};

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userQueries.getUserWithPassword(email);
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
      response: null,
      error: "Invalid credentials",
    });
  }
  if (!user.email_verified) {
    return res.status(403).json({
      message: "Please verify your email",
      response: null,
      error: "Please verify your email",
    });
  }
  if (user.status !== "active") {
    return res.status(403).json({
      message: `Account is ${user.status}. Please contact support`,
      response: null,
      error: `Account is ${user.status}. Please contact support`,
    });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({
      message: "Invalid credentials",
      response: null,
      error: "Invalid credentials",
    });
  }

  const token = jwt.sign({ email }, configs.jwtSecret, {
    expiresIn: "24h",
  });

  await userQueries.updateLastLogin(user.id);

  const userData = {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  };

  const data = {
    data: userData,
    token,
  };

  return res.status(200).json({
    message: "User logged in successfully",
    response: data,
    error: null,
  });
});

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.decoded.userId as string);
    const { first_name, last_name, phone } = req.body;

    const updateProfile = await userQueries.updateProfile({
      user_id: userId,
      first_name,
      last_name,
      phone,
    });
    if (!updateProfile) {
      return res.status(400).json({
        message: "Failed to update profile",
        response: null,
        error: "Failed to update profile",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      response: {
        data: {
          first_name: updateProfile.first_name,
          last_name: updateProfile.last_name,
          phone: updateProfile.phone,
        },
      },
      error: null,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return res.status(500).json({
      message: errorMessage,
      response: null,
      error: errorMessage,
    });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.decoded.userId as string);
    const { old_password, new_password } = req.body;

    const user = await userQueries.getUserPassword(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        response: null,
        error: "User not found",
      });
    }

    const isOldPasswordValid = await bcrypt.compare(
      old_password,
      user.password,
    );

    if (!isOldPasswordValid) {
      return res.status(400).json({
        message: "Invalid Old password",
        response: null,
        error: "Invalid Old password",
      });
    }

    const hashedNewPassword = await bcrypt.hash(new_password, 10);
    const updatePasswordResult = await userQueries.updatePassword(
      userId,
      hashedNewPassword,
    );
    if (!updatePasswordResult) {
      return res.status(400).json({
        message: "Failed to update password",
        response: null,
        error: "Failed to update password",
      });
    }

    return res.status(200).json({
      message: "Password updated successfully",
      response: null,
      error: null,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return res.status(500).json({
      message: errorMessage,
      response: null,
      error: errorMessage,
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await userQueries.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        response: null,
        error: "User not found",
      });
    }
    if (!user.email_verified) {
      return res.status(403).json({
        message: "Please verify your email",
        response: null,
        error: "Please verify your email",
      });
    }
    if (user.status !== "active") {
      return res.status(403).json({
        message: `Account is ${user.status}. Please contact support`,
        response: null,
        error: `Account is ${user.status}. Please contact support`,
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await userQueries.forgotPassword({
      user_id: user.id,
      reset_password_otp: otp,
      reset_password_otp_expiry: otpExpiry,
    });

    const resetPasswordUrl = getFrontendAuthUrl("reset-password", email, otp);
    const dynamicData = {
      subject: "Reset your password",
      to_email: email,
    };
    await emailService.sendMail(
      emailTemplates.getForgotPasswordEmailBody(
        Number(otp),
        resetPasswordUrl,
      ),
      dynamicData,
    );

    return res.status(200).json({
      message: `Email has been sent successfully for reset password`,
      response: null,
      error: null,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return res.status(500).json({
      message: errorMessage,
      response: null,
      error: errorMessage,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const otp = req.query.otp as string;
    const { password } = req.body;

    const existingUser = await userQueries.getUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
        response: null,
        error: "User not found",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userQueries.resetPassword({
      user_id: existingUser.id,
      otp,
      new_password: hashPassword,
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid token or expired",
        response: null,
        error: "Invalid token or expired",
      });
    }

    const dynamicData = {
      subject: "Reset your password",
      to_email: email,
    };
    await emailService.sendMail(
      emailTemplates.getResetPasswordEmailBody(),
      dynamicData,
    );

    return res.status(200).json({
      message: "Password reset successfully",
      response: null,
      error: null,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return res.status(500).json({
      message: errorMessage,
      response: null,
      error: errorMessage,
    });
  }
};
