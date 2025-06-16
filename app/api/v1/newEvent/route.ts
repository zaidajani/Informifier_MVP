import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Project from "@/lib/modals/project";
import { sendDiscordDM } from "@/discord/discord"; 

export const POST = async (req: NextRequest) => {
  try {
    await connect();

    const body = await req.json();
    const { apikey, projectId, eventId, discordUserId, message } = body;

    if (!apikey || !projectId || !eventId || !discordUserId || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ apikey });

    if (!user) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    // ✅ Send Discord DM
    const dmResult = await sendDiscordDM(discordUserId, message);
    if (!dmResult.success) {
      return NextResponse.json(
        { error: "Failed to send DM", details: dmResult.error },
        { status: 500 }
      );
    }

    // ✅ Increment usage
    user.usages = (user.usages || 0) + 1;
    await user.save();

    // ✅ Push to eventOccurred array
    const updatedProject = await Project.findOneAndUpdate(
      {
        _id: projectId,
        userId: user.clerkUserId,
        "events._id": eventId, 
      },
      {
        $push: {
          "events.$.eventOccurred": {
            eventId,
            discordUserId,
            message,
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
