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
    *${
      alertType == "Critical" ? `⛔ Alert Type ` : `🚫 Alert Type: `
    }${alertType}*\n
    ⚠️ Error Description: ${errorDescription}\n
    🌐 Affected Endpoint: ${affectedEndpoint}\n
    🔗 HTTP Method: ${method}\n
    🕒 Start Time: ${startTime}\n
    ⌛ Duration: ${duration}\n
    📝 Details: ${JSON.stringify(details)}\n
    `;
};

export const sendWhatsAppAlert = async (messageParams) => {
  const message = await formatErrorAlert(messageParams);
  try {
    await twilioClient.messages.create({
      body: `New Incident Alert:\n ${message}`,
      from: "whatsapp:<your Twilio WhatsApp number>",
      to: "whatsapp:<your own number>",
    });
    console.log(`WhatsApp Alert sent successfully.`);
  } catch (error) {
    console.error(`WhatsApp Alert error: ${error.message}`);
  }
};
