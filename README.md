# SharkFunded Payment Gateway

This project implements a high-performance UPI Payment Gateway with dynamic QR code generation, real-time payment verification, and a secure admin dashboard.

## 🚀 Features
- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS.
- **Backend**: Next.js API Routes (Serverless).
- **Database**: Supabase (PostgreSQL) + Row Level Security (RLS).
- **Payment Processing**:
    - Dynamic UPI QR Code generation.
    - Real-time verification via Webhooks (SMS/Bank integration).
    - Secure manual upload fallback.
- **System**:
    - Rate limiting.
    - Basic Auth for sensitive APIs.
    - Transaction logging and receipts.

## 🛠️ Setup

### 1. Environment Variables
Create a `.env` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Shark Payment Security
SHARK_PAYMENT_KEY_ID=admin_user
SHARK_PAYMENT_KEY_SECRET=secure_password

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Schema
Run the contents of `schema.sql` in your Supabase SQL Editor to set up the `transactions` and `webhook_logs` tables.

## 🏃‍♂️ Running the Application

### Development
```bash
npm run dev
```
The app will run on `http://localhost:3000`.

### Production
```bash
npm run build
npm start
```

## 📖 Documentation
- **API Documentation**: [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)
- **Postman Collection**: [sharkfunded_postman_collection.json](sharkfunded_postman_collection.json)

## 🔄 Payment Flow
1. **Create Order**: Merchant server calls `/api/create-order` to get a checkout link.
2. **Checkout**: User scans QR code and pays.
3. **Verify**:
    - **Auto**: Webhook listener (`/api/payment-webhook`) detects bank SMS and updates DB.
    - **Manual**: User enters UTR, system checks against webhook logs.
4. **Receipt**: Success email sent automatically.

## 🛡️ Security
- **RLS**: Row Level Security ensures users can't read others' data.
- **Admin API**: Protected via Basic Auth.
- **Rate Limiting**: Implementation in API routes to prevent abuse.
