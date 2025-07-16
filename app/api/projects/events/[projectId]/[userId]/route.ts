import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import User from "@/lib/modals/user";
import connect from "@/lib/db";
import Project from "@/lib/modals/project";

// POST: Add an event to a project
export const POST = async (
  req: NextRequest,
  { params }: { params: { projectId: string; userId: string } }
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

    const body = await req.json();
    const { name, description, service, color } = body;

    if (!name || !description || !service || !color) {
      return NextResponse.json(
        { error: "Missing required event fields" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: params.projectId, userId: authUserId },
      {
        $push: {
          events: {
            name,
            description,
            service,
            color
          },
        },
      },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const user = await User.findOne({ clerkUserId: await params.userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.events = (user.events || 0) + 1;
    await user.save();

    return NextResponse.json({ success: true, project: updatedProject }, { status: 200 });
  } catch (err) {
    console.error("Error adding event:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};

// GET: Retrieve events for a project
export const GET = async (
  req: NextRequest,
  { params }: { params: { projectId: string; userId: string } }
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

    const project = await Project.findOne(
      { _id: params.projectId, userId: authUserId },
      { events: 1 } // Only fetch the events field
    );

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, events: project.events }, { status: 200 });
  } catch (err) {
    console.error("Error fetching events:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
