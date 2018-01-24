

export var GlobalConstants = {
  aemPrePackageBasePath : "assets/aemContent/www-aem/content/penfed-mobile/en/asset/data/" ,
  aemContentSyncBasePath : "/www-aem/content/penfed-mobile/en/asset/data/",


  platformIOSBasePath : "../www/",
  platformAndriodBasePath : ""

};


export var ErrorMessages = {
  SUCCESS:'SUCCESS',
  ALERT:'Alert',
  SORRY:"We're sorry.",
  POPUP_TTILE : "We're sorry.",
  POPUP_TTILE_CONFIRM : "Confirm",
  MESSAGE: 'Message',
  NOTIFICATION: 'Notifications',
  COMMON_ERROR_MESSAGE: "There was an unkown error while processing your request.Please try again and contact PenFed if the problem persists.",
  ENV_DOWN_MESSAGE: "There was an unknown error while processing your request. Please try again and contact PenFed if the problem persists.",
  MAINTENANCE_MESSAGE: "The PenFed Mobile Banking Application is currently undergoing system maintenance. We appreciate your patience and look forward to serving you.",
  NOT_LISTED_USER: "This is not a PenFed username. Please re-enter.",
  NETWORK_ERROR: "You are not connected to the internet. Please connect and try your request again.",
  BUTTON_OK: "OK",
  BUTTON_CANCEL: "Cancel",
  BUTTON_CONTINUE: "Continue",
  BUTTON_DISABLE: "Disable",
  BUTTON_DELETE: "Delete",
  BUTTON_TRY_AGAIN: "Try again",
  INVVALID_USER_PASSWORD: "<div>The username and password you have entered do not match.</div><div>Please try again.</div>",
  INCORRECT_USERNAME : "Incorrect Username",
  INCORRECT_USERNAME_MSG : "The username you entered does not exist in our records. Please try again or call Member Service for assistance at 800-247-5626.",
  UNLOCK_PHONE_NUM : "800-247-5626",
  TRY_AGAIN:  "Try Again",
  CALL: "Call",
  STAY_LOGGED_ON: 'Stay Logged On',
  STAY_LOGGED_ON_MSG: 'Stay Logged On allows you to quickly pick up where you left off if you get a call or open another app. If you do not relaunch the application within 10 minutes you will be automatically logged off. If this is a shared device, or if you have reservations about Multitasking, you can turn off this feature.',
  NOTIFICATION_ON_MSG: 'When you set your Notifications to "on", we can notify you when certain account conditions occur - even when you are not running the PedFed app.',
  EMAIL_ADDRESS_NO_CHANGE: 'No Change',
  EMAIL_ADDRESS_NO_CHANGE_MSG: "Your did not do any change on your Email address.",
  ATLEAST_ONE_PHONE_NUM: 'Please enter at least one Phone Number',
  RECENT_TRANSACTION_DATA: 'Recent Transactions data cannot be loaded at this time.',
  RECENT_CREDIT_TRANSACTION: 'Recent credit card transactions data cannot be loaded at this time.',
  CHECK_IMAGE: 'There was an error retrieving your check images.  Please try again later.',


  SYSTEM_DOWN: 'The PenFed Mobile Banking Application is currently undergoing system maintenance. We appreciate your patience and look forward to serving you.',
  CONN_TIMEOUT: 'There was a connection timeout. Please check your connection and try again.',
  //Auth  Errors
  INCORRECT_SECURITY_TITLE: "Incorrect Security Code",
  INCORRECT_SECURITY_MSG: "The security code you entered does not match our records. Please try again or call Member Service for assistance at 800-247-5626.",
  SECURTITY_HELP_TITLE: "Security Code",
  SECURITY_CODE_ERROR: 'Security Code Error',
  SECURITY_CODE_INVALID: 'You are entered a invalid Security Code, if your are not sure with the code, please contact PenFed to modify.',
  SECURITY_MESSAGE: "The code entered was not correct. Please try again. There are ' + times + ' attempts remaining.",
  SECURTITY_HELP_MSG: "The PenFed Security Code, a 4 to 6 digit number, is a new feature that lets you securely update account information. To protect your identity, this code is unique and will verify that you are who you say you are. This value is initially the same as your PIN and can be changed on PenFed.org.",
  DOUBLE_LOCK_MSG: "We have been unable to confirm your identity and your account cannot be unlocked at this time. Please call Member Service for assistance at 800-247-5626.",
  ERROR: "Error",
  ROTATION_Q_TITLE: "Incorrect Information",
  ROATATION_Q_ERROR_MSG: "The identifying information you provided does not match our records. Please try again or call Member Service for assistance at 800-247-5626.",
  SECURITY_LOCKED_MSG:"The security code you entered doesn't exist in our records. Please try again or call Member Service for assistance at 800-247-5626.",
  UNLOCK_ERROR_MSG: "There was a problem unlocking your account. Please try again.",
  UNLOCK_EROOR_TITLE: "Unlock Account",
  MUST_BE_LOGGED_IN: "You must be logged in to complete this action.",
  ERROR_UNAUTH: "Your session has expired and you must log in again.",
  SECURITY_MISSMATCH: 'Your Security Question and Answer did not match. Please try again. For your protection, you will be locked out after three unsuccessful attempts.',

  // TRASNFERS
  VISIT_PFOL_TITLE: 'Visit PenFed Online',
  SCHEDULED_TRASNFER_INVALID_ACCOUNT: "This transfer involves an account that does not appear in your Accounts List. It cannot be edited on mobile, but it can be deleted by swiping to the left on the transfer and selecting delete. To view or make edits to this scheduled transfer, please sign in to PenFed Online.",
  SCHEDULED_TRASNFER_NOT_ALLOWED: 'This transfer cannot be edited on mobile, but it can be deleted by swiping to the left on the transfer and selecting delete. To view or make edits to this scheduled transfer, please sign in to PenFed Online.',
  SCHEDULED_TRASNFER_DELETE_CONFIRM: 'Are you sure you want to delete the transfer?',
  DEPOSIT_AMOUNT_LIMIT: 'No more than $5000 can be entered.',
  NO_ENOUGH_FUNDS:'There are not enough funds in the From account to complete this transfer.',
  ACCOUNT_NICKNAME_NO_CHANGE:'No changes were made, So there is nothing to save.',
  ACCOUNT_NICKNAME_ERROR:'External Accounts are required to have nicknames.',
  NO_SAME_ACCOUNT:'You may not make a transfer to and from the same account.',
  ACCOUNT_DATA: 'Data Cannot be loaded at this time.',
  ZERO_INPUT:'The amount should be more than 0.',
  DEPOST_ERROR_MSG:'<br> If this error continues, please contact PenFed for deposit options.',
  DEPOSIT_FUNDTECH_ERROR: 'There is an error with the deposit service. Please try again later',
  CONTACT_PENFED_TRANSFER_SERVER_ISSUE: "There was an error while processing your transfer request. Please contact PenFed if the problem persists.",
  CONTACT_PENFED_TRANSFER_CALL:"Please contact PenFed to complete your transaction.",
  TRANSFER_MAX_CASH_REACHED:"Your transfer cannot be completed because it exceeds the limit for cash advances.",
  TRANSFER_MAX_LIMIT_REACHED:"Your transfer cannot be completed because it exceeds the limit for extenal account transfer advances",
  CONTACT_PENFED: "Contact PenFed",

  // PATTERN LOGIN
  PATTERN_LOGIN_NOT_DISABLED:'Pattern login is not disabled',
  PATTERN_LOGIN_FAILED: 'Failed to Login with Pattern',
  PATTERN_LOGIN_DISABLED: 'Your pattern has been disabled because of too many failed login attempts. Login with your username and password to continue and reset your pattern.',
  PATTERN_DISABLED: 'Pattern Disabled',
  PATTERN_LOGIN_ENABLED: 'That login pattern is incorrect. Please try again.',
  PATTERN_LOGIN_QUICK_LOGIN: 'There was an error while finding your pattern login information. Please try logging in with your username and password, then re-enable pattern login in Settings.',
  PATTERN_LOGIN_ERROR_ATTEMPT: 'Error: Failed to get Failed Attempt',
  PATTERN_MISSMATCH: 'Pattern Mismatch',
  PATTERN_LOGIN_PATTERN_MISSMATCH: 'Your patterns do not match. Please try again.',
  PATTERN_LOGIN_PATTERN_SETUP: 'Pattern setup Failed',
  PATTERN_LOGIN_PATTERN_NOT_DISABLED: 'Error:: Pattern is not disabled',

  // FINGERPRINT LOGIN
  FINGERPRINT_LOGIN_NOT_DISABLED:'Fingerprint login is not disabled',
  FINGERPRINT_LOGIN_ENABLE_TITLE:'Enable Fingerprint Login',
  FINGERPRINT_LOGIN_ENABLE_MSG:'Enabling Fingerprint Login will disable Pattern Login. Are you sure you want to continue?',
  FINGERPRINT_LOGIN_UNABLE_TO_VERIFY:'We were unable to verify your fingerprint. Please login with your password.',
  FINGERPRINT_LOGIN_DISABLE_INFO:'Are you sure you want to disable fingerprint login? This cannot be undone.',
  TOUCH_ID_NOT_ENABLED: 'Touch ID Not Enabled',
  FINGERPRINT_NOT_ENABLED : "Fingerprint Not Enabled",
  TOUCH_ID_NOT_ENABLED_MSG: 'To use this feature, please enable it in your phone settings.',
  TOUCH_ID_NOT_SUPPORTED: 'Touch ID Not Supported',
  TOUCH_ID_NOT_SUPPORTED_MSG: 'Touch ID is not supported on this device',
  // FIND_ATM
  ATM_LOCATION: 'The specified location could not be found',
  ATM_ENTER_LOCATION: 'Please enter a location to search for and retry.',
  ATM_ENABLE_LOCATION: 'We are unable to retrieve your current location.Please make sure you have enabled Location Services (GPS) on your phone.',

  //CUSTOM_ERROR_MESSAGES
  j_security_check : "Login Failure",
  //SETTINGS - Alert
  ALERT_SETTING_ERROR_MSG:'Error: Failed to save Alert Settings',
  ALERT_SETTING_ADDUID_ERROR_MSG:'Error: Failed to add Device ID',

  //add ext acct
  ROUTING_NUM_NOT_VALID:"The routing number entered is not associated with any known institution. Please check the routing number and try again.",
  //BillPay Related Messages- Start
  BILLPAY_DISABLE_ERROR_MSG:"Bill Pay services cannot be enabled from a mobile device. Please enroll online.",
  BILLPAY_UNENROLLED_ERROR_MSG:"You have unenrolled in Bill Pay. Please re-enroll online to use this service.",
  BILLPAY_SERVICE_FAILED_ERROR_MSG:"You have unenrolled in Bill Pay. Please re-enroll online to use this service.",
  BUTTON_VIEWACCOUNTS: "View Accounts",

  //add routing page
  BANK_ROUTING_NUMBER:"Bank Routing Number",
  BANK_ROUTING_NUMBER_DETAIL:"Also referred to as RTN, routing transit number, ABA or bank routing number, routing numbers are the nine-digit numeric code printed on the bottom of checks. To locate your routing number for checking and money market accounts, look at the first nine numbers printed along the bottom front of your check. For a savings account, please contact the financial institution to verify the appropriate routing number for debits.",
  TIMEOUT:'There was a connection timeout. Please check your connection and try again.',
  TRANSFER_FROM_CREIDT_TO_EXTERNAL_ERROR:'You may not make a tansfer to an external account from a credit card or line of credit account',
}
