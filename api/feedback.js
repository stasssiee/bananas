export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }
  
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message" });
    }
  
    const webhook = process.env.DISCORD_WEBHOOK_URL;
  
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message })
      });
  
      if (!response.ok) throw new Error("Discord error");
  
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: "Failed to send feedback" });
    }
  }