import { NextRequest, NextResponse } from "next/server";
import UserModel from "../../models/user-model";
import { prisma } from "../../../../../lib/prisma";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    UserModel.parse(data);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    data.password = hash;
    const savedData = await prisma.user.create({
      data: {
        ...data,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "User created successfully.",
        details: savedData,
      },
      { status: 201, statusText: "User created successfully" }
    );
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

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            success: false,
            message: "User already exits with given email.",
          },
          { status: 409 }
        );
      }
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
