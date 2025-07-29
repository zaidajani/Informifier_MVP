import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connect from "@/lib/db";
import Project from "@/lib/modals/project";

// Event type with full structure
interface Event {
  eventOccurred?: {
    eventId: string;
    discordUserId: string;
    message: string;
    timestamp: Date;
  }[];
}

interface ProjectWithEvents {
  events: Event[];
}

export const GET = async (
  _req: NextRequest,
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

    const rawProjects = await Project.find(
      { userId: authUserId },
      { events: 1, _id: 0 }
    ).lean();

    const projects = rawProjects as unknown as ProjectWithEvents[];

    const allEventOccurred = projects
      .flatMap(project =>
        project.events.flatMap(event => event.eventOccurred || [])
      );

    return NextResponse.json({ success: true, eventOccurred: allEventOccurred }, { status: 200 });
  } catch (err) {
    console.error("Error fetching events:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
