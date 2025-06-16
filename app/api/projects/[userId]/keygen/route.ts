// /app/api/projects/[userId]/keygen/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connect from "@/lib/db";
import User from "@/lib/modals/user";
import { generateApiKey } from "@/lib/generateApiKey";

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const { userId: authUserId } = await auth();

  if (!authUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (authUserId !== params.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connect();

    const user = await User.findOne({ clerkUserId: authUserId });

    if (!user) {
      return NextResponse.json({ error: "API key not found" }, { status: 404 });
    }

    return NextResponse.json({ apiKey: user.apikey }, { status: 200 });
  } catch (err) {
    console.error("Error retrieving API key:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const { userId: authUserId } = await auth();

  if (!authUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (authUserId !== params.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connect();

    const existingUser = await User.findOne({ clerkUserId: authUserId });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const newApiKey = generateApiKey();

    const newUser = await User.create({
      clerkUserId: authUserId,
      apikey: newApiKey,
    });

    return NextResponse.json({ apiKey: newUser.apikey }, { status: 201 });
  } catch (err) {
    console.error("Error creating new user:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
