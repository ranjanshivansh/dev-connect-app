# DevConnect – Demo Video

## Project Overview

DevConnect is a full-stack platform that allows developers to share, explore, and validate projects using an intelligent code-based similarity detection system.

It ensures originality by comparing newly submitted projects with existing ones using both metadata and actual source code.

---

## Demo Video

👇🏽 [Watch the full project demonstration here:]

(https://drive.google.com/file/d/1GQsu1fx9guuTD9Q84xBSG9C1ZT4UfEVP/view?usp=sharing)

---

## Features Demonstrated

- User Authentication (Clerk)
- Project Submission with GitHub Integration
- Automatic Code Extraction using GitHub API
- Similarity Detection System
- Cosine Similarity (Code Comparison)
- Jaccard Similarity (Tags & Description)
- Duplicate Project Detection
- Admin Dashboard (Approve / Reject)
- Voting System
- User Profile with Stats

---

## Highlight: Duplicate Detection

In the demo video:

- A project is submitted using one account  
- The same project is submitted again using another account  
- The system detects high similarity (70–90%)  
- Admin dashboard displays a warning  
- Duplicate project is reviewed and rejected  

---

## Tech Stack

- Frontend: Next.js (App Router) + TypeScript  
- Styling: Tailwind CSS  
- Authentication: Clerk  
- Backend: Server Actions  
- Database: PostgreSQL + Drizzle ORM  
- External API: GitHub API  

---

## How Similarity Works

1. Fetch GitHub repository code  
2. Normalize and tokenize source files  
3. Apply cosine similarity for code comparison  
4. Use Jaccard similarity for text fields  
5. Generate similarity score (0–100%)  

---

## Expected Output

- Same project → 70–95% similarity  
- Similar project → 40–70%  
- Different project → <30%  

---

## Purpose of Demo

This video demonstrates:

- End-to-end workflow of the system  
- Real-time duplicate detection  
- Admin moderation process  
- Practical use of similarity algorithms  

---

## Author

Shivansh Ranjan  
DevConnect Project  

---

## Note

This project showcases a real-world implementation of:

- Full-stack development  
- API integration  
- Algorithm-based similarity detection  
- Admin moderation workflows  