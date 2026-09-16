import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, projectIdea, timeline, budget, honeypot } = body;

    // 1. Anti-spam Honeypot Trap (If bot fills hidden field, silently exit)
    if (honeypot && honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, leadId: "PB-BOT-FILTERED" });
    }

    // 2. Strict Input Validation
    const cleanEmail = email ? String(email).trim() : "";
    const cleanPitch = projectIdea ? String(projectIdea).trim() : "";
    const cleanTimeline = timeline ? String(timeline).trim() : "5-7 Days";
    const cleanBudget = budget ? String(budget).trim() : "Standard MVP";

    if (!cleanEmail || cleanEmail.length < 3) {
      return NextResponse.json(
        { error: "Please enter a valid email address or Telegram handle." },
        { status: 400 }
      );
    }

    if (!cleanPitch || cleanPitch.length < 10) {
      return NextResponse.json(
        { error: "Please provide a brief description of your project (at least 10 characters)." },
        { status: 400 }
      );
    }

    // Generate unique Lead ID and timestamp
    const timestamp = new Date().toISOString();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const leadId = `PB-${Date.now().toString().slice(-4)}${randomSuffix}`;

    const leadRecord = {
      leadId,
      timestamp,
      contact: cleanEmail,
      pitch: cleanPitch,
      timeline: cleanTimeline,
      budget: cleanBudget,
    };

    // 3. Persistent Local File Backup (Never lose a lead)
    try {
      const dataDir = path.join(process.cwd(), "data");
      await fs.mkdir(dataDir, { recursive: true });
      const filePath = path.join(dataDir, "leads.json");

      let existingLeads: any[] = [];
      try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        existingLeads = JSON.parse(fileContent);
      } catch {
        existingLeads = [];
      }

      existingLeads.unshift(leadRecord);
      await fs.writeFile(filePath, JSON.stringify(existingLeads, null, 2), "utf-8");
    } catch (fsErr) {
      console.warn("Could not write lead to local disk leads.json:", fsErr);
    }

    // 4. Server Console Log Output
    console.log("\n=======================================================");
    console.log(`🚀 [NEW FOUNDER LEAD] - ID: ${leadId}`);
    console.log(`⏰ Time: ${timestamp}`);
    console.log(`👤 Contact: ${cleanEmail}`);
    console.log(`⏱️ Timeline: ${cleanTimeline} | 💰 Budget: ${cleanBudget}`);
    console.log(`💡 Pitch: ${cleanPitch}`);
    console.log("=======================================================\n");

    // 5. Telegram Bot Notification (If configured in .env.local)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    if (telegramToken && telegramChatId) {
      try {
        const messageText = `🚀 *New PulseBrief Lead [${leadId}]*\n\n👤 *Contact:* \`${cleanEmail}\`\n⏱️ *Timeline:* ${cleanTimeline}\n💰 *Budget:* ${cleanBudget}\n\n💡 *Pitch:*\n${cleanPitch}\n\n⏰ _${timestamp}_`;
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: messageText,
            parse_mode: "Markdown",
          }),
        });
      } catch (tgErr) {
        console.warn("Telegram notification dispatch failed:", tgErr);
      }
    }

    // 6. Discord Webhook Notification (If configured in .env.local)
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhook) {
      try {
        await fetch(discordWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "PulseBrief Lead Alert",
            avatar_url: "https://pulsebrief-ai.vercel.app/pulsebrief-logo.png",
            embeds: [
              {
                title: `🚀 New Founder MVP Lead • ${leadId}`,
                description: `A new founder has requested a 5–7 day MVP scoping proposal.`,
                color: 0x06b6d4, // Cyan Accent
                fields: [
                  { name: "👤 Contact (Email/TG)", value: `\`${cleanEmail}\``, inline: true },
                  { name: "⏱️ Timeline", value: cleanTimeline, inline: true },
                  { name: "💰 Target Budget", value: cleanBudget, inline: true },
                  { name: "💡 Project Concept & Pitch", value: `\`\`\`${cleanPitch}\`\`\``, inline: false },
                ],
                footer: {
                  text: `PulseBrief AI Lead Engine • Ref: ${leadId}`,
                },
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
        console.log(`✅ Dispatched lead alert to Discord Webhook for ${cleanEmail}`);
      } catch (dcErr) {
        console.warn("Discord webhook dispatch failed:", dcErr);
      }
    }

    return NextResponse.json({
      success: true,
      leadId,
      message: "Lead recorded successfully",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
