# Informifier

**An event aggregation SaaS that turns events from your application into real-time Discord notifications.**

Informifier lets SaaS developers send application events to a central API and receive notifications on Discord. It combines a project dashboard, named event types, an API key, Discord direct-message delivery, and an event log. WhatsApp and Telegram are planned notification channels.

## Why this project exists

A new signup, a completed background job, or an application error can matter immediately, even when nobody is watching the application's dashboard. Adding notifications independently to every project also means repeatedly building delivery code and a place to inspect what happened.

Informifier was built to centralise that workflow: an application pings the Informifier API when an event happens, and Informifier handles notification delivery and event history. Developers can organise multiple applications into projects and keep related events together instead of implementing a separate notification system for each application.

For example, a SaaS backend can report a signup, payment event, completed job, or error through the same API. The recipient receives a Discord message, and the occurrence is recorded under the relevant project and event.

## Development results

| Metric | Reported result |
| --- | --- |
| Concurrent requests handled | 15+ |
| Notification delivery time | Under 2 seconds |

These results were reported by the author from development testing. The repository does not include a reproducible benchmark harness or the test environment details; they are observed results rather than a delivery SLA.

## Notification channels

| Channel | Status in this MVP |
| --- | --- |
| Discord | Implemented |
| WhatsApp | Planned |
| Telegram | Planned |

The current repository uses Next.js API routes and MongoDB for event processing. It does not include a separate Express.js service or an email-delivery integration.

## What is implemented

- **Project organisation:** create projects with names and descriptions.
- **Event definitions:** group occurrences under named events with descriptions, service metadata, and colours.
- **Account API keys:** generate and retrieve a key through authenticated account endpoints.
- **Discord notifications:** send a direct message to a supplied Discord user ID.
- **Event history:** store the message, recipient ID, and timestamp under the matching event.
- **Management interface:** inspect projects, event details, and integration examples.
- **Usage accounting:** increment the account's usage counter after successful Discord delivery.
- **Authentication:** Clerk sessions for the application and API-key authentication for event ingestion.

The implemented notification provider is **Discord**. Service fields and navigation items should not be read as evidence of additional working integrations, billing, or subscription enforcement.

## How it works

1. Sign in and create a project.
2. Define an event within that project.
3. Generate an API key from the account screen.
4. Send the event identifiers, recipient ID, and message to `POST /api/v1/newEvent`.
5. Informifier checks the API key, sends the Discord DM, increments usage, and records the occurrence.

MongoDB stores accounts and projects. Event definitions and occurrence histories are embedded in project documents. Clerk supplies the account identity; Discord.js handles message delivery.

## Stack

| Layer | Technology |
| --- | --- |
| Application | Next.js 15.3.2, React 19, TypeScript |
| Styling and interface | Tailwind CSS 4, Framer Motion, Lucide |
| Authentication | Clerk |
| Persistence | MongoDB and Mongoose |
| Notifications | Discord.js |
| Dashboard visualisation | Recharts |

## Run locally

You need Node.js and npm, a reachable MongoDB instance, a Clerk application, and a Discord bot. The Discord recipient must be reachable by the bot and allow the DM.

```bash
git clone https://github.com/zaidajani/Informifier_MVP.git
cd Informifier_MVP
npm ci
```

Create `.env.local` in the repository root:

```dotenv
MONGODB_URI=mongodb://localhost:27017
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DISCORD_BOT_TOKEN=your_discord_bot_token
```

The connection helper selects the database name `Informier` explicitly. Configure Clerk's sign-in and sign-up routing to match `/auth/login` and `/auth/register`.

```bash
npm run dev
```

Open [localhost:3000/dashboard](http://localhost:3000/dashboard). Project creation is at `/create`, project management at `/manage`, and API-key management at `/account`.

## Send an event

Replace every placeholder with values from your own account, project, event, and Discord recipient. Call this endpoint from a backend so the account API key remains private.

```bash
curl --request POST http://localhost:3000/api/v1/newEvent \
  --header 'Content-Type: application/json' \
  --data '{
    "apikey": "YOUR_ACCOUNT_API_KEY",
    "projectId": "YOUR_PROJECT_ID",
    "eventId": "YOUR_EVENT_ID",
    "discordUserId": "RECIPIENT_DISCORD_USER_ID",
    "message": "A background job finished successfully."
  }'
```

All five fields are required. A successful response has `success: true` and the updated project.

| Status | Meaning |
| --- | --- |
| 200 | Message sent and occurrence recorded |
| 400 | A required field is missing |
| 401 | Invalid API key |
| 404 | Matching project or event was not found |
| 500 | Discord delivery or server processing failed |

**Current delivery behaviour:** the ingestion route sends the DM before validating the project/event match and saving the occurrence. A 404 or later storage failure can therefore occur after a message has already been sent. Retrying is not idempotent and may send a duplicate.

## Repository guide

| Path | Purpose |
| --- | --- |
| `app/dashboard/` | Dashboard interface |
| `app/create/`, `app/manage/` | Project and event management |
| `app/account/` | Account interface and API key |
| `app/api/v1/newEvent/` | External event ingestion |
| `app/api/projects/`, `app/api/alerts/` | Project, event, and occurrence endpoints |
| `discord/discord.ts` | Bot connection and DM delivery |
| `lib/modals/` | Mongoose account and project models |
| `lib/db.ts` | MongoDB connection |

## Commands and current scope

`npm run build` builds the app; `npm start` runs the production build. The repository's `lint` script invokes `next lint`; check that command against the installed Next.js version before treating it as a working validation step.

This is an MVP with some placeholder account controls and dashboard content. It does not implement a durable notification queue, delivery retries, idempotency, or a complete paid-plan workflow. The Discord client maintains a gateway connection, so hosting must accommodate that connection lifecycle. Local setup instructions describe the code's requirements; they are not a claim that a fresh deployment has been tested.

## Author and licence

Built by [Zaid Ajani](https://github.com/zaidajani).

No licence file is present in this repository. Public source visibility does not itself grant an open-source licence.
