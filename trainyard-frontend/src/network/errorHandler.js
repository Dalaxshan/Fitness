import { commonMessages } from "src/utils/constants";

// Function to handle all error messages
export const errorHandler = (error) => {
  let message = commonMessages.somethingWentWrong;
  // Check if response error
  if (error.response) {
    // Return Unauthorized if status is 401
    if (error.response.status === 401 && error.response.data.message === "Unauthorized") {
      message = commonMessages.unauthorized;
      return { message };
    } else if (error.response.status === 401 && error.response.data.message === "Session Expired") {
      message = commonMessages.sessionExpired;
      return { message };
    }

    message = error.response.data.message || error.response.statusText;
    // Check if request error
  } else if (error.request) {
    if (error.code === "ECONNABORTED") {
      message = commonMessages.timeout;
    } else {
      message = commonMessages.serverResponseLate;
    }
  }
  return { message };
};
