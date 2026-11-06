# Security and deployment notes

## MongoDB Atlas network access

1. In Atlas, open **Security → Network Access → IP Access List**.
2. Remove `0.0.0.0/0`. This permits connections from every IPv4 address.
3. Add only the fixed public egress IP addresses used by the deployed API and the developer machines that need direct database access. If a hosting provider has rotating egress addresses, use its private networking option or a stable egress gateway.
4. Keep the database user limited to the required database and read/write role. Rotate its password if it was ever committed or shared.
5. Keep `MONGODB_URI`, JWT secrets, Stripe secret and webhook keys in the host's secret manager; never put them in `client/.env` or commit real values.

## Stripe local setup

Set `STRIPE_SECRET_KEY` on the server and `VITE_STRIPE_PUBLISHABLE_KEY` in `client/.env`. Set `STRIPE_WEBHOOK_SECRET` from the listener below. Run `stripe listen --forward-to localhost:5000/api/payment/webhook`, then send a test event with `stripe trigger payment_intent.succeeded`. Register `/api/payment/webhook` in the production Stripe Dashboard and subscribe to `payment_intent.succeeded` and `payment_intent.payment_failed`.

Payment totals are recalculated using MongoDB product prices. Webhook signatures are verified against the raw request body and the intent is matched back to its order before payment status changes. Never mark an order paid from a browser response alone.

## CORS and rate limiting

Set `CLIENT_ORIGINS` to a comma-separated allowlist of exact deployed frontend origins. Avoid wildcard origins. Login, signup and register routes have a per-IP limit; adjust the threshold only after reviewing real traffic and proxy configuration. If deployed behind a trusted reverse proxy, configure Express `trust proxy` for that proxy specifically before relying on client IP rate limiting.
