import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Fixed voice + language (English only)
const FIXED_VOICE = "verse";
const FIXED_LANG  = "en-US";

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.post("/session", (req, res) => {
  console.log(`🎤 Session started → Voice: ${FIXED_VOICE}, Lang: ${FIXED_LANG}`);
  res.json({
    client_secret: { value: process.env.OPENAI_API_KEY || "fake-token" },
    model: "gpt-4o-realtime-preview",
    voice: FIXED_VOICE,
    language: FIXED_LANG
  });
});

// Health check for uptime monitors / investor demos
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
