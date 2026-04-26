# 🔗 Short URL Backend Service

A scalable URL shortener backend built with **Node.js, Express, and MongoDB**. It converts long URLs into short, shareable links and handles fast redirection.

---

## 🚀 Features

* Generate short URLs using `nanoid`
* Redirect short URLs to original links
* RESTful API structure
* MongoDB database integration
* Clean modular backend architecture

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* nanoid

---

## 📁 Project Structure

```
project/
│── controllers/
│── models/
│── routes/
│── config/
│── app.js
│── server.js
│── .env
```

---

## ⚙️ Installation

```bash
# Clone repo
git clone https://github.com/Mohitco/Shorturl.git

# Go into folder
cd your-repo

# Install dependencies
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
```

---

## ▶️ Run the Project

```bash
npm run dev
```

---

## 📡 API Endpoints

### 1. Create Short URL

```
POST /shorten
```

**Request Body:**

```json
{
  "longUrl": "https://example.com"
}
```

**Response:**

```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

---

### 2. Redirect URL

```
GET /:shortId
```

Redirects to the original URL.

---

## 🧠 How It Works

1. User sends a long URL
2. Server generates a unique ID using nanoid
3. Data is stored in MongoDB
4. Short URL is returned
5. On access, user is redirected to original URL

---

## ⚠️ Best Practices

* Do not commit `.env` file
* Use `.gitignore`
* Validate URLs before storing
* Handle duplicate entries

---

## 🎯 Future Improvements

* User authentication
* Analytics (click tracking)
* Custom short URLs
* Rate limiting

---

## 👨‍💻 Author

Aadarsh – Fullstack Developer
