# Realtime-Canvas

A simple real-time collaborative canvas app where multiple users can add and move rectangles on a shared board using **React**, **Express**, and **Socket.IO**.

---

## 🚀 Features

- Add rectangles to the shared canvas  
- Move rectangles in real-time (updates sync across all connected clients)  
- Unique IDs generated with `uuid`  
- Server manages state and broadcasts updates to all clients  

---

## 📦 Project Structure

Realtime-Canvas/  
│── client/ # React frontend  
│── server/ # Express + Socket.IO backend  
│── README.md  
│── .gitignore  

---

## ⚙️ Setup & Run Instructions

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/Realtime-Canvas.git
cd Realtime-Canvas
