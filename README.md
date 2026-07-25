# Resource Generation Office (RGO) Reservation System

A modern web-based product catalog and reservation system developed for the **Resource Generation Office (RGO)** of **Batangas State University**. The system enables students to browse available products such as school uniforms, merchandise, and school supplies, then reserve a convenient pickup schedule online.

Unlike traditional inventory systems, product information and reservation schedules are managed through **Google Sheets**, eliminating the need for a custom admin dashboard while providing an easy-to-use management interface for RGO personnel.

---

## ✨ Features

### Student Portal

- 🏠 Responsive Home Page
- 🛍️ Product Catalog
- 🔍 Product Search
- 🏷️ Product Category Filters
- 📄 Dynamic Product Details
- 📦 Product Variations
- ⭐ Featured Products
- 💡 Product Recommendations
- 📅 Reservation Calendar
- ⏰ Available Reservation Time Slots
- 📋 Reservation Summary
- 🔐 Google Authentication (BatState Students Only)

---

## 📄 Pages

### Home

- Hero Section
- Shop by Category
- Featured Products
- Reservation Call-to-Action

### Shop

- Product Catalog
- Search Products
- Category Filters
  - All Products
  - School Uniforms
  - Merchandise
  - School Supplies

### Product Details

- Product Images
- Description
- Product Variations
- Related Products

### Reservation

- Date Picker
- Available Time Slots
- Reservation Summary
- Reservation Confirmation

---

## 📊 Google Sheets Management

Instead of building a dedicated admin dashboard, RGO personnel manage the system using **Google Sheets**.

### Products Sheet

- Add products
- Edit product details
- Update prices
- Manage product variations
- Enable or disable product availability
- Mark featured products

### Reservation Slots Sheet

- Configure reservation dates
- Manage available time slots
- Set slot capacity
- Open or close reservation schedules

Laravel synchronizes data from Google Sheets using the **Google Sheets API**, ensuring students always see the latest product information and reservation availability.

---

## ⚙️ System Workflow

```text
RGO Staff
      │
      ▼
Google Sheets
      │
Google Sheets API
      │
      ▼
Laravel Backend
      │
      ▼
Database
      │
      ▼
Next.js Website
      │
      ▼
Students
```

### Reservation Flow

1. RGO personnel update products and reservation schedules in Google Sheets.
2. Laravel synchronizes the latest data with the database.
3. Students browse available products.
4. Students select a preferred reservation date and time.
5. Reservation information is stored in the database.
6. Available reservation slots are automatically updated.

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend

- Laravel 12
- REST API

### Database

- PostgreSQL _(or MySQL)_

### Authentication

- Google OAuth
- Restricted to `@g.batstate-u.edu.ph` student accounts

### Management

- Google Sheets API

### Deployment

- Vercel (Frontend)
- Laravel-compatible hosting (Backend)

---

## 🚀 Future Enhancements

- Email reservation confirmation
- QR code reservation verification
- Reservation history
- Export reservations to Excel/CSV
- Inventory quantity tracking
- SMS or email pickup reminders

---

## 🎯 Project Objective

The Resource Generation Office Reservation System aims to streamline the product reservation process by allowing students to browse available products and schedule pickup appointments online. By utilizing Google Sheets as the management interface, the system provides a simple and familiar solution for RGO personnel to maintain product information and reservation schedules without requiring a dedicated administrative dashboard.

---

## 👨‍💻 Author

**Jerwin Louise Peria**

Bachelor of Science in Information Technology  
Batangas State University

GitHub: https://github.com/jerwinIT
