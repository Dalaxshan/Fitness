# Trainyard Gym CRM

A full-stack gym management system for managing members, trainers, attendance, memberships, and invoices.

## Project Structure

- **trainyard-backend** - NestJS REST API
- **trainyard-frontend** - Next.js web application

## Tech Stack

### Backend
- NestJS
- MongoDB (Mongoose)
- JWT Authentication
- Bull (Queue Management)

### Frontend
- Next.js 13
- React 18
- Material-UI (MUI)
- Redux Toolkit
- Formik & Yup

## Features

- Member management
- Trainer management
- Attendance tracking
- Membership packages
- Invoice generation
- SMS notifications
- Admin dashboard

## Getting Started

### Backend
```bash
cd trainyard-backend
yarn install
yarn start:local
```

### Frontend
```bash
cd trainyard-frontend
yarn install
yarn dev
```

## Environment Variables

Configure `.env` files in both backend and frontend directories before running.
