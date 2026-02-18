# Chat Bot AI - Groq Powered

A web-based AI chatbot built with Express and the Groq API, deployed on Netlify as serverless functions. Supports multiple LLM models, typewriter effect, and code snippet display.

## Prerequisites

- Node.js >= 18.14.0
- npm
- Netlify CLI
- A Groq API key → [console.groq.com](https://console.groq.com)

## Project Structure

```
├── netlify/
│   └── functions/
│       └── api.js        # Express serverless function (ESM)
├── public/
│   ├── index.html        # Frontend
│   ├── favicon.ico       # App icon
│   └── assets/           # Static assets
├── dist/                 # Build output (auto-generated)
├── build.js              # Build script (minify + obfuscate)
├── netlify.toml          # Netlify configuration
├── .env                  # Local environment variables (do not commit)
└── package.json
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/groq-chat.git
cd groq-chat
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Netlify CLI globally (if not already installed)

```bash
npm install netlify-cli -g
```

### 4. Set up environment variables

Create a `.env` file in the root of the project:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get your API key from [console.groq.com/keys](https://console.groq.com/keys).

### 5. Run locally

```bash
npm run dev
```

The app will be available at: **http://localhost:8888**

API endpoints available locally:

- `GET  http://localhost:8888/api/models`
- `POST http://localhost:8888/api/chat`

## Build

To build the project (minify HTML/CSS, obfuscate JS, output to `dist/`):

```bash
npm run build
```

> Note: `build.js` uses CommonJS (`require`), while `netlify/functions/api.js` uses ESM (`import/export`). This is intentional — they are separate execution contexts.

Output will be in the `dist/` folder.

## API Reference

### Get Available Models

```
GET /api/models
```

**Response:**

```json
{
  "data": [
    { "id": "llama3-8b-8192", ... },
    { "id": "mixtral-8x7b-32768", ... }
  ]
}
```

### Send Chat Message

```
POST /api/chat
Content-Type: application/json

{
  "model": "llama3-8b-8192",
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Hello!" }
  ]
}
```

**Response:**

```json
{
  "message": "Hello! How can I help you today?"
}
```

## Deployment

### Deploy via Git (Recommended)

1. Push the project to GitHub/GitLab
2. Go to [netlify.com](https://netlify.com) and import your repository
3. Build settings are auto-detected from `netlify.toml`
4. Set environment variables in **Netlify Dashboard → Site Settings → Environment Variables**:
   - `GROQ_API_KEY`
5. Click **Deploy**

### Deploy via Netlify CLI

```bash
netlify init
```

## Environment

| Setting | Value |
|---|---|
| Build command | `node build.js` |
| Publish directory | `dist` |
| Functions directory | `netlify/functions` |
| Node version | >= 18.14.0 |

## Notes

- The `dist/` folder is auto-generated during build — add it to `.gitignore`
- Do **not** commit your `.env` file
- `netlify/functions/api.js` uses ESM (`"type": "module"` must be set in `package.json`)
- `build.js` uses CommonJS and must **not** include `"type": "module"` — it runs as a standalone script

## .gitignore

```
node_modules/
dist/
.netlify/
.env
```