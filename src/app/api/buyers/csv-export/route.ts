import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const filterQuery = await req.json();
    let data;
    if (filterQuery.length === 0) {
      data = await prisma.buyers.findMany();
    } else {
      data = await prisma.buyers.findMany({
        where: {
          OR: filterQuery,
        },
      });
    }

    const headers = Object.keys(data[0]);
    const rows = data?.map((row: any) =>
      headers
        .map((field) => {
          let value = row[field] ?? "";
          value = String(value).replace(/"/g, '""'); // escape quotes
          return `"${value}"`;
        })
        .join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="buyers_dataset.csv"',
      },
    });
  } catch (error) {}
}
