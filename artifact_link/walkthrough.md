# Walkthrough - Connecting Frontend with Laravel Backend

This document summarizes the changes made to connect the Nuxt 3/4 Single Page Application (SPA) frontend with the local Laravel backend, switching from local mocks to dynamic database-driven data.

---

## Changes Implemented

### 1. Nuxt Configuration
- **[nuxt.config.ts](file:///D:/domains/ratingo-admin/nuxt.config.ts)**: Changed `runtimeConfig.public.apiBaseUrl` to `'http://localhost:8000/api/v1'` so frontend API requests are sent directly to the Laravel backend running on the local Docker container.

### 2. Laravel Database Models (`ratingo-back`)
- **[ReviewSession.php](file:///D:/domains/ratingo-back/app/Models/ReviewSession.php)**: Added accessors and appended virtual properties:
  - `customer_name` (maps to `name`)
  - `customer_phone` (maps to `phone`)
  - `comment` (maps to `feedback_text`)
  This aligns database column naming conventions with the properties already bound in the frontend's Vue components without requiring any UI code changes.
- **[Location.php](file:///D:/domains/ratingo-back/app/Models/Location.php)**: Added accessors and appended virtual properties:
  - `city` (dynamically parses location name to determine New Delhi, Mumbai, Bangalore, Hyderabad, or fallback)
  - `address` (defaults to a standard branch string)
  This resolves city/address bindings required by the global dropdown selector in the layout.

### 3. Authentication & Profile Recovery (`ratingo-back`)
- **[AuthController.php](file:///D:/domains/ratingo-back/app/Http/Controllers/Api/V1/AuthController.php)**: Added a controller to handle:
  - `POST /api/v1/auth/login`: Validates credentials, checks hashed password, and creates a Sanctum Personal Access Token (`auth_token`). Returns the token and matched user and company profiles.
  - `GET /api/v1/auth/me`: Retrieves current authenticated user profile and subscription status on page reloads to maintain session state.
- **[api.php](file:///D:/domains/ratingo-back/routes/api.php)**: Registered these endpoints under the `v1` prefix.

### 4. Custom Pagination & Live Search (`ratingo-back`)
- **[FeedbackController.php](file:///D:/domains/ratingo-back/app/Http/Controllers/Api/V1/FeedbackController.php)**:
  - Normalized the paginator return structure to match the frontend expectations: `{ data: [...], pagination: { total: X, totalPages: Y } }`.
  - Added support for `$request->search` query parameters to perform SQL `like` queries on customer name and phone numbers.
  - Allowed pagination size `limit` to adjust dynamically to the requested parameter (default: 10).

### 5. Period-based Metrics & Chart Coordinates (`ratingo-back`)
- **[AnalyticsController.php](file:///D:/domains/ratingo-back/app/Http/Controllers/Api/V1/AnalyticsController.php)**:
  - Added support for filtering metrics by `locationId`.
  - Accepted `period` (`7d` or `30d`) to compute daily line chart labels and coordinate arrays.
  - Calculated exact total scan sums from QR codes, positive redirect counts, and negative feedback counts in database records, comparing them to the previous period to output real-time percent changes.
  - Serialized daily records to provide fully functional line charts for positive redirects (emerald) and negative intercepted feedback (red).

### 6. Demo Seeding (`ratingo-back`)
- **[DatabaseSeeder.php](file:///D:/domains/ratingo-back/database/seeders/DatabaseSeeder.php)**:
  - Seeded a default company: `Tandoori Delights Hospitality Pvt Ltd`.
  - Seeded the demo merchant credentials: `admin@ratingo.in` / `admin123` linked to this company so the UI's autofill button logs in successfully out-of-the-box.
  - Seeded 4 locations (Connaught Place, Indiranagar, Bandra West, DLF CyberHub) with active scan counters.
  - Seeded 30 days of daily review sessions, ensuring both charts and logs tables are pre-populated with realistic, rich datasets.

---

## Verification & How to Test

1. **Verify Backend and DB Containers are Running**:
   Ensure Docker Desktop is active and start your backend containers:
   ```bash
   docker-compose up -d
   docker-compose exec app php artisan migrate:fresh --seed
   ```
2. **Start Frontend Server**:
   ```bash
   npm run dev
   ```
3. **Verify Auth Flow**:
   Open [http://localhost:3000/auth/login](http://localhost:3000/auth/login). Click **"Autofill Demo Credentials"** (`admin@ratingo.in` / `admin123`) and click **"Log In"**. Verify that a token is generated and the session is restored successfully.
4. **Verify Dynamic Data**:
   - Check the **Analytics Dashboard** page: Verify that real total scans, redirects, and negative intercepts are loaded. Check that the Chart.js line charts match the 7d or 30d period selections and display daily coordinates.
   - Switch location in the **Global Dropdown**: Confirm that metrics and charts update to show only the active location's data.
   - Check **Feedback Logs** page: Confirm that the table correctly lists paginated logs. Type into the search input to filter entries by name or phone.
