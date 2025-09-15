import { parse } from "csv-parse/sync";
import { NextRequest, NextResponse } from "next/server";
import buyersModel from "../../models/buyers.model";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "CSV file is required",
        },
        { status: 400 }
      );
    }
    const text = await file.text();

    const records = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    if (records.length > 200) {
      return NextResponse.json(
        {
          success: false,
          message: "Max 200 rows allowed",
        },
        { status: 400 }
      );
    }

    const errors: { row: number; message: string }[] = [];
    const validRows: any[] = [];

    records.forEach((row: any, idx: number) => {
      const parsed = buyersModel.safeParse(row);

      if (!parsed.success) {
        errors.push({
          row: idx + 2,
          message: parsed.error.errors.map((e) => e.message).join(","),
        });
      } else {
        validRows.push(row);
      }
    });

    if (validRows.length === 0) {
      return NextResponse.json({ errors, inserted: 0 });
    }

    await prisma.buyers.createMany({
      data: validRows,
      skipDuplicates: true,
    });

    return NextResponse.json({
      message: "CSV processed successfully",
      inserted: validRows.length,
      errors,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
