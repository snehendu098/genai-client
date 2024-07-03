import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: Request) {
  await dbConnect();
  try {
    // email, otp
    const { email, otp } = await req.json();
    // check document if exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json(
        { success: false, message: "No user found with the following email" },
        { status: 400 },
      );
    }

    // check is the verifycode has expired
    const isCorrectCode = user.verifyCode === otp;
    //    if (!isCorrectCode) {
    //        return Response.json({success: false, message: "Wrong verification code"})
    //    }

    const isCodeNotExpired = new Date(user?.verifyCodeExpiry) > new Date();

    // save if successful verification
    if (isCorrectCode && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        { success: true, message: "You have been successfully verified" },
        { status: 201 },
      );
    } else {
      return Response.json(
        { success: false, message: "An error occurred" },
        { status: 400 },
      );
    }
  } catch (err) {
    console.log("Error Occurred", err);
    return Response.json(
      { success: false, message: "Error occurred while verification" },
      { status: 500 },
    );
  }
}
