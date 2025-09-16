import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { success } from "zod";
import jwt from "jsonwebtoken";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));
  const city = searchParams.get("city");
  const timeline = searchParams.get("timeline");
  const propertyType = searchParams.get("propertyType");

  const ownerId = req.headers.get("x-owner-id");
  console.log(ownerId);
  if (
    !(city || timeline || propertyType) ||
    (city === "all" && timeline === "all" && propertyType === "all")
  ) {
    const allDBData = await prisma.buyers.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      take: limit,
      skip: (page - 1) * 10,
    });

    const totalRecords = await prisma.buyers.count();

    return NextResponse.json(
      {
        success: true,
        message: "Data filtered successfully.",
        details: allDBData,
        totalRecords,
        ownerId,
      },
      { status: 200 }
    );
  }

  const filterOptions: any = [];
  if (city && city !== "all") {
    filterOptions.push({ city });
  }
  if (timeline && timeline !== "all") {
    filterOptions.push({ timeline });
  }
  if (propertyType && propertyType !== "all") {
    filterOptions.push({ propertyType });
  }

  const queriedData = await prisma.buyers.findMany({
    where: {
      OR: filterOptions,
    },
    take: limit,
    skip: (page - 1) * limit,
  });

  const totalRecords = await prisma.buyers.count();

  return NextResponse.json({
    success: true,
    details: queriedData,
    totalRecords,
    ownerId,
  });
}
