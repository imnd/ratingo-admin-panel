# Ratingo: Merchant Admin Panel

The admin panel is a single-page merchant dashboard built using Nuxt 4, Vue 3, Pinia, and Tailwind CSS. It is served under the secure `/analytics` and `/feedback` routes with navigation guards.

---

## 🛠️ Key Features
* **Sanctum Authentication**: Secure session control backed by cookie tokens, managed via the `AuthStore` in Pinia.
* **Location Management (CRUD)**: Create, edit, and view locations.
* **QR Code Generation**: Instantly generate and export location-linked QR codes as **PNG** or **SVG** files.
* **Negative Feedback logs**: Paginated list of customer complaints with real-time searches, location filtering, and date range selections.
* **Analytics charts**: Interactive charts (Highcharts) displaying scans, map redirects, and negative intercept counts.

---

## 📁 Directory Structure
```text
admin-panel/
├── src/
│   ├── components/
│   │   ├── locations/     # Location details card and CRUD modals
│   │   └── reviews/       # Feedback modal details and layout items
│   ├── layouts/           # Default layout with responsive sidebar & toggles
│   ├── middleware/        # Route guards (auth.ts & guest.ts)
│   ├── modules/
│   │   └── feedback/      # Pages & component logs for review monitoring
│   ├── pages/             # Dashboard analytics and landing page
│   ├── plugins/           # Axios / Fetch Interceptors
│   └── stores/            # Pinia stores (auth.ts, locations.ts, feedback.ts)
├── nuxt.config.ts         # Nuxt router and config variables
├── tailwind.config.js     # Tailwind design system configuration
└── package.json           # Scripts and dependencies
```

---

## ⚡ Setup & Development

### 1. Environment Config
Create a `.env` file in the root of the `admin-panel/` directory to configure the target API host:
```env
NUXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```
*(If unset, the app will gracefully fall back to local server mocks).*

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000/](http://localhost:3000/) in your browser.

---

## 🔑 Demo Credentials
* **User**: `admin@ratingo.in`
* **Password**: `admin123`
