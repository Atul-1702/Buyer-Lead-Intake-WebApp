import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "./../models/user-model";
import buyersModel from "../models/buyers.model";
import buyerHistoryModel from "../models/buyer-history.model";
import z, { success } from "zod";

export async function POST(req: NextRequest) {
  try {
    const token = await req.headers.get("authorization")?.split(" ")[1];
    if (token !== undefined) {
      const dealerUser = jwt.verify(token, String(process.env.SECRET_KEY));

      if (!dealerUser) {
        return NextResponse.json(
          {
            success: false,
            message: "Session expired. Please login again.",
          },
          { status: 401 }
        );
      }

      const buyersData = await req.json();
      buyersData.ownerId = dealerUser?.id;

      buyersModel.parse(buyersData);

      const buyerDB = await prisma.buyers.create({
        data: buyersData,
      });

      const history = {
        buyerId: buyerDB.id,
        changedBy: buyerDB.ownerId,
        changedAt: buyerDB.updatedAt,
        diff: { old: {}, new: { ...buyerDB } },
      };

      buyerHistoryModel.parse(history);

      const buyer_history_db = await prisma.buyer_History.create({
        data: history,
      });

      return NextResponse.json({
        success: true,
        message: "Buyer record created successfully.",
      });
    }
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


export async function PUT(req:NextRequest){
   
     try{
        const {id,buyersData} = await req.json();

        await prisma.buyers.update({
          where : {id},
          data : buyersData
        })

        return NextResponse.json({
          message:"Record updated successfully.",
          success : true,
        },{status : 200});
     }
     catch(error){
       return NextResponse.json({
         message : "Record updation falied.",
         success : false
       },{status : 404})
     }
}