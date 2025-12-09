# SharkFunded API Documentation

Base URL: `http://localhost:3000` (or your deployed domain)

## Authentication
Some endpoints require Basic Authentication.
- **Username**: `SHARK_PAYMENT_KEY_ID` (from env)
- **Password**: `SHARK_PAYMENT_KEY_SECRET` (from env)

---

## Endpoints

### 1. System Status
Check the health of the system, database connection, and payment latency.

- **URL**: `/api/system-status`
- **Method**: `GET`
- **Auth**: None

**Response:**
```json
{
  "status": "operational",
  "checks": {
    "database": { "status": "connected", "latency": "15ms" },
    "payments": { "last_webhook": "2023-10-27T10:00:00Z", "last_transaction": "2023-10-27T10:05:00Z" },
    "metrics": { "success_rate": "98.5" }
  },
  "timestamp": "2023-10-27T10:10:00Z"
}
```

### 2. Create Order
Initialize a new payment session.

- **URL**: `/api/create-order`
- **Method**: `POST`
- **Auth**: Basic Auth Required

**Body:**
```json
{
  "amount": 1000,
  "name": "John Doe",
  "email": "john@example.com",
  "callback_url": "https://example.com/callback"
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "uuid-string",
  "url": "https://sharkfunded.com/secure-checkout/uuid-string",
  "message": "Order created successfully"
}
```

### 3. Verify Payment
Manually verify a payment using UTR (Unique Transaction Reference).

- **URL**: `/api/verify-payment`
- **Method**: `POST`
- **Auth**: None (Rate limited)

**Body:**
```json
{
  "utr": "123456789012",
  "amount": 1000,
  "email": "john@example.com",
  "name": "John Doe",
  "orderId": "optional-uuid"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified",
  "data": { ...transaction_details }
}
```

### 4. Send Receipt
Trigger a payment receipt email manually.

- **URL**: `/api/send-receipt`
- **Method**: `POST`
- **Auth**: None

**Body:**
```json
{
  "utr": "123456789012",
  "email": "john@example.com"
}
```

### 5. Check UTR
Securely check if a UTR has already been used.

- **URL**: `/api/check-utr`
- **Method**: `POST`
- **Auth**: None

**Body:**
```json
{
  "utr": "123456789012"
}
```

**Response:**
```json
{
  "exists": true,
  "message": "This UTR has already been used..."
}
```

---

## Webhooks

### Payment Webhook
Endpoint to receive SMS/Bank webhooks.

- **URL**: `/api/payment-webhook`
- **Method**: `POST`
- **Body**: JSON payload containing `text` or `content` with the SMS message.

```json
{
  "from": "BANK-SMS",
  "text": "Credited Rs. 1000.00 to Account via UPI/123456789012/Payee"
}
```
