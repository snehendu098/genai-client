import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/send-verification-email";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, password } = await req.json();
    const existingVerifiedUser = await UserModel.findOne({
      email,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Your email is already verified, please login",
        },
        { status: 400 },
      );
    }

    const existingUser = await UserModel.findOne({ email, isVerified: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date(Date.now() + 3600000);

    if (existingUser) {
      existingUser.password = hashedPassword;
      existingUser.verifyCode = verifyCode;
      existingUser.verifyCodeExpiry = expiryDate;

      await existingUser.save();
    } else {
      const newUser = new UserModel({
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        docsGenerated: [],
      });

      await newUser.save();
    }

    // send verification email
    const emailResponse = await sendVerificationEmail(email, verifyCode);

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 },
      );
    }
    return Response.json(
      {
        success: true,
        message:
          "User created successfully, please check your email for verification code. It expires in 1 hour",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 },
    );
  }
}
