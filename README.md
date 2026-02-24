# geo-react-api
JLabs: Jr. Full Stack Engineer - Basic Assessment Exam

## Installation & Setup

### 1. **Clone the repository**
Open your terminal or command prompt and run:

```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. **Install dependencies for both client and server**
```bash
npm i
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

- After setup, you can start the server with:
```bash
npm start
```

- you can start the client with:
```bash
npm run dev
```