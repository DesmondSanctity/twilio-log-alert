import twilio from "twilio";
import { accountSid, authToken } from "../../config/index.js";

// Initialize Twilio client with your credentials
const twilioClient = new twilio(accountSid, authToken);

// A formatted message to send to the user
const formatErrorAlert = async ({
  errorDescription,
  affectedEndpoint,
  startTime,
  duration,
  details,
  alertType,
  method,
}) => {
  return `
    *${alertType == "Critical" ? `⛔ Alert Type ` : `🚫 Alert Type: `}${alertType}*\n
    ⚠️ Error Description: ${errorDescription}\n
    🌐 Affected Endpoint: ${affectedEndpoint}\n
    🔗 HTTP Method: ${method}\n
    🕒 Start Time: ${startTime}\n
    ⌛ Duration: ${duration}\n
    📝 Details: ${JSON.stringify(details)}\n
    `;
};

export const calculateHealthRatings = async (stats) => {
  const healthRatings = {};
  for (const endpoint in stats) {
    const { calls, successful, failed } = stats[endpoint];
    const successRate = (successful / calls) * 100;
    const health = successRate >= 90 ? "Healthy" : "Unhealthy";
    healthRatings[endpoint] = { health, successRate };
  }
  return healthRatings;
};

export const createLogSummary = async (stats, ratings) => {
  let summary = "Daily Log Summary:\n\n";
  for (const endpoint in stats) {
    const { calls, successful, failed } = stats[endpoint];
    const { health, successRate } = ratings[endpoint];
    summary += `${endpoint}:\n`;
    summary += `  - Total Calls: ${calls}\n`;
    summary += `  - Successful Calls: ${successful}\n`;
    summary += `  - Failed Calls: ${failed}\n`;
    summary += `  - Health Rating: ${health} (${successRate.toFixed(
      2
    )}% success rate)\n\n`;
  }
  return summary;
};

export const sendWhatsAppAlert = async (messageParams) => {
  const message = await formatErrorAlert(messageParams);
  try {
    await twilioClient.messages.create({
      body: `New Incident Alert:\n ${message}`,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+2349059391242",
    });
    console.log(`WhatsApp Alert sent successfully.`);
  } catch (error) {
    console.error(`WhatsApp Alert error: ${error.message}`);
  }
};
