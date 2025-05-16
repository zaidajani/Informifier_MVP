// app/event/[userId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Project from "@/lib/modals/project";

export const POST = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    await connect(); // Connect to MongoDB

    const { userId } = params;
    const body = await req.json();
    const { projectName } = body;

    if (!projectName) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }

    const newProject = await Project.create({ name: projectName, userId });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (err) {
    console.error("Error creating project:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
