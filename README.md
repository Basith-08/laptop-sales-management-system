# Laptop Sales Management System (Frontend)

Frontend aplikasi manajemen penjualan laptop berbasis Vue 3, TypeScript, Tailwind CSS, Ant Design Vue, dan Supabase.

## Fitur Utama

- Login menggunakan Supabase Auth
- Dashboard ringkasan finansial berbasis data transaksi API
- Manajemen transaksi (create/update)
- Perhitungan pajak otomatis (PPN 11%, PPh 2.5%)
- UI responsif untuk desktop dan mobile

## Tech Stack

- Vue 3 (`<script setup>`)
- TypeScript
- Vite
- Tailwind CSS v4
- Ant Design Vue
- Supabase (Auth + Database)

## Struktur Singkat

- `src/pages/LoginPage.vue`: halaman login
- `src/pages/DashboardPage.vue`: ringkasan metrik penjualan
- `src/pages/TransactionsPage.vue`: halaman transaksi
- `src/components/layout/*`: header dan sidebar dashboard
- `src/components/transaction/*`: tabel dan form transaksi
- `src/services/*`: integrasi Supabase dan API transaksi
- `src/utils/taxCalculator.ts`: util perhitungan pajak

## Prasyarat

- Node.js 20+ (disarankan LTS)
- npm (atau pnpm/bun)
- Project Supabase aktif

## Setup Lokal

1. Install dependency:

```bash
npm install
```

2. Buat file environment:

```bash
cp .env.example .env
```

3. Isi nilai environment di `.env`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Jalankan aplikasi:

```bash
npm run dev
```

## Scripts

- `npm run dev`: jalankan development server
- `npm run build`: type-check + build production
- `npm run preview`: preview hasil build

## Database (Supabase)

Aplikasi mengakses tabel `transactions` dengan kolom:

- `id` (uuid, primary key)
- `transaction_date` (date/text)
- `customer_name` (text)
- `laptop_brand` (text)
- `laptop_model` (text)
- `price` (numeric)
- `quantity` (numeric/int)
- `subtotal` (numeric)
- `ppn` (numeric)
- `pph` (numeric)
- `total_price` (numeric)
- `created_at` (timestamp)

Catatan: pastikan RLS policy di Supabase sudah sesuai kebutuhan akses aplikasi.
