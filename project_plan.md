# Pehchanly Velocity - Core Project Plan

## Overview
An agency management system built with a premium "Best in Class" stack. An agency admin manages services and project status from a command center. Clients log in to a secure portal to track milestones and drop notes. The public world sees a polished service catalog.

**Project Name:** Pehchanly Velocity
**Architecture:** MERN Stack (MongoDB Atlas, Express, React, Node)
**Deployment:** Vercel (Frontend & Serverless Functions)

## Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Node/Express (Vercel Functions)
- **Database**: MongoDB Atlas (Free Tier)
- **Auth**: JWT (JSON Web Tokens)
- **Notifications**: react-hot-toast

## User Roles
1. **Admin (Agency)**: Dashboard stats ($facet), Service CRUD (modal-based), Project management (status dropdown), Lead inbox.
2. **Client (User)**: Project Roadmap (Progress bar), Milestone timeline (Stepper), Notes CRUD.

## Page UI Structure
- `/` — Premium Landing Page (Hero, Stats, Features)
- `/services` — Service Catalog (Category Filter, Request Modal)
- `/login` — Secure Portal Access (JWT role-based redirect)
- `/dashboard` — Project Roadmap & Notes (Client only)
- `/admin` — High-level Stats (Admin only)
- `/admin/services` — Service Management (Admin only)
- `/admin/projects` — Project Status Control (Admin only)
- `/admin/leads` — Inquiry Management (Admin only)

## Core Entities
- **User**: Name, Email, Password (hashed), Role.
- **Service**: Name, Description, Price, Category, TechStack.
- **Project**: Title, Client, Service, Status, Milestones, Value.
- **Note**: Content tied to a Project and Client.
- **Lead**: Inquiry details (Name, Email, Message) submitted via service modal.

## WOW Factors
- **Secure Portal Architecture**: Multi-layer JWT and role-based guards.
- **MongoDB Aggregations**: Complex `$facet` queries for real-time revenue and project stats.
- **Premium UI Polish**: Responsive Tailwind design, Lucide icons, and `react-hot-toast` on every mutation.
