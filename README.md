# BarmaBiz — Multi-Vendor E-Commerce SaaS & Marketplace (Kenya)

**BarmaBiz** is a full-stack Multi-Vendor E-Commerce SaaS & Marketplace platform built with **Python FastAPI** and **React (Vite + Tailwind CSS)**. It combines a Jumia-style centralized marketplace with dedicated, autonomous vendor storefronts and M-Pesa Escrow & Split Payouts.

---

## Architecture Overview

1. **Buyer Marketplace & Dedicated Vendor Storefronts (`/`)**
   - Browse verified Kenyan merchants and products across categories.
   - Visit individual merchant shops (`/store/:slug`) with custom branding, banners, and verified badges.
   - Multi-vendor shopping cart with automatic **M-Pesa Daraja STK Push** checkout.
   - Buyer funds are held in **Platform Escrow** until the vendor fulfills the order.

2. **Autonomous Vendor Admin Portal (`Vendor Portal`)**
   - **Self-Service Onboarding**: Any seller can click **"Sell on BarmaBiz"** to launch their online shop in seconds.
   - **Product Catalog Manager**: Full CRUD (Add, Edit, Delete products, manage pricing, stock, categories, and images).
   - **Order Fulfillment & Escrow Release**: Vendors manage their own sub-orders (*Paid in Escrow* ➔ *Packed* ➔ *Dispatched* ➔ *Delivered*). Marking an order as **Delivered** automatically releases the vendor's net payout (minus platform commission) into their **Available M-Pesa Wallet**.
   - **M-Pesa B2C Instant Withdrawals**: Vendors can withdraw their available wallet balance directly to their registered M-Pesa phone number (`2547XXXXXXXX`).
   - **Storefront Customizer**: Customize store name, bio, logo, cover banner, category, and M-Pesa payout phone number.

3. **SuperAdmin Control Center (`SuperAdmin Owner`)**
   - Real-time **Gross Merchandise Volume (GMV)**, **Platform Commission Revenue**, and **Active Escrow Ledger** metrics.
   - **Vendor KYC & Commission Controls**: Verify/suspend vendor stores and dynamically adjust individual vendor commission percentages.
   - **Global Escrow & B2C Payout Ledger**: Audit every multi-vendor order split and M-Pesa B2C disbursement.

---

## Project Structure

```text
barmabiz/
├── backend/
│   ├── database.py       # SQLAlchemy SQLite engine & session management
│   ├── models.py         # Relational models (User, VendorStore, Product, Order, SubOrder, PayoutTransaction)
│   ├── schemas.py        # Pydantic request/response schemas
│   ├── main.py           # FastAPI application, REST endpoints, Escrow engine & auto-seeder
│   └── requirements.txt  # Python dependencies
└── frontend/
    ├── index.html        # Entry HTML with Tailwind CSS & Plus Jakarta Sans font
    ├── package.json      # React + Vite + Lucide icons configuration
    ├── vite.config.js    # Vite dev server with /api proxy to FastAPI (port 8000)
    └── src/
        ├── main.jsx      # React DOM entry
        └── App.jsx       # Complete 3-tier Marketplace, Vendor Portal & SuperAdmin UI
```

---

## Running Locally

### 1. Start the Python FastAPI Backend (Port `8001`)
```bash
cd barmabiz/backend
pip3 install -r requirements.txt
python3 -m uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```
- **API Base URL**: `http://localhost:8001/api`
- **Interactive Swagger Docs**: `http://localhost:8001/docs`

### 2. Start the React Frontend (Port `5174`)
```bash
cd barmabiz/frontend
npm install
npm run dev
```
- **Web App**: `http://localhost:5174`
