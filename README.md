# 💰 Personal Finance Visualizer

A full-stack personal finance dashboard built using **Next.js**, **React**, **shadcn/ui**, **MongoDB**, and **Recharts**. This project was developed as part of a 6-month remote internship assignment at **Yardstick AI**, focused on building responsive and scalable AI-integrated applications.
## 🚀 Live Preview
Live Demo -  https://finance-visualizer-61u1.vercel.app/ 




![Screenshot (366)](https://github.com/user-attachments/assets/d3bb7460-155f-435d-af4e-8529a8c4805f)


![Screenshot (367)](https://github.com/user-attachments/assets/d623a923-9447-45d8-a3a4-19b17c97d04d)

![Screenshot (368)](https://github.com/user-attachments/assets/2fe47781-1978-440a-a59b-631548ac704b)


![Screenshot (369)](https://github.com/user-attachments/assets/72bfe25b-000a-4383-a106-35212369a03c)



![Screenshot (370)](https://github.com/user-attachments/assets/4af6c8a0-5127-4c2d-a76b-34a2dcf19687)




---

## 📌 Features

### ✅ Stage 1 – Basic Transaction Tracking
- Add / Edit / Delete transactions (amount, date, description)
- Transaction list view
- Monthly expenses bar chart (Recharts)
- Basic form validation

### ✅ Stage 2 – Categories
- Predefined transaction categories (Food, Transport, etc.)
- Category-wise pie chart
- Dashboard summary cards:
  - Total expenses
  - Category breakdown
  - Most recent transactions

### ✅ Stage 3 – Budgeting
- Set monthly category budgets
- Budget vs actual comparison chart
- Smart spending insights based on user data

### ✅ Bonus
- Smooth scroll to edit form on transaction edit
- Responsive design with consistent UI (shadcn/ui)
- Error states handled gracefully
- Clean modular folder structure and reusable components

---

## 🛠️ Tech Stack

| Technology   | Purpose                               |
|--------------|----------------------------------------|
| **Next.js**  | Full-stack React framework             |
| **React**    | UI development                         |
| **shadcn/ui**| Professional, accessible components    |
| **MongoDB**  | Database for transactions and budgets  |
| **Recharts** | Data visualizations (bar, pie charts)  |
| **Tailwind CSS 3.4** | Styling framework               |

---

## 🚀 Live Preview

>check githb repo for more detail 
---

## 📂 Folder Structure

finance-visualizer/
├── app/
│ └── api/
│ └── transactions/
│ ├── route.ts // POST, GET
│ └── [id]/route.ts // PUT, DELETE
├── components/
│ ├── TransactionForm.tsx
│ ├── TransactionList.tsx
│ ├── ExpenseBarChart.tsx
│ ├── CategoryPieChart.tsx
│ ├── BudgetForm.tsx
│ ├── BudgetBarChart.tsx
│ ├── SummaryCards.tsx
│ └── Insights.tsx
├── lib/
│ └── db.ts // MongoDB connection
├── models/
│ ├── Transaction.ts
│ └── Budget.ts
├── styles/
│ └── globals.css
├── .env.local // Contains MongoDB URI
├── tailwind.config.ts
└── README.md

```
2. Install Dependencies
npm install
3. Configure Environment Variables
Create .env.local:

MONGODB_URI=mongodb+srv://<your-cluster-url>/financeVisualizer

4. Run Locally
npm run dev
App runs at http://localhost:3000

```



📊 Sample Data to Test
➕ Add Transaction
Amount: 1200

Description: Groceries

Date: 2025-07-01

Category: Food

💰 Set Budgets
Food: 5000

Transport: 3000

Entertainment: 2000

✅ Submission Details
Submission Field	Value
Stage Completed	✅ Stage 3 (All features implemented)
GitHub Repo	github.com/yourusername/finance-visualizer
Live App	your-app.vercel.app
README Provided	✅ Yes
Authentication	❌ Not implemented (per instructions)


Author - Ayush Upadhyay
Email - pusakru202@gmail.com


