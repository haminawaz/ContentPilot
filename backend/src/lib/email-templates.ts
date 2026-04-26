const generateEmailLayout = (content: string): string => {
  const LOGO_URL = `${process.env.FRONTEND_BASE_URL}/logo.png`;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>ContentPilot</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Sofia+Sans:wght@400;500;700&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Sofia Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: #F3F0EE;
          -webkit-font-smoothing: antialiased;
        }
        
        table {
          border-spacing: 0;
        }
        
        img {
          border: 0;
        }
        
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.08);
        }
        
        .header {
          padding: 60px 40px 30px 40px;
          text-align: center;
        }
        
        .content {
          padding: 0 60px 60px 60px;
          color: #141413;
          line-height: 1.6;
        }
        
        .footer {
          background-color: #141413;
          padding: 60px 40px;
          text-align: center;
          color: #FFFFFF;
        }
        
        .button {
          display: inline-block;
          padding: 12px 32px;
          background-color: #141413;
          color: #F3F0EE;
          text-decoration: none;
          border-radius: 20px;
          font-weight: 500;
          font-size: 16px;
        }
        
        .otp-box {
          display: inline-block;
          padding: 20px 40px;
          background-color: #CF4500;
          color: #FFFFFF;
          border-radius: 24px;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 8px;
          margin: 24px 0;
          font-family: monospace;
        }
      </style>
    </head>
    <body>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F3F0EE; padding: 40px 0;">
        <tr>
          <td align="center">
            <div class="container">
              <div class="header">
                <img 
                  src="${LOGO_URL}" 
                  alt="ContentPilot" 
                  width="200"
                  style="display: block; margin: 0 auto; max-width: 100%; height: auto;" 
                />
              </div>
              <div class="content">
                ${content}
              </div>
              <div class="footer">
                <p style="margin: 0 0 16px 0; font-size: 14px; opacity: 0.8; font-weight: 400;">
                  &copy; 2026 ContentPilot. All rights reserved.
                </p>
                <p style="margin: 0; font-size: 12px; opacity: 0.6; line-height: 1.6;">
                  Empowering your content journey with AI-driven precision.
                </p>
                <div style="margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 32px;">
                  <a href="#" style="color: #FFFFFF; text-decoration: none; font-size: 12px; opacity: 0.6; margin: 0 12px;">Privacy Policy</a>
                  <a href="#" style="color: #FFFFFF; text-decoration: none; font-size: 12px; opacity: 0.6; margin: 0 12px;">Terms of Service</a>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

export const getRegistrationEmailBody = (name: string, otp: number): string => {
  const content = `
    <h2 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 600; color: #141413; text-align: center;">
      Welcome to the future of content, ${name}!
    </h2>
    <p style="margin: 0 0 32px 0; font-size: 16px; color: #141413; text-align: center; opacity: 0.8;">
      We're excited to have you join ContentPilot. To get started, please verify your email address using the code below.
    </p>
    
    <div style="text-align: center;">
      <div class="otp-box">
        ${otp}
      </div>
    </div>
    
    <p style="margin: 32px 0 0 0; font-size: 14px; color: #696969; text-align: center;">
      This verification code will expire in 5 minutes.
    </p>
  `;
  return generateEmailLayout(content);
};

export const getForgotPasswordEmailBody = (otp: number): string => {
  const content = `
    <h2 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 600; color: #141413; text-align: center;">
      Password Reset Request
    </h2>
    <p style="margin: 0 0 32px 0; font-size: 16px; color: #141413; text-align: center; opacity: 0.8;">
      We received a request to reset your password. Use the verification code below to proceed with the reset.
    </p>
    
    <div style="text-align: center;">
      <div class="otp-box">
        ${otp}
      </div>
    </div>
    
    <p style="margin: 32px 0 0 0; font-size: 14px; color: #696969; text-align: center;">
      If you didn't request this, you can safely ignore this email. This code expires in 5 minutes.
    </p>
  `;
  return generateEmailLayout(content);
};

export const getResetPasswordEmailBody = (): string => {
  const content = `
    <div style="text-align: center; margin-bottom: 40px;">
      <div style="width: 80px; height: 80px; background-color: #F3F0EE; border: 2px solid #141413; border-radius: 50%; margin: 0 auto; line-height: 80px; text-align: center;">
        <span style="font-size: 32px; color: #141413;">✓</span>
      </div>
    </div>
    
    <h2 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 600; color: #141413; text-align: center;">
      Password Updated
    </h2>
    <p style="margin: 0 0 40px 0; font-size: 16px; color: #141413; text-align: center; opacity: 0.8;">
      Your password has been successfully updated. Your account is now secure and ready to use.
    </p>
    
    <div style="text-align: center;">
      <a href="${process.env.FRONTEND_BASE_URL}/login" class="button">
        Go to Login
      </a>
    </div>
    
    <div style="margin-top: 48px; padding: 24px; background-color: #FCFBFA; border-radius: 20px; text-align: center;">
      <p style="margin: 0; font-size: 13px; color: #696969;">
        <strong>Security Note:</strong> If you did not perform this action, please contact our support team immediately.
      </p>
    </div>
  `;
  return generateEmailLayout(content);
};

export default {
  getRegistrationEmailBody,
  getForgotPasswordEmailBody,
  getResetPasswordEmailBody,
};
