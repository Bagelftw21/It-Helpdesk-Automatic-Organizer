# It-Helpdesk-Automatic-Organizer
An automatic IT Help desk ticketing system that utilizes Google Forms, Google Sheets, Apps Script, and Claude AI

## What it does
- Users fill out a help request form that is sent through google forms
- The data filled out is automatically sent to Google Sheets
- Apps Script then get triggered from the submission
- Claude AI reads the ticket and returns the category, priority, troubleshootins steps, and a response
- The output is automatically sent to Google Sheets
- Ticket's priority levels are color coded: Red = High, Orange = Medium, Yellow = Low.

## Technology Used
- Google Forms
- Google Sheets
- Google Apps Script
- Anthropic Claude AI API
- REST API integration

## How it works
1. User fills out the Google Form with their name, email, department and their issue
2. Once submitted the Apps Script automatically runs
3. Apps Scripts sends the data to Claude AI through the Anthropi API
4. Claude AI then categorizes and sets the priority of each ticket and generates troubleshooting steps and a response back
5. The organized feedback is then automatically filled out in the "Organized Tickets" table of the sheet.

## Setup
1. Create a Google Form with the prompts: 'Your name', 'Your Email', 'Department', and 'Your Issue' (Try to enforce to be as detailed as possible while typing your issue to ensure the most accurate response).
2. Once done with the Google Form, link it to a Google Sheet
3. Go to that Google Sheet you linked, then open Extensions -> Apps Script then past the code from helpdeskcode.gs
4. Where it says "const ANTRHOPIC_API_KEY = 'Enter-your-API-key'" enter your Antrhopic API key
5. Run setupTrigger() to start the automation

## Categories
- Hardware
- Software
- Account/Access
- Network
- Serivce
- Security

## Priority Levels
- High: User cannot work, system is down
- Medium: Hinders performance but can still work
- Low: Minor inconvenience, not urgent

## Screenshots
<img width="763" height="832" alt="image" src="https://github.com/user-attachments/assets/d925de38-0b4f-4de8-995c-aeb3aa12dac3" />

<img width="1920" height="912" alt="image" src="https://github.com/user-attachments/assets/45e028ee-6041-4fb1-adcd-9ae54df81975" />

<img width="902" height="908" alt="image" src="https://github.com/user-attachments/assets/7097e39f-b4d3-4dd0-81f7-ff937c4a5caf" />
