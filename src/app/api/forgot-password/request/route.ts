import { sendForgotPasswordEmail } from "@/helpers/send-verification-email";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email } = await req.json();

    // check if user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json({ success: false, message: "No user exists" });
    }

    // generate vrification code and expiry
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date(Date.now() + 3600000);

    // save the user
    user.forgotPasswordCode = verifyCode;
    user.forgotPasswordCodeExpiry = expiryDate;
    await user.save();

    // send email
    const emailResponse = await sendForgotPasswordEmail(email, verifyCode);

    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 500 },
      );
    }

    return Response.json(
      { success: true, message: "A code has been sent to your email" },
      { status: 201 },
    );
  } catch (err) {
    console.log("Couldn't send mail", err);
    return Response.json({ success: false, message: "Couldn't send mail" });
  }
}
