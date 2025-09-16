import { NextRequest, NextResponse } from "next/server";
import UserModel from "../../models/user-model";
import { prisma } from "../../../../../lib/prisma";
import { success, z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();
    UserModel.parse(userData);
    const savedData = await prisma.user.findUnique({
      where: { email: userData.email },
    });
    if (
      savedData === null ||
      !(await bcrypt.compare(userData.password, savedData.password))
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Login credentials are invalid.",
        },
        { status: 401 }
      );
    }

    const token = jwt.sign(savedData, String(process.env.SECRET_KEY), {
      expiresIn: 24 * 1000 * 60,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "User logged in successfully.",
        details: savedData,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: false,
      path: "/",
      maxAge: 24 * 60 * 60,
    });
    return response;
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          details: error.issues.map((issue) => {
            return {
              errorField: issue.path[0],
              message: issue.message,
            };
          }),
        },
        { status: 400 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid json body.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Some internal error occured.",
      },
      { status: 500 }
    );
  }
}
