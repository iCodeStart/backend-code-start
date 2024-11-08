import { google, sheets_v4 } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets: sheets_v4.Sheets = google.sheets({ version: 'v4', auth });

const appendToGoogleSheet = async (data: string[]): Promise<void> => {
  const request: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: process.env.GOOGLE_SHEET_RANGE,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [data],
    },
  };

  try {
    await sheets.spreadsheets.values.append(request);
    return
  } catch (err) {
    return
  }
};

export { appendToGoogleSheet };
