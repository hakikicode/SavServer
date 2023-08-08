/**
 * authConstant.js
 * @description :: constants used in authentication
 */

const JWT = {
  DEVICE_SECRET:'myjwtdevicesecret',
  CLIENT_SECRET:'myjwtclientsecret',
  EXPIRES_IN: 10000
};

const USER_TYPES = { User:1, };

const PLATFORM = {
  DEVICE:1,
  CLIENT:2,
};

let LOGIN_ACCESS = { [USER_TYPES.User]:[PLATFORM.DEVICE,PLATFORM.CLIENT], };

const MAX_LOGIN_RETRY_LIMIT = 3;
const LOGIN_REACTIVE_TIME = 20;   

const SEND_LOGIN_OTP = { SMS:1, };
const DEFAULT_SEND_LOGIN_OTP = SEND_LOGIN_OTP.SMS;

const FORGOT_PASSWORD_WITH = {
  LINK: {
    sms: true,
    email: true
  },
  EXPIRE_TIME: 5
};

module.exports = {
  JWT,
  USER_TYPES,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  SEND_LOGIN_OTP,
  DEFAULT_SEND_LOGIN_OTP,
  FORGOT_PASSWORD_WITH,
  LOGIN_ACCESS,
};