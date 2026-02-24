# geo-react-api
JLabs: Jr. Full Stack Engineer - Basic Assessment Exam

## Installation & Setup

### 1. **Clone the repository**
Open your terminal or command prompt and run:

```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. **Install dependencies for both server and client**
```bash
npm install           # For server
cd client
npm install           # For React client
```

### 3. **Configure environment variables (server)**
The API requires a MongoDB connection and a port number.

#### 3.1 Copy the sample environment file
```bash
cp .env.example .env
```

#### 3.2 Edit `.env` with your own values, or use the sample MongoDB connection string:
```env
PORT=5000
MONGODB_STRING="mongodb+srv://admin:admin123@cluster0.ytx67ow.mongodb.net/sales-api?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET="geoTrackerApp"
```

### Notes
- Make sure MongoDB is running or accessible via the connection string.  
- Keep your `JWT_SECRET` safe for authentication.

### 4. **Run the server**
From the `/server` folder:
```bash
npm start
```

### 5. **Run the client**
From the `/client` folder:
```bash
npm run dev
```
React app will start (usually on `http://localhost:5173`).

---

## Features
- **Login:** Simple login form with email and password that validates credentials against the database.Validates credentials against the database.
- **Home Screen:** 
  - Displays the current user's IP & geolocation using https://ipinfo.io/geo
  - Allows searching for any valid IP (https://ipinfo.io/<IP>/json).
  - Displays search history with checkboxes.
  - Delete multiple history entries at once.
  - Clear search to revert to logged-in user’s location.


---


## Notes
- Make sure MongoDB is running or accessible via your connection string.
- Default APIs:
    - Login: `http://localhost:8000/api/login`
    - Geo: `https://ipinfo.io/geo (current user)` or `https://ipinfo.io/<IP>/json (custom IP)`

---

