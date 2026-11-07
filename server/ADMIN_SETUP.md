# Admin account setup

Admin access is assigned in the database and is never granted by signup or by a public API. This keeps users from giving themselves administrator privileges.

1. Create an account for the intended administrator through the normal signup flow.
2. In `server/.env`, set `MONGODB_URI` to the MongoDB Atlas connection string for this project. Use the `mongodb+srv://...` URI from Atlas, replace its username, password, and database placeholders, and URL-encode special characters in the password. Keep this value private.
3. From the `server` directory, run:

   ```powershell
   node scripts/set-admin-role.js chaitymetrouni@gmail.com
   ```

4. Sign out of RetroFit and sign back in. The Admin navigation item appears for accounts whose role is `admin`. If needed, navigate directly to `/admin` to see the access/setup guidance.

The script changes only the matching existing account's `role`, is safe to rerun, and does not print the database connection string. It cannot work until `MONGODB_URI` points to a reachable Atlas cluster and the cluster's network access rules allow the development machine.
