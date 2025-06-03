# Chakam 🧾 — Proof, Preserved Onchain

**Chakam** started as a cultural trend on X (formerly Twitter), meaning *"proof"*. When someone says something worth remembering (or calling back), users reply with **“Chakam”** — signaling they've saved the evidence.

Now, it’s an actual app.

## ✨ What It Does

Chakam lets users log in with their **X account**, and submit **tweet links** or **screenshots** as proof.

* 🔗 Tweet links are converted into clean visual snapshots.
* 🖼️ Screenshots are stored directly.
* 🌐 All proofs are uploaded to **Lighthouse** (IPFS + Filecoin) for verifiable, decentralized storage.
* 🧠 Metadata — timestamps, IPFS URIs, user info — is stored in a **Neon PostgreSQL** DB.

Users can:

* 📁 View all their "Chakams"
* ⬇️ Download proofs
* 🔗 Share them with the world

## 🛠️ Stack

* **Frontend**: Next.js 15, TailwindCSS, Radix UI
* **Auth**: better-auth with X OAuth
* **Tweet rendering**: react-tweet
* **Storage**: Lighthouse (IPFS + Filecoin)
* **Database**: Neon + Prisma
* **Snapshot service**: Custom tweet-to-image rendering

## 📦 Repository

This repo is `chakaam-fe` — the frontend of the Chakam app.

> 💡 Backend services, snapshot generator, and cron jobs are in separate internal/private repos.

## 🚧 Current Focus (WebApp)

→ Weekly updates + commits
→ Focus: Dashboard polish, snapshot improvements, upload reliability, mobile responsiveness.

## 📎 Want to Try It?

WIP. A public demo will be available soon — follow [@steffqing](https://x.com/steffqing) for updates.

## 📄 License

MIT
