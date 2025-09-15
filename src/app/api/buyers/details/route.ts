import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const buyer = await prisma.buyers.findUnique({
      where: { id },
    });

    if (!buyer) {
      return NextResponse.json(
        {
          success: false,
          message: "Buyer not found",
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Buyer details fetched successfully.",
        buyerDetails: buyer,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 404 }
    );
  }
}
