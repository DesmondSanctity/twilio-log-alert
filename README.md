## twilio-log-alert
A utility tool for incident/log alerts in Node.js APIs built with Winston and Twilio WhatsApp API

## running the project

- Clone the repo to your local machine
  ```bash
  git clone https://github.com/DesmondSanctity/twilio-log-alert.git
  ```
- Run the installation command to install all the packages needed
  ```bash
  npm install
  ```
- Create a `.env` file and populate the following values with your values. The example `.env` is shown below:
  ```bash
  PORT=5000
  DB_NAME=XXXXX
  DB_USERNAME=XXXXX
  DB_PASSWORD=XXXXX
  DB_HOST=XXXXX
  JWT_SECRET=XXXXX
  JWT_EXPIRES_IN=XXXXX
  TWILIO_AUTH_TOKEN=XXXXX
  TWILIO_ACCOUNT_SID=XXXXX
  REDIS_URL=XXXXX
  ```
- You will get your Twilio credentials from your Twilio Console. Follow this link here to go to the console or register [https://console.twilio.com/](https://console.twilio.com/)
- Running the code below can generate a random 64-bit ASCII string that can be used for encrypting JWT tokens. After you run the code, copy the token as the value for `JWT_SECRET` in your  `.env` file;
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- The `JWT_EXPIRES_IN` variable in your `.env` file is used to moderate the time our JWT tokens will expire and users will have to log in again to use the APIs. In this tutorial, you will use `12h` as the value which signifies 12 hours.
- For DB and Redis credentials, you will use your local DB credentials. This app uses MySQL as a database. You can easily set up one using XAMPP for general OS, WAMPP for Windows, or LAMPP for Linux. You can also install Redis locally and start the server. You might not need the `REDIS_URL` in this case. If you are using an external Redis cluster, you can then use the URL for the `REDIS_URL` value in your `.env` file.

