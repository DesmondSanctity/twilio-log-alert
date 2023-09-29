import { HTTPHeaders } from "../constants/constants.js";
import redactLogData from "./redactedData.js";

const formatHTTPLoggerResponse = (req, res, responseBody, requestStartTime) => {
  let requestDuration = ".";
  const formattedBody = JSON.parse(responseBody)

  if (requestStartTime) {
    const endTime = Date.now() - requestStartTime;
    requestDuration = `${endTime / 1000}s`; // ms to s
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
