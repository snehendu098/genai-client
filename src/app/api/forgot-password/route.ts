import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { otp, email, password } = await req.json();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json({ success: false, message: "No user exists" });
    }

    if (user.forgotPasswordCode && user.forgotPasswordCodeExpiry) {
      const isCodeCorrect = user.forgotPasswordCode === otp;
      const isCodeNotExpired =
        new Date(user.forgotPasswordCodeExpiry) > new Date();

      if (isCodeCorrect || isCodeNotExpired) {
        const hashedPass = await bcrypt.hash(password, 10);
        user.password = hashedPass;

        if (!user.isVerified) {
          user.isVerified = true;
        }

        await user.save();
      } else {
        return Response.json({
          succes: false,
          message: "Error verifying code",
        });
      }
    } else {
      return Response.json({
        success: false,
        message: "Please request for a new code",
      });
    }
  } catch (err) {
    console.log("Error while verifying", err);
    return Response.json({
      success: false,
      message: "Error while verification of password",
    });
  }
}
