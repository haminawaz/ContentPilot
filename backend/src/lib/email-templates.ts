import configs from "../config/env";
const LOGO_URL = configs.frontendBaseUrl + "/logo.png";

const generateEmailLayout = (content: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Structa</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Sofia+Sans:wght@400;500;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Sofia Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: #F3F0EE;
          -webkit-font-smoothing: antialiased;
        }
        
        .email-shell {
          background-color: #F3F0EE;
          padding: 40px 20px;
          display: flex;
          justify-content: center;
        }

        .email-card {
          width: 100%;
          max-width: 520px;
          background: #ffffff;
          border-radius: 36px;
          overflow: hidden;
          box-shadow: 0 24px 48px rgba(0,0,0,0.08);
          margin: 0 auto;
        }

        .email-header {
          padding: 44px 40px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-bottom: 1px solid rgba(20,20,19,0.06);
        }

        .logo-area {
          text-align: center;
        }
        
        .logo-img {
          height: 36px;
          width: 36px;
          display: block;
          margin: 0 auto;
        }

        .email-body {
          padding: 40px 52px 52px;
          color: #141413;
          line-height: 1.65;
          font-size: 15px;
        }

        .email-h1 {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #141413;
          margin-bottom: 12px;
          line-height: 1.25;
          text-align: center;
        }

        .email-p {
          color: #444;
          font-size: 14.5px;
          margin-bottom: 20px;
          line-height: 1.7;
          text-align: center;
        }

        .center {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .cta-btn {
          display: inline-block;
          padding: 13px 32px;
          background: #141413;
          color: #ffffff;
          text-decoration: none;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: -0.01em;
          margin: 8px auto 24px;
        }

        .otp-block {
          text-align: center;
          margin: 24px 0;
        }
        
        .otp-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #696969;
          margin-bottom: 14px;
          display: block;
        }
        
        .otp-code {
          display: inline-block;
          padding: 20px 40px;
          background: #CF4500;
          color: #ffffff;
          border-radius: 22px;
          font-size: 30px;
          font-weight: 700;
          letter-spacing: 10px;
          font-family: 'SF Mono', 'Fira Code', monospace;
        }
        
        .otp-expire {
          font-size: 12px;
          color: #696969;
          margin-top: 10px;
        }

        .divider {
          height: 1px;
          background: rgba(20,20,19,0.07);
          margin: 28px 0;
        }

        .info-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          margin-top: 24px;
          padding: 16px;
          background: rgba(207,69,0,0.04);
          border-radius: 16px;
        }
        
        .info-text {
          font-size: 13px;
          color: #696969;
          line-height: 1.6;
          margin: 0;
          text-align: left;
        }

        .email-footer {
          background: #141413;
          padding: 44px 40px;
          text-align: center;
          color: #ffffff;
        }
        
        .footer-brand {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
        }
        
        .footer-tagline {
          font-size: 12px;
          color: rgba(255,255,255,0.45);
          margin-bottom: 24px;
          line-height: 1.6;
        }
        
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 24px;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 24px;
        }
        
        .footer-link {
          color: rgba(255,255,255,0.45);
          font-size: 11.5px;
          text-decoration: none;
        }
        
        .footer-copy {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          margin-top: 16px;
        }
      </style>
    </head>
    <body>
      <div class="email-shell">
        <div class="email-card">
          <div class="email-header">
            <div class="logo-area">
              <img src="${LOGO_URL}" alt="Structa" class="logo-img" />
            </div>
            <p>Structa</p>
          </div>
          <div class="email-body">
            ${content}
          </div>
          <div class="email-footer">
            <div class="footer-brand">Structa</div>
            <p class="footer-tagline">Empowering your content journey with AI-driven precision.</p>
            <div class="footer-links">
              <a href="#" class="footer-link">Privacy Policy</a>
              <a href="#" class="footer-link">Terms of Service</a>
              <a href="#" class="footer-link">Unsubscribe</a>
            </div>
            <div class="footer-copy">© 2026 Structa. All rights reserved.</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const getRegistrationEmailBody = (
  name: string,
  otp: number,
  verificationUrl: string,
): string => {
  const content = `
    <div class="email-h1">Verify your identity</div>
    <p class="email-p">Welcome aboard, ${name}! Use the one-time code below to complete your registration. This code is valid for <strong>5 minutes</strong>.</p>

    <div class="otp-block">
      <div class="otp-label">Your verification code</div>
      <div class="otp-code">${otp}</div>
      <div class="otp-expire">Expires in 5:00 &nbsp;·&nbsp; Do not share this code</div>
    </div>

    <div class="center">
      <a class="cta-btn" href="${verificationUrl}">Verify Email</a>
    </div>
    <div class="divider"></div>

    <div class="info-row">
      <p class="info-text">If you didn't request this code, you can safely ignore this email. Your account remains secure.</p>
    </div>
  `;
  return generateEmailLayout(content);
};

export const getForgotPasswordEmailBody = (
  otp: number,
  verificationUrl: string,
): string => {
  const content = `
    <div class="email-h1">Password recovery</div>
    <p class="email-p">We received a request to reset your password. Use the verification code below to proceed with the recovery.</p>

    <div class="otp-block">
      <div class="otp-label">Your recovery code</div>
      <div class="otp-code">${otp}</div>
      <div class="otp-expire">Expires in 5:00 &nbsp;·&nbsp; Do not share this code</div>
    </div>

    <div class="center">
      <a class="cta-btn" href="${verificationUrl}">Verify Email</a>
    </div>
    
    <div class="divider"></div>

    <div class="info-row">
      <p class="info-text">If you didn't request this, your password will remain unchanged. You can safely ignore this message.</p>
    </div>
  `;
  return generateEmailLayout(content);
};

export const getResetPasswordEmailBody = (): string => {
  const content = `
    <div class="email-h1">Security updated</div>
    <p class="email-p">Your password has been successfully reset. You can now access your account with your new credentials.</p>

    <div class="center">
      <a class="cta-btn" href="${process.env.FRONTEND_BASE_URL}/login">Sign in to Dashboard →</a>
    </div>

    <div class="divider"></div>

    <div class="info-row" style="background: rgba(20,20,19,0.04);">
      <p class="info-text" style="color: #141413;"><strong>Security Note:</strong> If you did not perform this action, please contact our security team immediately to lock your account.</p>
    </div>
  `;
  return generateEmailLayout(content);
};

export default {
  getRegistrationEmailBody,
  getForgotPasswordEmailBody,
  getResetPasswordEmailBody,
};
