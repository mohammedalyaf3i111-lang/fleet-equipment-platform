import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true
});

const baseUrl = process.env.LOCAL_URL ?? "http://localhost:3000";
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
const messages = [];
const pageErrors = [];

page.on("console", (message) => {
  if (["error", "warning"].includes(message.type())) {
    messages.push({ type: message.type(), text: message.text() });
  }
});
page.on("pageerror", (error) => pageErrors.push(error.message));

await page.goto(baseUrl, { waitUntil: "networkidle" });
const title = await page.title();
const h1 = await page.locator("h1").innerText();
const hasCta = await page.getByRole("link", { name: "اطلب معدة الآن" }).count();
await page.goto(`${baseUrl}/admin/dashboard`, { waitUntil: "networkidle" });
const adminTitle = await page.locator("h1").innerText();
await page.goto(`${baseUrl}/request-equipment`, { waitUntil: "networkidle" });
const requestTitle = await page.getByRole("heading", { name: "طلب معدة" }).textContent();

await browser.close();

console.log(JSON.stringify({ title, h1, hasCta, adminTitle, requestTitle, console: messages, pageErrors }, null, 2));
