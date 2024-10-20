This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Getting Started
Prerequisites
- Node.js (v14+ recommended)
- Python (v3.8+ recommended)
- MySQL (or any other supported database)
- Backend Setup (Flask)

## Backend Setup 

```bash
cd server
```

*** Create a virtual environment and install the necessary dependencies

```bash
python -m venv venv
source venv/bin/activate 
pip install -r requirements.txt
```

*** initialite flask

```bash
flask db init  
flask db migrate -m "Initial migration."
flask db upgrade
```

*** running flask server
```bash
python app.py or flask run
```



## Frontend Setup

```bash
cd simpleelearning
```

```bash
npm install
```

```bash
npm run dev
```
### Build and Deployment
- To build the Next.js application for production:

```bash
npm run build
```

```bash
npm start
```