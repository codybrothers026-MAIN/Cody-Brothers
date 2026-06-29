import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  User 
} from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');

export interface GoogleUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface Lead {
  date: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  tier: string;
  budget: string;
  message: string;
}

// Memory cache for Google OAuth token
let cachedToken: string | null = null;

export const signInWithGoogle = async (): Promise<{ user: GoogleUser; token: string } | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    
    if (!token) {
      throw new Error('Failed to obtain Google Access Token from authentication.');
    }

    cachedToken = token;
    
    const user: GoogleUser = {
      uid: result.user.uid,
      displayName: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
    };

    return { user, token };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

export const logoutGoogle = async (): Promise<void> => {
  await signOut(auth);
  cachedToken = null;
};

export const getCachedToken = (): string | null => {
  return cachedToken;
};

// CREATE SPREADSHEET
export const createLeadsSpreadsheet = async (token: string): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> => {
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: 'CodyBrothers Digital Leads Tracker',
      },
      sheets: [
        {
          properties: {
            title: 'Inquiries',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'Date Submitted' } },
                    { userEnteredValue: { stringValue: 'Name' } },
                    { userEnteredValue: { stringValue: 'Email' } },
                    { userEnteredValue: { stringValue: 'Phone' } },
                    { userEnteredValue: { stringValue: 'Business Name' } },
                    { userEnteredValue: { stringValue: 'Selected Package' } },
                    { userEnteredValue: { stringValue: 'Budget Range' } },
                    { userEnteredValue: { stringValue: 'Message / Requirements' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to create spreadsheet: ${errText}`);
  }

  const data = await response.json();
  return {
    spreadsheetId: data.spreadsheetId,
    spreadsheetUrl: data.spreadsheetUrl,
  };
};

// APPEND LEAD TO SPREADSHEET
export const appendLeadToSpreadsheet = async (
  token: string, 
  spreadsheetId: string, 
  lead: Lead
): Promise<any> => {
  const range = 'Inquiries!A:H';
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range: range,
        majorDimension: 'ROWS',
        values: [
          [
            lead.date,
            lead.name,
            lead.email,
            lead.phone,
            lead.businessName,
            lead.tier,
            lead.budget,
            lead.message,
          ],
        ],
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to append lead to Google Sheet: ${errText}`);
  }

  return await response.json();
};

// FETCH LEADS FROM SPREADSHEET
export const fetchLeadsFromSpreadsheet = async (token: string, spreadsheetId: string): Promise<Lead[]> => {
  const range = 'Inquiries!A2:H100';
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to fetch leads from Google Sheet: ${errText}`);
  }

  const data = await response.json();
  const rows = data.values || [];

  return rows.map((row: any) => ({
    date: row[0] || '',
    name: row[1] || '',
    email: row[2] || '',
    phone: row[3] || '',
    businessName: row[4] || '',
    tier: row[5] || '',
    budget: row[6] || '',
    message: row[7] || '',
  }));
};
