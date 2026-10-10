# IMD Furniture — Virtual Assistant Backend

Backend service for the **IMD Furniture** chatbot, built with **Python 3.11**, **FastAPI**, and the **xAI Grok API** (`grok-4`).

---

## 📁 Project Structure

```
backend/
├── main.py              # FastAPI application, rate limiter, Grok integration
├── requirements.txt     # Python dependencies
├── .env.example         # Environment template
├── .env                 # Local environment file (git-ignored)
├── .python-version      # Python version specification (3.11)
└── README.md            # Documentation & deployment guide
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Python 3.11 (`python --version`)

### 2. Create and Activate Virtual Environment

**On Windows (PowerShell):**
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**On macOS / Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Open `.env` and configure:
```env
GROK_API_KEY=your_xai_grok_api_key_here
GROK_MODEL=grok-4
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

> **Note:** If `GROK_API_KEY` is left blank, the server will start up normally and pass `/health` checks, but `/chat` calls will return HTTP 500 (`Assistant not configured`).

### 5. Start the Server Locally
```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

---

## 🧪 Verification & Testing

### Health Check:
```bash
curl http://127.0.0.1:8000/health
```
**Expected response:**
```json
{"status": "ok"}
```

### Chat Request:
```bash
curl -X POST http://127.0.0.1:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "Where is your showroom located?"
      }
    ]
  }'
```
**Expected response:**
```json
{
  "reply": "Our flagship showroom is located at Century Mall in Addis Ababa, Ethiopia. We invite you to visit us in person or reach out to our craftsmen directly via call at +251 98 479 5010 or WhatsApp at +251 93 032 9010."
}
```

---

## 🌐 Deploying to Render

You can deploy this backend as a Python Web Service on Render:

1. **Create New Web Service**:
   - Go to [dashboard.render.com](https://dashboard.render.com) and click **New + > Web Service**.
   - Connect your GitHub repository.

2. **Configure Service Settings**:
   - **Name**: `imd-furniture-assistant` (or your preferred name)
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Region**: Closest to your users (e.g. Frankfurt or Oregon)
   - **Branch**: `main`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Set Environment Variables**:
   In Render's **Environment** tab, add:
   - `GROK_API_KEY`: Your xAI Grok API Key (`xai-...`)
   - `GROK_MODEL`: `grok-4`
   - `ALLOWED_ORIGINS`: Comma-separated list with no trailing slash, including local testing and your production domain:
     ```
     http://localhost:3000,https://imdfurniture.com,https://your-site.vercel.app
     ```

4. **Health Check Path**:
   - In **Advanced Settings**, set **Health Check Path** to `/health`.

5. **Deploy**:
   - Click **Create Web Service**.
   - Render will build and deploy the container.
   - Once deployed, copy your Render service URL (e.g., `https://imd-furniture-assistant.onrender.com`).

> ⏳ **Render Free Plan Note**:  
> On Render's Free tier, the service automatically spins down after 15 minutes of inactivity. When a visitor opens the chat widget, the first request will take 30–60 seconds to wake the service up. The frontend `ChatWidget` has a built-in 70-second timeout and displays a helpful *"Waking up assistant atelier..."* notification to handle cold starts seamlessly.

---

## 🔗 Connecting to the Frontend (Next.js)

In the root `.env.local` of the Next.js project:
```env
NEXT_PUBLIC_CHAT_API_URL=https://imd-furniture-assistant.onrender.com/chat
```
Deploy the Next.js project on Vercel with this same environment variable set.
