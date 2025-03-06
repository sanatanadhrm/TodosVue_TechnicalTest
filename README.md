Todo Lists

Todo Lists adalah aplikasi berbasis Vue 3 yang menggunakan Pinia sebagai state management, Tailwind CSS untuk styling, dan Vite sebagai build tool. Aplikasi ini juga menggunakan Tiptap untuk rich text editing.

🚀 Fitur Utama

Manajemen Todo: CRUD Todo dengan state management menggunakan Pinia.

Editor Teks Kaya (Rich Text Editor): Menggunakan Tiptap untuk mendukung format teks seperti bold, italic, underline, dan lainnya.

Responsif: Menggunakan Tailwind CSS untuk tampilan yang responsif.

API Integration: Menggunakan Axios untuk komunikasi dengan backend.

📦 Teknologi yang Digunakan

Vue 3

Pinia

Tailwind CSS

Vite

Tiptap

Axios

📌 Instalasi

Pastikan Anda sudah menginstal Node.js dan npm atau yarn sebelum menjalankan proyek ini.

# Clone repository ini
git clone https://github.com/sanatanadhrm/TodosVue_TechnicalTest.git
cd TodosVue_TechnicalTest

# Install dependencies
npm install  # atau gunakan yarn install

▶️ Menjalankan Aplikasi

npm run dev  # Menjalankan aplikasi dalam mode development

Aplikasi akan berjalan di http://localhost:5173/ (default Vite).

Aplikasi menggunakan data api dari jsonplacholder
"https://jsonplaceholder.typicode.com/posts"

📁 Struktur Proyek

├── src
│   ├── components  # Komponen Vue
│   ├── store       # State management dengan Pinia
│   ├── lib         # helper tambahan
│   ├── assets      # File statis (ikon, gambar, dll.)
│   ├── app.vue     # Halaman utama
│   ├── main.js     # Entry point aplikasi
├── public          # File publik
├── package.json    # Dependencies dan scripts
├── vite.config.js  # Konfigurasi Vite
└── tailwind.config.js # Konfigurasi Tailwind CSS

Dibuat dengan menggunakan Vue 3 & Vite