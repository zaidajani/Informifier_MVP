import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; // ✅ use the server version
import connect from "@/lib/db";
import Project from "@/lib/modals/project";

export const POST = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  const { userId: authUserId } = await auth(); // ✅ await this

  if (!authUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (authUserId !== params.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connect();

    const body = await req.json();
    const { projectName, description } = body;

    if (!projectName) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }

    console.log("Received body:", body);
    const newProject = await Project.create({ name: projectName, userId: authUserId, description });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (err) {
    console.error("Error creating project:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  const { userId: authUserId } = await auth(); // ✅ await here too

  if (!authUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (authUserId !== params.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connect();

    const projects = await Project.find({ userId: authUserId });

    return NextResponse.json({ success: true, projects }, { status: 200 });
  } catch (err) {
    console.error("Error fetching projects:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
