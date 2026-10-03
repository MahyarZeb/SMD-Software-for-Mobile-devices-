# 🎓 FLEX Mobile — Academic Portal for Mobile

A mobile-first rebuild of the FAST-NUCES **FLEX** student portal. Same familiar
portal, but redesigned for the phone and rebuilt to solve three specific
problems that FLEX doesn't address.

**Course:** CS4039 – Software for Mobile Devices
**Assignment:** 1 — Open-Ended AI-Assisted Application Development
**Student:** Muhammad Mahyar Zeb
**Instructor:** Junaid Ali Khan
**Deadline:** 3-Oct-2026

---

## 📽️ Demo

A short screen recording and a set of screenshots are provided in
`/screenshots/`. The app runs on any phone via **Expo Go**.

---

## 1. Problem

FLEX is FAST-NUCES's official student portal. It works — but it fails students
in three specific ways that show up the moment you open it on a phone:

### Problem 1 — Desktop tables on a mobile screen

FLEX's Attendance, Marks, and Transcript screens are dense multi-column
tables (`Lecture No | Date | Duration | Presence`, `Quiz # | Weightage | Obtained | Total | Average | Std Dev | Min | Max`, and so on). On a phone,
they require horizontal scrolling and are unreadable at a glance.

### Problem 2 — Nothing useful until the end of the semester

The Marks screen's **Grand Total** stays blank until the semester is over.
By the time it fills in, the student has already lost the chance to fix
anything. There is no running estimate, no "where do I stand right now?"

### Problem 3 — FLEX goes down at the worst moment

During registration week, FLEX is often unreachable. That is _exactly_ the
week students need to check their standing, plan courses, and see if they're
eligible. When it matters most, it isn't there.

### The underlying issue

FLEX's sidebar has **17 tabs** — Home, Course Registration, Attendance, Marks,
Print Admit Card, Marks PLO Report, Transcript, Fee Challan, Fee Details,
Course Feedback, Retake Exam Request, Course Withdraw, Grade Change Request,
Tentative Study Plan, Grade Report, and more.

A student has to visit 17 separate pages to answer one question:

> **"Am I okay this semester?"**

---

## 2. Solution

**FLEX Mobile** is a mobile-first rebuild that:

1. **Collapses 17 tabs into 7** — the ones that affect a student's semester
   outcome. The other 10 are administrative (fees, admit cards, forms) and
   don't belong in an early-warning app.
2. **Replaces tables with cards** — every screen is designed for one-handed
   phone use. No horizontal scrolling. One number per card, readable in a
   second.
3. **Shows a running grade estimate** — the "Grand Total" problem is fixed by
   computing a live letter grade and weighted percentage as marks arrive.
4. **Adds attendance forecasting** — instead of just showing `93%`, the app
   says _"you can miss 2 more classes safely"_ or _"you're 1 class over the
   limit — attend 3 to recover."_
5. **Works offline** — data is local. The app never goes down.

The pitch in one line:

**"FLEX tells you what already happened. FLEX Mobile tells you what's about to go wrong."**

---

## 3. Features

| #   | Tab                 | What it does                                                 |
| --- | ------------------- | ------------------------------------------------------------ |
| 1   | **Home**            | Student info + academic calendar + today's alerts + 3 charts |
| 2   | **Courses**         | Registered courses with search and sort                      |
| 3   | **Attendance**      | Per-course attendance with "safe-to-skip" forecast           |
| 4   | **Marks**           | Per-course running grade estimate with letter grade          |
| 5   | **Transcript**      | Semester history + CGPA progression LineChart                |
| 6   | **Admit Card**      | Exam details + schedule + instructions                       |
| 7   | **Feedback**        | Submit and view anonymous course feedback                    |
| —   | **Course Detail**   | Tapping any course opens a deep-dive view                    |
| —   | **Register Course** | Form with per-field validation                               |

### Charts used (react-native-chart-kit)

- **BarChart** — attendance % per course (Home)
- **ProgressChart** — CGPA ring out of 4.0 (Home)
- **LineChart** — per-assessment marks trend (Course Detail) + CGPA progression (Transcript)

### Dynamic behaviors

- Warning banners appear **only when** a course drops below threshold or assignments are pending
- Risk badges (Good / Warning / At Risk) update live
- Pending count drops when you toggle an assignment to Submitted
- Search, sort, empty states handled everywhere

---

## 4. Setup & Run

### Option A — Expo Snack (recommended)

1. Go to https://snack.expo.dev
2. Paste the contents of `App.js` into the editor
3. Click **"+"** next to **Dependencies** (bottom-left panel)
4. Add these two dependencies:
   - `react-native-chart-kit`
   - `react-native-svg`
5. The app runs automatically on the right side

### Option B — Local

```bash
git clone <your-repo-url>
cd flex-mobile
npm install
npx expo install react-native-chart-kit react-native-svg
npx expo start
```
