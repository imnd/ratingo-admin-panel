# Implementation Plan - Connecting Frontend with Laravel Backend

This plan details the changes required to connect the Nuxt 4/3 SPA frontend with the local Laravel backend, enabling real-time authentication, location context switching, paginated negative feedback logs with search, and dynamic analytics dashboard charts.

## User Review Required

> [!IMPORTANT]
> - **CORS Configuration**: The backend's CORS configuration has been published to `config/cors.php` and is open (`allowed_origins = ['*']`), which permits request headers from the frontend (running on `http://localhost:3000`).
> - **Model-to-Frontend Compatibility via Accessors**: Instead of changing the Vue UI components or database column structures, we map column mismatches (e.g. `name` -> `customer_name`, `phone` -> `customer_phone`, `feedback_text` -> `comment` for reviews, and adding `city`/`address` for locations) dynamically in the backend models using Eloquent accessors and `$appends`.
> - **Direct Docker Environment**: The backend services (Nginx, PHP-FPM, Postgres, Redis) are run inside Docker, exposing port `8000`. The frontend is updated to point directly to `http://localhost:8000/api/v1`.

---

## Proposed Changes

### Component 1: Laravel Backend Authentication (`ratingo-back`)

#### [NEW] [AuthController.php](file:///D:/domains/ratingo-back/app/Http/Controllers/Api/V1/AuthController.php)
- Handle user login validation. Validate `email` and `password`.
- Locate user record and verify password via `Hash::check`.
- Create personal access token via Sanctum: `$user->createToken('auth_token')->plainTextToken`.
- Return response matching frontend expectations: `{ token, user, company }`.
- Implement `/auth/me` to return the current user and their company profile for session persistence.

#### [MODIFY] [api.php](file:///D:/domains/ratingo-back/routes/api.php)
- Add public endpoint: `POST /api/v1/auth/login`.
- Add private endpoint: `GET /api/v1/auth/me` inside the `auth:sanctum` group.

---

### Component 2: Laravel Backend Data Models (`ratingo-back`)

#### [MODIFY] [ReviewSession.php](file:///D:/domains/ratingo-back/app/Models/ReviewSession.php)
- Add `$appends = ['customer_name', 'customer_phone', 'comment']` properties.
- Add accessors `getCustomerNameAttribute`, `getCustomerPhoneAttribute`, and `getCommentAttribute` to map database column properties.

#### [MODIFY] [Location.php](file:///D:/domains/ratingo-back/app/Models/Location.php)
- Add `$appends = ['city', 'address']` properties.
- Add accessors `getCityAttribute` (guessing city based on location name or fallback) and `getAddressAttribute` to support dropdown searches and layouts in the frontend.

---

### Component 3: Laravel Backend Controllers (`ratingo-back`)

#### [MODIFY] [FeedbackController.php](file:///D:/domains/ratingo-back/app/Http/Controllers/Api/V1/FeedbackController.php)
- Normalize paginator response to return:
  ```json
  {
    "data": [...],
    "pagination": {
      "total": X,
      "totalPages": Y
    }
  }
  ```
- Implement customer `search` (checking name/phone substring matches).
- Support filtering by `location_id` (already partially present, ensure it works with the frontend dropdown).

#### [MODIFY] [AnalyticsController.php](file:///D:/domains/ratingo-back/app/Http/Controllers/Api/V1/AnalyticsController.php)
- Accept `locationId` (from query) to filter by location (or ignore if null/0).
- Accept `period` (`7d` or `30d`) to calculate daily line chart coordinates and labels.
- Calculate and return metrics: `totalScans`, `scansChange`, `positiveRedirects`, `redirectsChange`, `negativeIntercepts`, and `interceptsChange`.
- Calculate and return daily chart data: `chartData: { labels, positiveRedirects, negativeIntercepts }`.

---

### Component 4: Laravel Backend Seeders (`ratingo-back`)

#### [MODIFY] [DatabaseSeeder.php](file:///D:/domains/ratingo-back/database/seeders/DatabaseSeeder.php)
- Seed a company `Tandoori Delights Hospitality Pvt Ltd`.
- Seed the demo user `admin@ratingo.in` with password `admin123` (hashed) linked to the company so the frontend autofill works out-of-the-box.
- Seed 4 locations with QR Codes (Connaught Place Branch, Indiranagar Outlet, Bandra West Lounge, DLF CyberHub Spot).
- Seed historical review sessions (both positive redirects and negative feedback) over the past 30 days.

---

### Component 5: Nuxt Frontend Configuration (`ratingo-admin`)

#### [MODIFY] [nuxt.config.ts](file:///D:/domains/ratingo-admin/nuxt.config.ts)
- Change `public.apiBaseUrl` from `'/api/v1'` to `'http://localhost:8000/api/v1'` to switch from Mock API to the Laravel Docker backend.

---

## Verification Plan

### Automated Tests
- Run `docker-compose exec app php artisan test` to verify existing and new backend test cases.

### Manual Verification
- Start the frontend dev server (`npm run dev`) and make sure the docker containers for the backend are running.
- Visit `http://localhost:3000/auth/login`. Click the "Autofill Demo Credentials" button and log in.
- Verify page redirects to `/analytics`. Verify that the dashboard loads the charts and KPI metrics.
- Change the global location dropdown and date range period. Verify that both the metrics and charts update dynamically.
- Visit `/feedback` (Feedback Logs). Verify pagination works, and type into the search bar to filter entries by name or phone.
- Open detail modal and click the WhatsApp direct contact button, verifying the redirect URL parameters.
