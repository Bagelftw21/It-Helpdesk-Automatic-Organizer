const ANTHROPIC_API_KEY = "Enter-your_API-key";
const OUTPUT_SHEET_NAME = "Organized Tickets";

function onFormSubmit(e) {
  const responses = e.values;
  
  const timestamp = responses[0];
  const name = responses[1];
  const email = responses[2];
  const department = responses[3];
  const issue = responses[4];

  const organized = sendToClaude(name, email, department, issue);
  writeToSheet(timestamp, name, email, department, issue, organized);
}

function sendToClaude(name, email, department, issue) {
  const prompt = `
You are an IT help desk assistant. A user has submitted a support request.
Analyze the issue and return ONLY a JSON object with no extra text, no markdown, no backticks.

User info:
- Name: ${name}
- Email: ${email}
- Department: ${department}
- Issue: ${issue}

Return this exact JSON structure:
{
  "ticketId": "TKT-XXX",
  "category": "one of: Hardware, Software, Account/Access, Network, Service, Security",
  "priority": "one of: High, Medium, Low",
  "troubleshooting": "step 1 | step 2 | step 3 | step 4 | step 5",
  "response": "professional response to send to the user"
}

Priority rules:
- High: user cannot work at all or system is down
- Medium: issue hinders performance but work can continue
- Low: minor inconvenience, not urgent
  `;

  const payload = {
    model: "claude-sonnet-4-6",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }]
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    payload: JSON.stringify(payload)
  };

  const response = UrlFetchApp.fetch("https://api.anthropic.com/v1/messages", options);
  const data = JSON.parse(response.getContentText());
  const text = data.content[0].text;

  return JSON.parse(text);
}

function writeToSheet(timestamp, name, email, department, issue, organized) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  let outputSheet = ss.getSheetByName(OUTPUT_SHEET_NAME);
  if (!outputSheet) {
    outputSheet = ss.insertSheet(OUTPUT_SHEET_NAME);
    outputSheet.appendRow([
      "Timestamp", "Ticket ID", "Name", "Email", "Department",
      "Issue", "Category", "Priority", "Troubleshooting", "Response", "Status"
    ]);
    outputSheet.getRange(1, 1, 1, 11).setFontWeight("bold");
  }

  const lastRow = outputSheet.getLastRow();
  const ticketNumber = lastRow;
  const ticketId = "TKT-" + String(ticketNumber).padStart(3, "0");

  outputSheet.appendRow([
    timestamp,
    ticketId,
    name,
    email,
    department,
    issue,
    organized.category,
    organized.priority,
    organized.troubleshooting,
    organized.response,
    "Open"
  ]);
}

function setupTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => ScriptApp.deleteTrigger(t));
  
  ScriptApp.newTrigger("onFormSubmit")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();

  SpreadsheetApp.getUi().alert("Complete");
}
function testRun() {
  const fakeData = {
    values: [
      "2026-05-01 10:00:00",
      "John Smith",
      "jsmith@company.com",
      "Marketing",
      "My computer won't turn on and I have a meeting in an hour"
    ]
  };
  onFormSubmit(fakeData);
}
