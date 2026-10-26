// Rack & Race progress sync. Paste into the Google Sheet via Extensions > Apps Script, then deploy as a web app.
// Columns: A User ID | B Total Laps | C Total Bricks | D Milestones Reached | E Last Synced | F Progress Data
const COLUMNS = 6;

// GET ?user=Son-Device-Sync returns that user's saved progress.
function doGet(e) {
  const user = e.parameter.user;
  if (!user) return reply_({ error: 'Missing user' });
  const row = findRow_(user);
  if (!row) return reply_({ found: false });
  const [, , , , lastSynced, progress] = sheet_().getRange(row, 1, 1, COLUMNS).getValues()[0];
  return reply_({ found: true, lastSynced, progress: JSON.parse(progress || '{}') });
}

// POST a JSON body: updates the user's row, or adds one the first time.
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (!data.user) return reply_({ error: 'Missing user' });
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = sheet_();
    const row = findRow_(data.user) || sheet.getLastRow() + 1;
    const lastSynced = new Date();
    sheet.getRange(row, 1, 1, COLUMNS).setValues([[
      data.user,
      data.laps,
      data.bricks,
      data.milestones.join(', '),
      lastSynced,
      JSON.stringify(data.progress)
    ]]);
    return reply_({ ok: true, lastSynced });
  } finally {
    lock.releaseLock();
  }
}

function sheet_() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

function findRow_(user) {
  const cell = sheet_().getRange('A2:A').createTextFinder(user).matchEntireCell(true).findNext();
  return cell ? cell.getRow() : 0;
}

function reply_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
