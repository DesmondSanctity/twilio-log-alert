import formatHTTPLoggerResponse from "./formatLog.js";
import { HTTPMethods, SuccessMessages } from "../constants/constants.js";
import { httpLogger } from "../../middlewares/logger.js";

export const responseInterceptor = (req, res, next) => {
  // used to calculate time between request and the response
  const requestStartTime = Date.now();
  // Save the original response method
  const originalSend = res.send;

  let responseSent = false;

  // Override the response method
  res.send = function (body) {
    if (!responseSent) {
      if (res.statusCode < 400) {
        httpLogger.info(
          getResponseMessage(req.method),
          formatHTTPLoggerResponse(req, res, body, requestStartTime)
        );
      } else {
        httpLogger.error(
          body.message,
          formatHTTPLoggerResponse(req, res, body, requestStartTime)
        );
      }

      responseSent = true;
    }

    // Call the original response method
    return originalSend.call(this, body);
  };

  // Continue processing the request
  next();
};

function getResponseMessage(responseMethod) {
  switch (responseMethod) {
    case HTTPMethods.POST:
      return SuccessMessages.CreateSuccess;
    case HTTPMethods.GET:
      return SuccessMessages.GetSuccess;
    case HTTPMethods.PUT || HTTPMethods.PATCH:
      return SuccessMessages.UpdateSuccess;
    case HTTPMethods.DELETE:
      return SuccessMessages.DeleteSuccess;
    default:
      return SuccessMessages.GenericSuccess;
  }
}
