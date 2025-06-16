import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connect from "@/lib/db";
import Project from "@/lib/modals/project";

// POST: Add a new event occurrence
export const POST = async (req: NextRequest) => {
  const { userId: authUserId } = await auth();

  if (!authUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connect();

    const body = await req.json();
    const { projectId, eventId } = body;

    if (!projectId || !eventId) {
      return NextResponse.json({ error: "Missing projectId or eventId" }, { status: 400 });
    }

    const updatedProject = await Project.findOneAndUpdate(
      {
        _id: projectId,
        userId: authUserId,
        "events._id": eventId,
      },
      {
        $push: {
          "events.$.eventOccurred": {
            eventId,
            timestamp: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ error: "Project or event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: updatedProject }, { status: 200 });
  } catch (err) {
    console.error("Error adding event occurrence:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};

// GET: Fetch all eventOccurred entries for a specific event
export const GET = async (req: NextRequest) => {
  const { userId: authUserId } = await auth();

  if (!authUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const eventId = searchParams.get("eventId");

    if (!projectId || !eventId) {
      return NextResponse.json({ error: "Missing projectId or eventId" }, { status: 400 });
    }

    const project = await Project.findOne(
      { _id: projectId, userId: authUserId },
      { events: 1 }
    );

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const event = project.events.id(eventId);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, eventOccurred: event.eventOccurred },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching event occurrences:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
