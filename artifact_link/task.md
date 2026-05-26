# Task List - Connecting Frontend with Laravel Backend

- [x] Configure Nuxt Frontend public apiBaseUrl in nuxt.config.ts
- [x] Update Laravel Models in `ratingo-back` for frontend compatibility
  - [x] Add `customer_name`, `customer_phone`, and `comment` accessors to `ReviewSession.php`
  - [x] Add `city` and `address` accessors to `Location.php`
- [x] Implement Authentication Endpoints in `ratingo-back`
  - [x] Create `AuthController.php` with login and session profile recovery methods
  - [x] Register `/auth/login` and `/auth/me` routes in `routes/api.php`
- [x] Implement Controller Logic in `ratingo-back`
  - [x] Modify `FeedbackController.php` for custom pagination structure and name/phone search query filter
  - [x] Modify `AnalyticsController.php` to compute period-based KPIs and line chart coordinates
- [x] Update Seeders in `ratingo-back`
  - [x] Modify `DatabaseSeeder.php` to seed Company, demo User (`admin@ratingo.in` / `admin123`), Locations, QR codes, and historical ReviewSessions
- [x] Verification
  - [x] Verify frontend dashboard metrics and feedback logs interact cleanly with database data
