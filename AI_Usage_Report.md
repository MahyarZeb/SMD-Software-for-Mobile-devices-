# AI Usage Report

**Course:** SMD — Software for Mobile Devices
**Assignment:** Mobile Application Development — Open-Ended AI-Assisted Assignment
**Student Name:** Muhammad Mahyar Zeb
**Registration No.:** 23i2031
**Date:** 3-10-2026

---

## 1. AI Tool(s) Used

I used ChatGPT as my main AI helper during this assignment.

I used it only as a coding assistant. It helped me with ideas, with
understanding React Native, with writing the first version of some
code, and with fixing errors.

I did not use GitHub Copilot or any other tool inside my code editor.

Every important decision in the app was made by me — which problem to
solve, which FLEX tabs to keep, how to store the data, and what to put
on each screen.

---

## 2. Purpose of AI Usage

I used AI for these specific things:

- Understanding React and React Native concepts. In particular, how to
  switch between screens using conditional rendering instead of a
  navigation library.

- Fixing errors. When the code editor showed an error message, I
  pasted the error and the surrounding code to the AI and it helped me
  find what went wrong.

- Getting ideas for the dashboard layout. I asked for several options
  and chose the one that looked best.

- Setting up the charts. The AI gave me a starting point for the chart
  settings, which I then changed to use my own course data.

- Understanding unfamiliar code. For example, why the sort function
  changes the original array and why I need to make a copy first.

- Improving the code structure. I grouped repeated pieces of the user
  interface into small reusable parts so the code is cleaner.

The AI did not choose the problem for me. I chose it myself after
looking at real FLEX screenshots and noticing what was actually
broken.

---

## 3. Important Prompts Used

### Prompt 1

I explained the assignment rules to the AI: build a React Native Expo
Snack app for university students. No navigation libraries, no bottom
tabs, no side bars, no Redux, no TypeScript. Use react-native-chart-kit
for the dashboard with at least two chart types. Switch views using a
single state variable and conditional rendering. Only use the concepts
we covered in class — state, props, components, and the main array
methods like map, filter, reduce, find, and sort. Then I asked it to
generate a first draft of a single file app called "Academic Risk
Tracker."

### Prompt 2

I shared screenshots of FLEX and explained its problems. FLEX has 17
tabs in a dark sidebar. The Attendance and Marks screens use dense
tables that are hard to use on a phone. The Grand Total on Marks stays
blank until the end of the semester. FLEX often goes down during
registration week. I asked the AI how to redesign this as a
mobile first app that fixes these problems while still following the
assignment rules.

### Prompt 3

When the code editor showed a parsing error saying the unexpected
token was on line 583, I pasted the error message and the surrounding
code to the AI and asked it to fix the problem without breaking
anything else.

---

## 4. AI Generated Output

The AI gave me these useful things:

1. A first draft of the app file with all the correct imports at the
   top.

2. A working chart settings object for react-native-chart-kit. This
   saved time because the chart library has a lot of small settings.

3. First versions of the calculation functions, like the ones that
   compute attendance percentage, course percentage, CGPA, and risk
   level. I checked each one and changed several of them.

4. The idea of "safe to skip" — showing students how many more
   classes they can miss without falling below the attendance limit.
   The AI mentioned it as a nice extra. I saw that it directly fixes
   one of FLEX's problems and made it a core feature of the app.

5. A way to switch between screens using one state variable and
   conditional rendering, instead of a navigation library.

---

## 5. Changes Made by Me

I changed several important parts of what the AI gave me.

### 1. I rebuilt the data model

The AI's first idea stored marks as a simple list of numbers. I
rejected this and changed it so each course has a list of assessments,
and each assessment has a type, title, marks obtained, total marks,
and its weightage. This matches how FLEX actually stores marks and
makes the running grade estimate correct.

### 2. I rejected the navigation library

When I asked for screen switching, the AI first suggested using a
navigation library. I rejected this because the assignment clearly
forbids it. I replaced it with a single state variable and a top row
of buttons.

### 3. I decided the 17 to 7 tab reduction myself

The AI's first attempt mirrored all 17 FLEX tabs as buttons. I
rejected this and decided to keep only the 7 tabs that affect a
student's semester result.

### 4. I rewrote all the calculation functions

The AI's attendance function did not handle the case of zero total
classes. Its course percentage used a simple average instead of
weighted marks. I rewrote both with proper checks and weighted math.

### 5. I fixed how the state is updated

The AI's version of "mark assignment as submitted" changed the state
directly. I replaced it with a proper update that creates a new list
instead of changing the old one, which is the correct way in React.

### 6. I added field-level validation

The AI's form only checked for empty fields. I added range checks —
credit hours between 1 and 6, attended classes not more than total
classes — and error messages below each input.

### 7. I redesigned the visuals

The AI's first design used cold blues and heavy shadows and looked
AI generated. I rewrote the styles myself, first with warm colors and
then with a navy and blue palette that matches FLEX. I also replaced
the emoji heavy labels with proper FLEX style labels.

---

## 6. My Understanding

Here is my own explanation of the important parts.

### The chart settings

The chart library does not use normal React Native styles. Instead it
takes one settings object that describes the background colour, the
line and bar colour, the axis label colour, and the width of each bar.
This is because the chart library draws to a canvas instead of using
normal views, so it cannot inherit styles the usual way.

### The screen switching

I use one state variable to remember which screen is active. In the
render, I check this variable with a simple condition. When the user
taps a button, the state changes and React re renders only the screen
that matches. This is called conditional rendering, and it is what our
class taught us to use instead of a navigation library.

### The "safe to skip" calculation

The app figures out the maximum number of classes a student is allowed
to miss while staying above the attendance threshold. Then it
subtracts the classes the student has already missed. If the answer is
positive, it shows "you can miss this many more classes." If the
answer is negative, it shows "you are already over the limit, attend
this many classes back to back to recover." FLEX never tells you this
— it only shows a percentage and leaves the math to the student.

### The running grade estimate

The app adds up the weighted score from each graded assessment so far
and divides it by the total weightage that has been graded. This gives
a live percentage. FLEX only calculates its Grand Total at the end of
the semester, but my app recalculates it every time a new assessment
is added.

---

## 7. Verification and Testing

I tested the app step by step, phase by phase, instead of writing
everything and hoping it works.

### What I checked

- I added temporary print statements to the calculation functions and
  confirmed the numbers were correct. CGPA came out to 2.91, average
  attendance to 76 percent, and pending assignments to 2. The Data
  Structures course correctly showed as "At Risk" and the Database
  course correctly showed as "Good." I removed all the print
  statements before submitting.

- I confirmed that all three chart types rendered with real data.

- I tapped all seven tabs and no crash happened.

- I typed random text into the course search box and confirmed the
  "No courses found" message appeared.

- I submitted the Register Course form with empty fields, with
  non numeric credits, and with attended greater than total. All three
  cases showed red error text below the correct field.

- I toggled an assignment from pending to submitted on the Course
  Detail screen and the pending count on the Dashboard dropped from 2
  to 1 immediately.

### Errors I hit and how I fixed them

1. There was a parsing error at line 583 saying an unexpected token
   was found. I had accidentally pasted a block of conditional code
   inside an opening tag instead of replacing it. I deleted the extra
   tag and pasted the correct version.

2. At first the charts did not show on the screen. I realized that a
   small supporting library was missing from the dependencies. I added
   it and the charts appeared.

3. My first CGPA calculation printed "NaN" in the console when a
   course had no assessments yet. I added a check at the start of the
   function so it returns zero in that case.

4. A red error about IndexedDB kept appearing in the browser console.
   I realized this was caused by the Snack web runtime and not by my
   code, because the app still worked correctly. I documented it and
   moved on.

### Changes after testing

- I reduced the chart width slightly because the axis labels were
  getting cut off on the right side.

- I changed the Attendance screen to sort courses from lowest to
  highest, so the worst courses appear at the top.

---

## 8. Reflection

The biggest thing I learned is that AI is very good at writing code
quickly but not good at making design decisions. It wrote the chart
settings in seconds but kept suggesting things that broke the
assignment rules, like using a navigation library. I had to read every
suggestion and reject the ones that did not fit.

I also learned that AI generated code is only useful if I understand
it. When the charts did not show, I had no idea why until I read the
documentation and understood that the chart library needs a small
supporting library. From that point on, I made sure I understood each
piece before using it.

The best ideas in this app did not come from AI. The decision to cut
the 17 tabs down to 7, the "safe to skip" feature, and the running
grade estimate were all my own ideas, based on looking at real FLEX
screenshots. AI helped me build them, but I decided what to build.

Finally, I learned that testing shows mistakes. Seeing NaN in the
console showed me exactly where my logic was wrong. AI code can look
correct, but only testing proves that it actually is.

---

## Student Declaration

I confirm that I have used AI tools only as a development assistant
and that I understand the code submitted as part of this assignment.
I am able to explain and demonstrate the functionality of my
application.

**Student Name:** Muhammad Mahyar Zeb
**Signature:** Muhammad Mahyar Zeb
**Date:** 3-10-2026