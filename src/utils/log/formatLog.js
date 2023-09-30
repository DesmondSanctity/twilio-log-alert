import { sendWhatsAppAlert } from "../alert/alertFunctions.js";
import { HTTPHeaders } from "../constants/constants.js";
import redactLogData from "./redactedData.js";

const formatHTTPLoggerResponse = (req, res, responseBody, requestStartTime) => {
  let requestDuration = "";
  let startTime = "";
  const formattedBody = JSON.parse(responseBody);
  const textBody = {
    request: {
      host: req.headers.host,
      url: req.url,
      body: (req.body && redactLogData(req.body)) || {},
      params: req?.params,
      query: req?.query,
      clientIp:
        req?.headers[HTTPHeaders.ForwardedFor] ?? req?.socket.remoteAddress,
    },
    response: {
      statusCode: res.statusCode,
      requestDuration,
      body: redactLogData(formattedBody),
    },
  }

  if (requestStartTime) {
    const endTime = Date.now() - requestStartTime;
    requestDuration = `${endTime / 1000}s`; // ms to seconds
    // Create a Date object from the timestamp
    const date = new Date(requestStartTime);
    // Format the date into a human-readable string
    startTime = date.toLocaleString();
  }

  // message param for twilio alert
  const messageParams = {
    errorDescription: formattedBody?.message,
    affectedEndpoint: req.baseUrl,
    startTime: startTime,
    duration: requestDuration,
    details: redactLogData(textBody),
    alertType: res.statusCode >= 500 ? "Critical" : "Error",
    method: req.method,
  };

  if (res.statusCode >= 400 && res.statusCode < 500) {
    sendWhatsAppAlert(messageParams);
  }
  if (res.statusCode >= 500) {
    sendWhatsAppAlert(messageParams);
  }
  return {
    request: {
      headers: (req.headers && redactLogData(req.headers)) || {},
      host: req.headers.host,
      baseUrl: req.baseUrl,
      url: req.url,
      method: req.method,
      body: (req.body && redactLogData(req.body)) || {},
      params: req?.params,
      query: req?.query,
      clientIp:
        req?.headers[HTTPHeaders.ForwardedFor] ?? req?.socket.remoteAddress,
    },
    response: {
      headers: res.getHeaders(),
      statusCode: res.statusCode,
      requestDuration,
      body: redactLogData(formattedBody),
    },
  };
};

export default formatHTTPLoggerResponse;
