# SharkFunded Payment Gateway

This project implements a UPI Payment Gateway with dynamic QR code generation and payment verification via mail scraping.

## Features
- **Frontend**: React (Vite) + TypeScript + Tailwind CSS.
- **Backend**: Node.js + Express + IMAP (for mail scraping).
- **Database**: Supabase (for transaction logging).
- **Payment**: UPI QR Code generation.

## Prerequisites
- Node.js (v18+)
- Supabase Account
- Email Account (Gmail recommended) with IMAP enabled and App Password generated.

## Setup

### 1. Environment Variables
Create a `.env` file in the root directory (or copy `.env.example`):

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend Configuration
PORT=3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### 2. Database Setup
Run the SQL commands in `schema.sql` in your Supabase SQL Editor to create the `transactions` table.

### 3. Install Dependencies
```bash
npm install
cd server && npm install && cd ..
```
(Note: The root `package.json` includes frontend dependencies. The `server` folder has its own `package.json` if you initialized it separately, but in this setup, we installed backend deps in root for simplicity. If you followed the agent's steps, backend deps are in root `node_modules`.)

**Correction**: The agent installed backend dependencies in the root `package.json`. So just `npm install` in root is enough.

## Running the Application

### Start Backend
```bash
node server/index.js
```
The server will run on `http://localhost:3000`.

### Start Frontend
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`.

## Usage Flow
1. Open the frontend.
2. Enter Name, Email, and Amount.
3. Scan the QR Code and pay via any UPI app.
4. Enter the UTR (Transaction ID) from your UPI app into the frontend.
5. Click "Verify Payment".
6. The backend will check your email for a confirmation from PhonePe/Bank matching the UTR and Amount.
7. If found, the transaction is recorded in Supabase and success is shown.

## Testing without Real Email
If you don't provide `EMAIL_USER` and `EMAIL_PASSWORD`, the backend will mock the verification:
- Enter any UTR starting with `TEST` (e.g., `TEST1234`) to simulate a successful payment.
