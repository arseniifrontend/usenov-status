# Usenov Status

<br>

<p align="center">
  Beautiful open-source status dashboards and customizable monitoring widgets for modern web infrastructure.
</p>

<br>

<p align="center">
  <img
    width="850"
    alt="Usenov Status Preview"
    src="https://github.com/user-attachments/assets/3f111777-2efd-4df5-ae95-1e7c778b0115"
    style="border-radius: 18px;"
  />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-1E293B?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Vite-2A3153?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-0F172A?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Cloudflare%20Workers-1F1F1F?style=for-the-badge&logo=cloudflare&logoColor=F38020" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel" />
  <img src="https://img.shields.io/badge/npm%20package-CB3837?style=for-the-badge&logo=npm" />
</p>

<br>

## ✨ Features

- Real-time website and API monitoring
- Automatic status refresh
- Response time tracking
- HTTP status code tracking
- Multiple widget appearances
- Modern SaaS-inspired UI
- Fully responsive dashboard
- Glassmorphism and neon UI modes
- Detailed infrastructure cards
- Mobile-first responsive layouts
- Customizable colors, labels, layout and sizing
- Reusable React widget package
- Cloudflare Workers monitoring API
- Vercel frontend deployment
- Full TypeScript architecture
- Visual Widget Studio with instant React code generation

<br>

## 🌐 Live Demo

```txt
https://status.usenov.com
````

<br>

## 🧪 Widget Studio

Build and customize your monitoring widget visually.

Usenov Status now includes a full visual widget builder where you can:

* customize appearance and themes
* change accent colors
* toggle widget sections
* configure monitoring services
* generate ready-to-use React code instantly

<br>

<p align="center"> <img width="950" alt="Widget Studio" src="https://github.com/user-attachments/assets/1189b516-36fa-4cec-8d89-a3f366b1f624" style="border-radius: 18px;" /> </p> 

<br>

### ⚡ Generated React Code

The studio automatically generates clean React code based on your configuration.

```tsx
<StatusWidget
  appearance="modern"
  accentColor="#04AE79"
  fullWidth
  maxWidth="1024px"
  showStatusCode={true}
  showResponseTime={true}
  showSummary={true}
  services={[
    {
      name: "Usenov",
      url: "https://usenov.com",
      type: "website",
    },
  ]}
/>
```

<br>

### 🌐 Open Studio
https://status.usenov.com/studio

<br>

## Why Usenov Status?

Most status pages are either too heavy, too expensive or difficult to customize.

Usenov Status focuses on:

* beautiful developer-first UI,
* embeddable React widgets,
* lightweight infrastructure,
* simple deployment,
* full customization.

<br>

## 🟢 Service Statuses

| Status         | Description                     |
| -------------- | ------------------------------- |
| 🟢 Operational | Service is fully online         |
| 🟡 Degraded    | Slow response or partial issues |
| 🔴 Offline     | Service is unavailable          |

<br>

## 🏗 Architecture

```txt
Frontend Dashboard (React + Vite)
        ↓
Cloudflare Worker API
        ↓
Website & API Monitoring
```

The Worker performs server-side checks, so the widget can monitor external websites without browser CORS problems.

<br>

## 📦 Monorepo Structure

```txt
Usenov-Status/
│
├── frontend/
│   ├── React dashboard
│   ├── Tailwind UI
│   └── Vercel deployment
│
├── worker/
│   ├── Cloudflare Worker API
│   └── Service checking logic
│
├── backend/
│   └── Archived legacy backend structure
│
└── packages/
    └── status-widget/
        ├── Reusable React widget
        ├── Vite library build
        └── TypeScript package
```

<br>

## 🚀 Getting Started

### Clone repository

```bash
git clone https://github.com/ArseniiFrontend/Usenov-Status.git
cd Usenov-Status
```

<br>

## 🖥 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

Create `frontend/.env`:

```env
VITE_API_URL=https://worker.usenov.workers.dev
```

<br>

## ☁️ Cloudflare Worker Setup

```bash
cd worker
npm install
npm run dev
```

Worker runs on:

```txt
http://127.0.0.1:8787
```

Login and deploy:

```bash
npx wrangler login
npx wrangler deploy
```

<br>

## 📡 Worker API

### Default status endpoint

```txt
GET /api/status
```

Returns the default services configured inside the Worker.

### Dynamic check endpoint

```txt
POST /api/check
```

Body:

```json
{
  "services": [
    {
      "name": "Portfolio",
      "url": "https://example.com",
      "type": "website"
    }
  ]
}
```

Response:

```json
{
  "success": true,
  "checkedAt": "2026-05-11T12:00:00.000Z",
  "services": [
    {
      "id": "portfolio",
      "name": "Portfolio",
      "url": "https://example.com",
      "type": "website",
      "status": "online",
      "statusCode": 200,
      "responseTime": 84,
      "checkedAt": "2026-05-11T12:00:00.000Z"
    }
  ]
}
```

<br>

## 🎨 Status Widget Package

Usenov Status includes a reusable React widget package:

```txt
packages/status-widget
```

The widget can be imported into any React project and configured with custom services.

<br>

## 📦 Widget Installation


### Local monorepo usage

Inside `frontend/package.json`:

```json
{
  "dependencies": {
    "@usenov/status-widget": "file:../packages/status-widget"
  }
}
```

Then run:

```bash
cd frontend
npm install
```

### npm usage

```bash
npm install @usenov/status-widget
```

> The npm package release is planned. Until it is published, use the local monorepo package.

<br>

## 🎨 Widget Appearances

Usenov Status currently includes two built-in appearances:

* `default`
* `modern`

Both support:

* responsive layouts,
* multiple themes,
* custom colors,
* SaaS-style UI,
* reusable React architecture.

<br>

## 🧩 Default Appearance

<p align="center">
  <img
    width="760"
    alt="Default Widget Preview"
    src="https://github.com/user-attachments/assets/3bfc749e-7bc7-4e08-af4a-073c33be5b57"
    style="border-radius: 18px;"
  />
</p>

```tsx
<StatusWidget
  appearance="default"
  theme="glass"
  services={[
    {
      name: "Portfolio",
      url: "https://example.com",
      type: "website",
    },
  ]}
/>
```

<br>

## ✨ Modern Appearance

<p align="center">
  <img
    width="760"
    alt="Modern Widget Preview"
    src="https://github.com/user-attachments/assets/f1334d56-feee-4330-be1d-e5bd0bd5537b"
    style="border-radius: 18px;"
  />
</p>


```tsx
<StatusWidget
  appearance="modern"
  theme="glass"
  accentColor="#04AE79"
  fullWidth
  maxWidth="1024px"
  showStatusCode
  showResponseTime
  showSummary
  services={[
    {
      name: "Portfolio",
      url: "https://example.com",
      type: "website",
    },
  ]}
/>
```

<br>

## 🧩 Basic Widget Usage

```tsx
import { StatusWidget } from "@usenov/status-widget";
import "@usenov/status-widget/dist/status-widget.css";

export default function App() {
  return (
    <StatusWidget
      title="Infrastructure"
      services={[
        {
          name: "Portfolio",
          url: "https://example.com",
          type: "website",
        },
      ]}
    />
  );
}
```

<br>

## ☁️ Hosted vs Self-hosted Mode

By default, the widget uses the hosted Usenov Worker API:

```txt
https://worker.usenov.workers.dev
```

For production or private usage, you can deploy your own Worker and pass a custom `apiUrl`:

```tsx
<StatusWidget
  apiUrl="https://your-worker.workers.dev"
  services={[
    {
      name: "My Website",
      url: "https://example.com",
      type: "website",
    },
  ]}
/>
```

<br>

## 🎨 Widget Themes

Available themes:

```tsx
theme="dark"
theme="light"
theme="glass"
theme="neon"
```

Example:

```tsx
<StatusWidget
  appearance="modern"
  title="My Infrastructure"
  theme="glass"
  accentColor="#04AE79"
  services={[
    {
      name: "Website",
      url: "https://example.com",
    },
  ]}
/>
```

<br>

## 🎛 Full Customization Example

```tsx
<StatusWidget
  appearance="modern"
  theme="glass"
  rounded="2xl"
  accentColor="#04AE79"

  fullWidth
  maxWidth="1000px"

  showGlow
  showUrls
  showResponseTime
  showStatusCode
  showLastUpdated
  showHeader
  showEyebrow
  showPulse
  showRootStatus
  showSummary

  enableHover

  refreshInterval={10000}

  onlineLabel="Operational"
  degradedLabel="Slow"
  downLabel="Offline"

  colors={{
    background: "#050605",
    cardBackground: "rgba(255,255,255,0.04)",
    text: "#ffffff",
    mutedText: "#8b949e",
    border: "rgba(4,174,121,0.16)",
    online: "#04AE79",
    degraded: "#facc15",
    down: "#ef4444"
  }}

  services={[
    {
      name: "Usenov",
      url: "https://usenov.com",
      type: "website",
    },
    {
      name: "Flowtab",
      url: "https://flowtab.usenov.com",
      type: "website",
    },
  ]}
/>
```

<br>

## ⚙️ Widget Props

| Prop                | Type                                     | Default           | Description                              |
| ------------------- | ---------------------------------------- | ----------------- | ---------------------------------------- |
| `title`             | `string`                                 | `"System Status"` | Widget title                             |
| `services`          | `StatusWidgetInputService[]`             | Required          | List of websites/APIs to check           |
| `apiUrl`            | `string`                                 | Hosted Worker URL | Worker API URL                           |
| `appearance`        | `"default" \| "modern"`                  | `"default"`       | Widget appearance preset                 |
| `theme`             | `"dark" \| "light" \| "glass" \| "neon"` | `"glass"`         | Widget theme                             |
| `accentColor`       | `string`                                 | `"#22c55e"`       | Main accent color                        |
| `rounded`           | `"md" \| "xl" \| "2xl"`                  | `"2xl"`           | Border radius preset                     |
| `refreshInterval`   | `number`                                 | `30000`           | Auto-refresh interval in milliseconds    |
| `fullWidth`         | `boolean`                                | `false`           | Makes widget width 100%                  |
| `maxWidth`          | `string`                                 | `"620px"`         | Maximum widget width                     |
| `width`             | `string`                                 | `"100%"`          | Custom widget width                      |
| `showGlow`          | `boolean`                                | `true`            | Shows background glow                    |
| `showUrls`          | `boolean`                                | `true`            | Shows service URLs                       |
| `showResponseTime`  | `boolean`                                | `true`            | Shows response time                      |
| `showStatusCode`    | `boolean`                                | `false`           | Shows HTTP status codes                  |
| `showSummary`       | `boolean`                                | `true`            | Shows summary cards                      |
| `showLastUpdated`   | `boolean`                                | `true`            | Shows last update time                   |
| `showHeader`        | `boolean`                                | `true`            | Shows widget header                      |
| `showTitle`         | `boolean`                                | `true`            | Shows widget title                       |
| `showEyebrow`       | `boolean`                                | `true`            | Shows monitoring eyebrow label           |
| `showPulse`         | `boolean`                                | `true`            | Shows pulse indicator                    |
| `showRootStatus`    | `boolean`                                | `true`            | Shows global infrastructure status       |
| `showServiceType`   | `boolean`                                | `true`            | Shows service type badges                |
| `enableHover`       | `boolean`                                | `true`            | Enables hover animations                 |
| `onlineLabel`       | `string`                                 | `"Operational"`   | Online status label                      |
| `degradedLabel`     | `string`                                 | `"Degraded"`      | Degraded status label                    |
| `downLabel`         | `string`                                 | `"Down"`          | Offline status label                     |
| `eyebrowText`       | `string`                                 | Auto              | Custom eyebrow text                      |
| `rootStatusText`    | `string`                                 | Auto              | Custom global status text                |
| `summaryLabels`     | `object`                                 | Optional          | Custom summary card labels               |
| `colors`            | `object`                                 | Optional          | Custom widget color tokens               |
| `className`         | `string`                                 | `""`              | Additional custom classes                |

<br>

## 🎨 Custom Color Tokens

```tsx
colors={{
  background: "#050505",
  cardBackground: "rgba(255,255,255,0.06)",
  text: "#ffffff",
  mutedText: "#a1a1aa",
  border: "rgba(255,255,255,0.12)",
  online: "#22c55e",
  degraded: "#facc15",
  down: "#ef4444",
}}
```

<br>

## 🛠 Build Package Locally

```bash
cd packages/status-widget
npm install
npm run build
```

The build output will be generated in:

```txt
packages/status-widget/dist
```

<br>

## 🌐 Deployment

### Frontend

Recommended platform:

```txt
Vercel
```

Build command:

```bash
npm run build
```

### Worker

Recommended platform:

```txt
Cloudflare Workers
```

Deploy command:

```bash
npx wrangler deploy
```

<br>

## 🛠 Tech Stack

### Frontend

* React
* TypeScript
* Vite
* TailwindCSS

### Backend / API

* Cloudflare Workers
* Fetch API

### Package

* React
* TypeScript
* Vite Library Mode
* CSS variables
* npm-style package architecture

<br>

## 📄 License

MIT License

<br>

## ❤️ Built by Usenov

Modern infrastructure tooling for developers.
