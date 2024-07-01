import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  verifyCode: string,
): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Please Verifiy Your Account",
      react: VerificationEmail({ email, otp: verifyCode }),
    });

    if (error) {
      console.log(error);
      return { success: false, message: "Verification Email Couldn't be sent" };
    }

    return {
      success: true,
      message: "Verification email sent successfully",
      data,
    };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
