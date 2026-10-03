// ═══════════════════════════════════════════════════════════════
// FLEX Mobile — Academic Portal for Mobile
// Software for Mobile Devices (Assignment 1)
//
// Pitch: "17 FLEX tabs → 7 mobile-first tabs. Three problems fixed."
//   1. Desktop tables        → mobile cards
//   2. Grand Total blank     → running estimate always on
//   3. Down during registr.  → local-first, always available
// ═══════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LineChart, BarChart, ProgressChart } from 'react-native-chart-kit';

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════

const ATTENDANCE_THRESHOLD = 75;
const RISK_THRESHOLD = 60;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CHART_WIDTH = SCREEN_WIDTH - 72;

const COLORS = {
  navy: '#1F2B54',
  navySoft: '#2E3D6E',
  blue: '#2563EB',
  blueSoft: '#DBEAFE',
  paper: '#F7F8FB',
  card: '#FFFFFF',
  ink: '#0F172A',
  muted: '#64748B',
  line: '#E2E8F0',
  good: '#059669',
  goodSoft: '#D1FAE5',
  warn: '#D97706',
  warnSoft: '#FEF3C7',
  bad: '#DC2626',
  badSoft: '#FEE2E2',
};

// ═══════════════════════════════════════════════════════════════
// STUDENT
// ═══════════════════════════════════════════════════════════════

const STUDENT = {
  name: 'Muhammad Mahyar Zeb',
  rollNo: '23I-2031',
  degree: 'BS(SE)',
  batch: 'Fall 2023',
  section: 'BSE-233A',
  campus: 'Islamabad',
  status: 'Current',
};

const ACADEMIC_CALENDAR = {
  registration: '14-Aug-2026 to 30-Aug-2026',
  classes: '17-Aug-2026 to 11-Dec-2026',
  feedback1: '14-Sep-2026 to 23-Sep-2026',
  withdraw: '22-Aug-2026 to 11-Dec-2026',
};

// ═══════════════════════════════════════════════════════════════
// CURRENT COURSES
// ═══════════════════════════════════════════════════════════════

const initialCourses = [
  {
    id: 1,
    code: 'AI4009',
    name: 'Generative AI',
    section: 'BSE-7A',
    creditHours: 3,
    totalClasses: 24,
    attended: 22,
    assessments: [
      {
        id: 1,
        type: 'Quiz',
        title: 'Quiz 1',
        obtained: 8,
        total: 10,
        weightage: 10,
      },
      {
        id: 2,
        type: 'Quiz',
        title: 'Quiz 2',
        obtained: 7,
        total: 10,
        weightage: 10,
      },
      {
        id: 3,
        type: 'Assignment',
        title: 'Prompt Engineering',
        obtained: 15,
        total: 20,
        weightage: 15,
      },
    ],
    assignments: [
      { id: 1, title: 'Final Project', due: '2026-12-01', submitted: false },
    ],
  },
  {
    id: 2,
    code: 'CS3002',
    name: 'Design & Analysis of Algorithms',
    section: 'BSE-5A',
    creditHours: 3,
    totalClasses: 28,
    attended: 19,
    assessments: [
      {
        id: 1,
        type: 'Quiz',
        title: 'Quiz 1',
        obtained: 6,
        total: 10,
        weightage: 10,
      },
      {
        id: 2,
        type: 'Assignment',
        title: 'Greedy',
        obtained: 12,
        total: 20,
        weightage: 15,
      },
      {
        id: 3,
        type: 'Assignment',
        title: 'DP',
        obtained: 14,
        total: 20,
        weightage: 15,
      },
    ],
    assignments: [
      { id: 1, title: 'Graph Algorithms', due: '2026-10-15', submitted: false },
      { id: 2, title: 'NP Completeness', due: '2026-11-01', submitted: false },
    ],
  },
  {
    id: 3,
    code: 'CS3006',
    name: 'Operating Systems',
    section: 'BSE-4A',
    creditHours: 3,
    totalClasses: 30,
    attended: 28,
    assessments: [
      {
        id: 1,
        type: 'Quiz',
        title: 'Quiz 1',
        obtained: 9,
        total: 10,
        weightage: 10,
      },
      {
        id: 2,
        type: 'Assignment',
        title: 'Scheduling',
        obtained: 18,
        total: 20,
        weightage: 15,
      },
    ],
    assignments: [],
  },
  {
    id: 4,
    code: 'CS4039',
    name: 'Software for Mobile Devices',
    section: 'BSE-7A',
    creditHours: 3,
    totalClasses: 26,
    attended: 24,
    assessments: [
      {
        id: 1,
        type: 'Quiz',
        title: 'Quiz 1',
        obtained: 8,
        total: 10,
        weightage: 10,
      },
      {
        id: 2,
        type: 'Assignment',
        title: 'Assignment 1',
        obtained: 18,
        total: 20,
        weightage: 15,
      },
    ],
    assignments: [
      {
        id: 1,
        title: 'Assignment 1 — Final',
        due: '2026-09-20',
        submitted: false,
      },
    ],
  },
  {
    id: 5,
    code: 'SE4033',
    name: 'Software Quality Engineering',
    section: 'BSE-5A',
    creditHours: 3,
    totalClasses: 26,
    attended: 17,
    assessments: [
      {
        id: 1,
        type: 'Quiz',
        title: 'Quiz 1',
        obtained: 5,
        total: 10,
        weightage: 10,
      },
      {
        id: 2,
        type: 'Assignment',
        title: 'Test Plan',
        obtained: 10,
        total: 20,
        weightage: 15,
      },
      {
        id: 3,
        type: 'Assignment',
        title: 'Bug Report',
        obtained: 12,
        total: 20,
        weightage: 15,
      },
    ],
    assignments: [
      { id: 1, title: 'QA Report', due: '2026-11-10', submitted: false },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// TRANSCRIPT HISTORY (for Transcript tab)
// ═══════════════════════════════════════════════════════════════

const transcript = [
  {
    id: 1,
    semester: 'Fall 2024',
    sgpa: 2.85,
    cgpa: 2.85,
    credits: 15,
    courses: [
      {
        code: 'EE2003',
        name: 'Computer Organization',
        grade: 'B',
        points: 3.0,
        credits: 3,
      },
      {
        code: 'SS1014',
        name: 'Expository Writing',
        grade: 'B+',
        points: 3.33,
        credits: 3,
      },
      {
        code: 'MT1008',
        name: 'Multivariable Calculus',
        grade: 'B-',
        points: 2.67,
        credits: 3,
      },
      {
        code: 'CS2009',
        name: 'Intro to Programming',
        grade: 'B',
        points: 3.0,
        credits: 3,
      },
      {
        code: 'SE2001',
        name: 'Software Engineering I',
        grade: 'B-',
        points: 2.67,
        credits: 3,
      },
    ],
  },
  {
    id: 2,
    semester: 'Spring 2025',
    sgpa: 3.1,
    cgpa: 2.98,
    credits: 15,
    courses: [
      {
        code: 'MT2005',
        name: 'Probability & Statistics',
        grade: 'A-',
        points: 3.67,
        credits: 3,
      },
      {
        code: 'CS2009',
        name: 'Data Structures',
        grade: 'B+',
        points: 3.33,
        credits: 3,
      },
      {
        code: 'CS2015',
        name: 'Database Systems',
        grade: 'B',
        points: 3.0,
        credits: 3,
      },
      {
        code: 'SE2002',
        name: 'Software Engineering II',
        grade: 'B+',
        points: 3.33,
        credits: 3,
      },
      {
        code: 'SS2012',
        name: 'Technical Writing',
        grade: 'A-',
        points: 3.67,
        credits: 3,
      },
    ],
  },
  {
    id: 3,
    semester: 'Fall 2025',
    sgpa: 3.27,
    cgpa: 3.08,
    credits: 15,
    courses: [
      {
        code: 'CS3002',
        name: 'Design & Analysis of Algorithms',
        grade: 'B',
        points: 3.0,
        credits: 3,
      },
      {
        code: 'CS3006',
        name: 'Operating Systems',
        grade: 'B+',
        points: 3.33,
        credits: 3,
      },
      {
        code: 'SE3005',
        name: 'Software Construction',
        grade: 'A-',
        points: 3.67,
        credits: 3,
      },
      {
        code: 'SE3002',
        name: 'Software Quality Engineering',
        grade: 'B+',
        points: 3.33,
        credits: 3,
      },
      {
        code: 'AI3001',
        name: 'Intro to AI',
        grade: 'A-',
        points: 3.67,
        credits: 3,
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// FEEDBACK
// ═══════════════════════════════════════════════════════════════

const initialFeedback = [
  {
    id: 1,
    courseCode: 'CS4039',
    rating: 5,
    comment: 'Mobile-dev focused. Good practical assignments.',
  },
];

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

const calcAttendance = (attended = 0, total = 1) =>
  total === 0 ? 0 : Math.round((attended / total) * 100);

const calcCoursePercentage = (course) => {
  if (!course.assessments || course.assessments.length === 0) return 0;
  const obtained = course.assessments.reduce(
    (s, a) => s + (a.obtained / a.total) * a.weightage,
    0
  );
  const possible = course.assessments.reduce((s, a) => s + a.weightage, 0);
  return possible === 0 ? 0 : Math.round((obtained / possible) * 100);
};

const calcSafeToSkip = (attended, total, threshold = ATTENDANCE_THRESHOLD) => {
  const maxAllowed = Math.floor(((100 - threshold) / 100) * total);
  return maxAllowed - (total - attended);
};

const calcNeededToRecover = (
  attended,
  total,
  threshold = ATTENDANCE_THRESHOLD
) => Math.max(Math.ceil((threshold / 100) * total - attended), 0);

const pctToLetter = (pct) => {
  if (pct >= 90) return 'A';
  if (pct >= 85) return 'A-';
  if (pct >= 80) return 'B+';
  if (pct >= 75) return 'B';
  if (pct >= 70) return 'B-';
  if (pct >= 65) return 'C+';
  if (pct >= 60) return 'C';
  if (pct >= 55) return 'C-';
  if (pct >= 50) return 'D';
  return 'F';
};

const getRiskLevel = (course) => {
  const att = calcAttendance(course.attended, course.totalClasses);
  const pct = calcCoursePercentage(course);
  if (att < ATTENDANCE_THRESHOLD || pct < RISK_THRESHOLD) return 'At Risk';
  if (att < ATTENDANCE_THRESHOLD + 10 || pct < 70) return 'Warning';
  return 'Good';
};

const getRiskPalette = (level) => {
  if (level === 'At Risk') return { fg: COLORS.bad, bg: COLORS.badSoft };
  if (level === 'Warning') return { fg: COLORS.warn, bg: COLORS.warnSoft };
  return { fg: COLORS.good, bg: COLORS.goodSoft };
};

const calcCGPA = (courses) => {
  if (courses.length === 0) return 0;
  const pts = courses.reduce(
    (s, c) => s + (calcCoursePercentage(c) / 100) * 4 * c.creditHours,
    0
  );
  const cr = courses.reduce((s, c) => s + c.creditHours, 0);
  return cr === 0 ? 0 : Math.round((pts / cr) * 100) / 100;
};

const calcAvgAttendance = (courses) => {
  if (courses.length === 0) return 0;
  const t = courses.reduce(
    (s, c) => s + calcAttendance(c.attended, c.totalClasses),
    0
  );
  return Math.round(t / courses.length);
};

const countPending = (courses) =>
  courses.reduce(
    (n, c) => n + c.assignments.filter((a) => !a.submitted).length,
    0
  );

// Grade point to letter (for transcript)
const gradeColor = (letter) => {
  if (letter.startsWith('A')) return COLORS.good;
  if (letter.startsWith('B')) return COLORS.blue;
  if (letter.startsWith('C')) return COLORS.warn;
  return COLORS.bad;
};

// ═══════════════════════════════════════════════════════════════
// REUSABLE COMPONENTS
// ═══════════════════════════════════════════════════════════════

const Stat = ({ label, value, sublabel, fg = COLORS.ink }) => (
  <View style={styles.stat}>
    <Text style={[styles.statValue, { color: fg }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
    {sublabel ? <Text style={styles.statSub}>{sublabel}</Text> : null}
  </View>
);

const Pill = ({ text, fg, bg }) => (
  <View style={[styles.pill, { backgroundColor: bg }]}>
    <Text style={[styles.pillText, { color: fg }]}>{text}</Text>
  </View>
);

const RiskPill = ({ level }) => {
  const p = getRiskPalette(level);
  return <Pill text={level} fg={p.fg} bg={p.bg} />;
};

const AttendanceBar = ({
  attended,
  total,
  threshold = ATTENDANCE_THRESHOLD,
}) => {
  const pct = calcAttendance(attended, total);
  const fg =
    pct < threshold
      ? COLORS.bad
      : pct < threshold + 10
      ? COLORS.warn
      : COLORS.good;
  return (
    <View style={{ marginTop: 6 }}>
      <View style={styles.barTrack}>
        <View
          style={[styles.barFill, { width: `${pct}%`, backgroundColor: fg }]}
        />
      </View>
      <View style={styles.barRow}>
        <Text style={[styles.barText, { color: fg }]}>{pct}%</Text>
        <Text style={styles.barSub}>
          {attended} of {total} classes
        </Text>
      </View>
    </View>
  );
};

const CourseRow = ({ course, onPress, subtitle }) => {
  const level = getRiskLevel(course);
  return (
    <TouchableOpacity
      style={styles.courseRow}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.courseRowTop}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text style={styles.courseCode}>
            {course.code} · {course.section}
          </Text>
          <Text style={styles.courseName}>{course.name}</Text>
          {subtitle ? <Text style={styles.courseSub}>{subtitle}</Text> : null}
        </View>
        <RiskPill level={level} />
      </View>
      <AttendanceBar attended={course.attended} total={course.totalClasses} />
    </TouchableOpacity>
  );
};

const Empty = ({ title, hint, actionLabel, onAction }) => (
  <View style={styles.empty}>
    <View style={styles.emptyCircle}>
      <Text style={styles.emptyDot}>·</Text>
    </View>
    <Text style={styles.emptyTitle}>{title}</Text>
    {hint ? <Text style={styles.emptyHint}>{hint}</Text> : null}
    {actionLabel && onAction ? (
      <TouchableOpacity style={styles.btnPrimary} onPress={onAction}>
        <Text style={styles.btnPrimaryText}>{actionLabel}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const Field = ({
  label,
  value,
  onChangeText,
  error,
  hint,
  keyboardType = 'default',
  placeholder = '',
  multiline = false,
}) => (
  <View style={styles.field}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        multiline && { height: 90, paddingTop: 10, textAlignVertical: 'top' },
        error && { borderColor: COLORS.bad },
      ]}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor={COLORS.muted}
      multiline={multiline}
    />
    {error ? (
      <Text style={styles.err}>{error}</Text>
    ) : hint ? (
      <Text style={styles.hint}>{hint}</Text>
    ) : null}
  </View>
);

const Banner = ({ text, tone = 'warn' }) => {
  const p =
    tone === 'bad'
      ? { fg: COLORS.bad, bg: COLORS.badSoft }
      : tone === 'good'
      ? { fg: COLORS.good, bg: COLORS.goodSoft }
      : { fg: COLORS.warn, bg: COLORS.warnSoft };
  return (
    <View
      style={[styles.banner, { backgroundColor: p.bg, borderLeftColor: p.fg }]}>
      <Text style={[styles.bannerText, { color: p.fg }]}>{text}</Text>
    </View>
  );
};

const Section = ({ eyebrow, children }) => (
  <View style={{ marginTop: 22 }}>
    {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
    {children}
  </View>
);

const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const InfoPanel = ({ title, rows }) => (
  <View style={styles.infoPanel}>
    <View style={styles.infoPanelHead}>
      <Text style={styles.infoPanelTitle}>{title}</Text>
    </View>
    <View style={styles.infoPanelBody}>
      {rows.map((r, i) => (
        <View key={i} style={styles.infoRow}>
          <Text style={styles.infoLabel}>{r.label}</Text>
          <Text style={styles.infoValue}>{r.value}</Text>
        </View>
      ))}
    </View>
  </View>
);

// ═══════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════

export default function App() {
  const [courses, setCourses] = useState(initialCourses);
  const [feedback, setFeedback] = useState(initialFeedback);
  const [view, setView] = useState('home');
  const [openId, setOpenId] = useState(null);

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('code');

  const [fName, setFName] = useState('');
  const [fCode, setFCode] = useState('');
  const [fCr, setFCr] = useState('');
  const [fTot, setFTot] = useState('');
  const [fAtt, setFAtt] = useState('');
  const [fErr, setFErr] = useState({});

  const [fbCode, setFbCode] = useState('');
  const [fbRate, setFbRate] = useState(0);
  const [fbText, setFbText] = useState('');
  const [fbErr, setFbErr] = useState('');

  const go = (v) => setView(v);
  const open = (id) => {
    setOpenId(id);
    setView('detail');
  };

  const toggleAssignment = (courseId, aId) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? {
              ...c,
              assignments: c.assignments.map((a) =>
                a.id === aId ? { ...a, submitted: !a.submitted } : a
              ),
            }
          : c
      )
    );
  };

  const submitCourse = () => {
    const e = {};
    if (!fName.trim()) e.name = 'Course name is required';
    if (!fCode.trim()) e.code = 'Course code is required';
    const cr = parseInt(fCr, 10);
    if (!fCr || isNaN(cr) || cr < 1 || cr > 6)
      e.cr = 'Credits must be between 1 and 6';
    const t = parseInt(fTot, 10);
    if (!fTot || isNaN(t) || t <= 0)
      e.tot = 'Total classes must be greater than 0';
    const a = parseInt(fAtt, 10);
    if (fAtt === '' || isNaN(a) || a < 0 || a > t)
      e.att = `Attended must be between 0 and ${t || 0}`;
    setFErr(e);
    if (Object.keys(e).length) return;

    setCourses((p) => [
      ...p,
      {
        id: Date.now(),
        name: fName.trim(),
        code: fCode.trim().toUpperCase(),
        section: 'BSE-NEW',
        creditHours: cr,
        totalClasses: t,
        attended: a,
        assessments: [],
        assignments: [],
      },
    ]);
    setFName('');
    setFCode('');
    setFCr('');
    setFTot('');
    setFAtt('');
    setFErr({});
    Alert.alert('Registered', 'Course added to your portal.');
    go('courses');
  };

  const submitFeedback = () => {
    if (!fbCode.trim() || fbRate === 0 || !fbText.trim()) {
      setFbErr('Add course code, a rating, and a comment.');
      return;
    }
    setFeedback((p) => [
      ...p,
      {
        id: Date.now(),
        courseCode: fbCode.trim().toUpperCase(),
        rating: fbRate,
        comment: fbText.trim(),
      },
    ]);
    setFbCode('');
    setFbRate(0);
    setFbText('');
    setFbErr('');
    Alert.alert('Sent', 'Feedback recorded.');
  };

  const chartConfig = {
    backgroundGradientFrom: COLORS.card,
    backgroundGradientTo: COLORS.card,
    decimalPlaces: 0,
    color: (o = 1) => `rgba(37, 99, 235, ${o})`,
    labelColor: (o = 1) => `rgba(15, 23, 42, ${o})`,
    barPercentage: 0.55,
    propsForBackgroundLines: { stroke: COLORS.line, strokeDasharray: '3' },
  };

  // ─── Nav (7 tabs, still mobile-first) ─────────────────
  const Nav = () => (
    <View style={styles.navWrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.nav}>
        {[
          { k: 'home', label: 'Home' },
          { k: 'courses', label: 'Courses' },
          { k: 'attendance', label: 'Attendance' },
          { k: 'marks', label: 'Marks' },
          { k: 'transcript', label: 'Transcript' },
          { k: 'admit', label: 'Admit Card' },
          { k: 'feedback', label: 'Feedback' },
        ].map((b) => (
          <TouchableOpacity
            key={b.k}
            style={styles.navBtn}
            onPress={() => go(b.k)}
            activeOpacity={0.7}>
            <Text style={[styles.navText, view === b.k && styles.navTextOn]}>
              {b.label}
            </Text>
            {view === b.k && <View style={styles.navDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  // ═════════════════════════════════════════════════════
  // HOME
  // ═════════════════════════════════════════════════════
  const Home = () => {
    const cgpa = calcCGPA(courses);
    const att = calcAvgAttendance(courses);
    const pending = countPending(courses);
    const atRisk = courses.filter((c) => getRiskLevel(c) === 'At Risk');

    const barLabels = courses.map((c) => c.code);
    const barData = courses.map((c) =>
      calcAttendance(c.attended, c.totalClasses)
    );

    return (
      <ScrollView
        contentContainerStyle={styles.pad}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.helloSmall}>Welcome back</Text>
        <Text style={styles.helloBig}>{STUDENT.name}</Text>

        <InfoPanel
          title="University Information"
          rows={[
            { label: 'Roll No', value: STUDENT.rollNo },
            { label: 'Degree', value: STUDENT.degree },
            { label: 'Batch', value: STUDENT.batch },
            { label: 'Section', value: STUDENT.section },
            { label: 'Campus', value: STUDENT.campus },
            { label: 'Status', value: STUDENT.status },
          ]}
        />

        <InfoPanel
          title="Academic Calendar"
          rows={[
            { label: 'Registration', value: ACADEMIC_CALENDAR.registration },
            { label: 'Classes', value: ACADEMIC_CALENDAR.classes },
            { label: 'Feedback #1', value: ACADEMIC_CALENDAR.feedback1 },
            { label: 'Withdraw', value: ACADEMIC_CALENDAR.withdraw },
          ]}
        />

        <Section eyebrow="Today's alerts">
          {atRisk.length > 0 ? (
            <Banner
              tone="bad"
              text={`${atRisk.length} course${
                atRisk.length > 1 ? 's' : ''
              } below threshold — ${atRisk.map((c) => c.code).join(', ')}`}
            />
          ) : (
            <Banner
              tone="good"
              text="All courses above thresholds. Keep it up."
            />
          )}
          {pending > 0 && (
            <Banner
              text={`${pending} assignment${
                pending > 1 ? 's' : ''
              } pending submission.`}
            />
          )}
        </Section>

        <Section eyebrow="This semester">
          <View style={styles.statsRow}>
            <Stat
              label="CGPA"
              value={cgpa.toFixed(2)}
              sublabel={`${pctToLetter(cgpa * 25)} · out of 4.0`}
            />
            <Stat
              label="Attendance"
              value={`${att}%`}
              sublabel={
                att < ATTENDANCE_THRESHOLD ? 'Below safe line' : 'On track'
              }
              fg={att < ATTENDANCE_THRESHOLD ? COLORS.bad : COLORS.good}
            />
            <Stat
              label="Pending"
              value={pending}
              sublabel={pending === 0 ? 'All clear' : 'Tasks left'}
            />
          </View>
        </Section>

        <Section eyebrow="Attendance by course">
          <Card>
            <BarChart
              data={{ labels: barLabels, datasets: [{ data: barData }] }}
              width={CHART_WIDTH}
              height={210}
              yAxisSuffix="%"
              fromZero
              chartConfig={chartConfig}
              style={{ marginLeft: -12, borderRadius: 12 }}
              showValuesOnTopOfBars
              withInnerLines={false}
            />
          </Card>
        </Section>

        <Section eyebrow="Progress to graduation">
          <Card>
            <ProgressChart
              data={{ labels: ['CGPA'], data: [Math.min(cgpa / 4, 1)] }}
              width={CHART_WIDTH}
              height={200}
              strokeWidth={14}
              radius={30}
              chartConfig={{
                ...chartConfig,
                color: (o = 1) =>
                  cgpa < 2
                    ? `rgba(220, 38, 38, ${o})`
                    : cgpa < 3
                    ? `rgba(217, 119, 6, ${o})`
                    : `rgba(5, 150, 105, ${o})`,
              }}
              hideLegend={false}
              style={{ marginLeft: -8 }}
            />
          </Card>
        </Section>
      </ScrollView>
    );
  };

  // ═════════════════════════════════════════════════════
  // COURSES
  // ═════════════════════════════════════════════════════
  const Courses = () => {
    let list = courses.filter(
      (c) =>
        search.trim() === '' ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase())
    );
    list = [...list].sort((a, b) => {
      if (sortBy === 'code') return a.code.localeCompare(b.code);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (
        calcAttendance(b.attended, b.totalClasses) -
        calcAttendance(a.attended, a.totalClasses)
      );
    });

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.listHead}>
          <Text style={styles.pageTitle}>Registered Courses</Text>
          <Text style={styles.pageSub}>Fall 2026</Text>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={styles.search}
            placeholder="Search by course code or name…"
            placeholderTextColor={COLORS.muted}
            value={search}
            onChangeText={setSearch}
          />
          <View style={styles.chipsRow}>
            <TouchableOpacity
              style={styles.sortBtn}
              onPress={() =>
                setSortBy((s) =>
                  s === 'code' ? 'name' : s === 'name' ? 'attendance' : 'code'
                )
              }>
              <Text style={styles.sortBtnText}>
                Sort ·{' '}
                {sortBy === 'code'
                  ? 'Code'
                  : sortBy === 'name'
                  ? 'Name'
                  : 'Attendance'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {list.length === 0 ? (
          <Empty
            title="No courses found"
            hint="Try a different search."
            actionLabel="Register a course"
            onAction={() => go('add')}
          />
        ) : (
          <FlatList
            data={list}
            keyExtractor={(i) => i.id.toString()}
            renderItem={({ item }) => (
              <CourseRow
                course={item}
                onPress={() => open(item.id)}
                subtitle={`${item.creditHours} credit hours`}
              />
            )}
            contentContainerStyle={{ paddingBottom: 40, paddingTop: 8 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
  };

  // ═════════════════════════════════════════════════════
  // ATTENDANCE
  // ═════════════════════════════════════════════════════
  const Attendance = () => {
    const sorted = [...courses].sort(
      (a, b) =>
        calcAttendance(a.attended, a.totalClasses) -
        calcAttendance(b.attended, b.totalClasses)
    );

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.listHead}>
          <Text style={styles.pageTitle}>Attendance</Text>
          <Text style={styles.pageSub}>Lowest first</Text>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}>
          {sorted.map((c) => {
            const pct = calcAttendance(c.attended, c.totalClasses);
            const safe = calcSafeToSkip(c.attended, c.totalClasses);
            const needed = calcNeededToRecover(c.attended, c.totalClasses);
            const over = safe < 0;
            return (
              <TouchableOpacity
                key={c.id}
                style={styles.attendCard}
                onPress={() => open(c.id)}
                activeOpacity={0.7}>
                <View style={styles.attendTop}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.courseCode}>
                      {c.code} · {c.section}
                    </Text>
                    <Text style={styles.courseName}>{c.name}</Text>
                  </View>
                  <Text
                    style={[
                      styles.attendPct,
                      {
                        color:
                          pct < ATTENDANCE_THRESHOLD
                            ? COLORS.bad
                            : pct < ATTENDANCE_THRESHOLD + 10
                            ? COLORS.warn
                            : COLORS.good,
                      },
                    ]}>
                    {pct}%
                  </Text>
                </View>
                <AttendanceBar attended={c.attended} total={c.totalClasses} />
                <View style={styles.forecast}>
                  {over ? (
                    <Text style={[styles.forecastText, { color: COLORS.bad }]}>
                      Attend {needed} class{needed === 1 ? '' : 'es'} to recover
                      above {ATTENDANCE_THRESHOLD}%
                    </Text>
                  ) : (
                    <Text style={[styles.forecastText, { color: COLORS.good }]}>
                      Can skip {safe} class{safe === 1 ? '' : 'es'} safely
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  // ═════════════════════════════════════════════════════
  // MARKS
  // ═════════════════════════════════════════════════════
  const Marks = () => {
    const sorted = [...courses].sort(
      (a, b) => calcCoursePercentage(a) - calcCoursePercentage(b)
    );

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.listHead}>
          <Text style={styles.pageTitle}>Marks</Text>
          <Text style={styles.pageSub}>Running estimates</Text>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}>
          {sorted.map((c) => {
            const pct = calcCoursePercentage(c);
            const letter = pctToLetter(pct);
            const graded = c.assessments.length;
            return (
              <TouchableOpacity
                key={c.id}
                style={styles.markCard}
                onPress={() => open(c.id)}
                activeOpacity={0.7}>
                <View style={styles.markTop}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.courseCode}>
                      {c.code} · {c.section}
                    </Text>
                    <Text style={styles.courseName}>{c.name}</Text>
                    <Text style={styles.markMeta}>
                      {graded} assessment{graded === 1 ? '' : 's'} graded
                    </Text>
                  </View>
                  <View style={styles.gradeCircle}>
                    <Text style={styles.gradeCircleLetter}>{letter}</Text>
                    <Text style={styles.gradeCirclePct}>{pct}%</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  // ═════════════════════════════════════════════════════
  // TRANSCRIPT — new tab
  // ═════════════════════════════════════════════════════
  const Transcript = () => {
    const cgpaTrend = {
      labels: transcript.map((t) => t.semester.split(' ')[0]), // Fall, Spring, Fall
      datasets: [{ data: transcript.map((t) => t.cgpa) }],
    };

    const totalCredits = transcript.reduce((s, t) => s + t.credits, 0);
    const finalCgpa = transcript[transcript.length - 1].cgpa;

    return (
      <ScrollView
        contentContainerStyle={styles.pad}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Transcript</Text>
        <Text style={styles.pageSub}>Semester-wise grade history</Text>

        <View style={styles.statsRow}>
          <Stat label="Cumulative CGPA" value={finalCgpa.toFixed(2)} />
          <Stat label="Semesters" value={transcript.length} />
          <Stat label="Credits earned" value={totalCredits} />
        </View>

        <Section eyebrow="CGPA progression">
          <Card>
            <LineChart
              data={cgpaTrend}
              width={CHART_WIDTH}
              height={200}
              chartConfig={chartConfig}
              bezier
              style={{ marginLeft: -12, borderRadius: 12 }}
              withInnerLines={false}
              yAxisSuffix=""
              fromZero
            />
          </Card>
        </Section>

        {transcript.map((sem) => (
          <Section key={sem.id} eyebrow={sem.semester}>
            <Card>
              <View style={styles.semHead}>
                <View>
                  <Text style={styles.semTitle}>
                    SGPA {sem.sgpa.toFixed(2)}
                  </Text>
                  <Text style={styles.semSub}>
                    Cumulative {sem.cgpa.toFixed(2)}
                  </Text>
                </View>
                <Pill
                  text={`${sem.credits} cr`}
                  fg={COLORS.blue}
                  bg={COLORS.blueSoft}
                />
              </View>

              {sem.courses.map((c) => (
                <View key={c.code} style={styles.tRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.tCode}>{c.code}</Text>
                    <Text style={styles.tName}>{c.name}</Text>
                  </View>
                  <Text style={styles.tCredits}>{c.credits} cr</Text>
                  <View
                    style={[
                      styles.tGrade,
                      { backgroundColor: gradeColor(c.grade) + '22' },
                    ]}>
                    <Text
                      style={[
                        styles.tGradeText,
                        { color: gradeColor(c.grade) },
                      ]}>
                      {c.grade}
                    </Text>
                  </View>
                </View>
              ))}
            </Card>
          </Section>
        ))}
      </ScrollView>
    );
  };

  // ═════════════════════════════════════════════════════
  // ADMIT CARD — new tab
  // ═════════════════════════════════════════════════════
  const Admit = () => {
    const exam = {
      semester: 'Fall 2026',
      title: 'Final Examinations',
      venue: 'NU Islamabad — Block C',
      startDate: '15-Dec-2026',
      endDate: '28-Dec-2026',
      reportTime: '30 minutes before start',
    };

    const handleDownload = () =>
      Alert.alert(
        'Admit Card',
        'In the real portal this would download a PDF. In this offline build, all details are already on screen — designed to be readable at a glance before each exam.'
      );

    return (
      <ScrollView
        contentContainerStyle={styles.pad}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Admit Card</Text>
        <Text style={styles.pageSub}>
          {exam.semester} · {exam.title}
        </Text>

        <InfoPanel
          title="Candidate Details"
          rows={[
            { label: 'Name', value: STUDENT.name },
            { label: 'Roll No', value: STUDENT.rollNo },
            { label: 'Degree', value: STUDENT.degree },
            { label: 'Section', value: STUDENT.section },
          ]}
        />

        <InfoPanel
          title="Examination Details"
          rows={[
            { label: 'Venue', value: exam.venue },
            { label: 'From', value: exam.startDate },
            { label: 'To', value: exam.endDate },
            { label: 'Report by', value: exam.reportTime },
          ]}
        />

        <Section eyebrow="Your exam schedule">
          <Card>
            {courses.map((c, idx) => (
              <View
                key={c.id}
                style={[
                  styles.tRow,
                  idx === 0 && { borderTopWidth: 0, paddingTop: 0 },
                ]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.tCode}>
                    {c.code} · {c.section}
                  </Text>
                  <Text style={styles.tName}>{c.name}</Text>
                </View>
                <Text style={styles.admitDate}>{15 + idx}-Dec-2026</Text>
              </View>
            ))}
          </Card>
        </Section>

        <Section eyebrow="Instructions">
          <Card>
            <Text style={styles.instr}>
              • Carry your student ID card at all times.
            </Text>
            <Text style={styles.instr}>
              • Mobile phones must be switched off.
            </Text>
            <Text style={styles.instr}>
              • Reach 30 minutes before the exam start time.
            </Text>
            <Text style={styles.instr}>
              • Only pen, pencil, and scientific calculator allowed.
            </Text>
          </Card>
        </Section>

        <TouchableOpacity
          style={[styles.btnPrimary, { marginTop: 20 }]}
          onPress={handleDownload}>
          <Text style={styles.btnPrimaryText}>Download admit card (PDF)</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  // ═════════════════════════════════════════════════════
  // COURSE DETAIL
  // ═════════════════════════════════════════════════════
  const Detail = () => {
    const c = courses.find((x) => x.id === openId);
    if (!c) {
      return (
        <Empty
          title="Course not found"
          actionLabel="Back to courses"
          onAction={() => go('courses')}
        />
      );
    }
    const level = getRiskLevel(c);
    const pct = calcCoursePercentage(c);
    const letter = pctToLetter(pct);
    const safe = calcSafeToSkip(c.attended, c.totalClasses);
    const needed = calcNeededToRecover(c.attended, c.totalClasses);

    const series =
      c.assessments.length > 0
        ? {
            labels: c.assessments.map((_, i) => `A${i + 1}`),
            datasets: [
              {
                data: c.assessments.map((a) =>
                  Math.round((a.obtained / a.total) * 100)
                ),
              },
            ],
          }
        : { labels: [], datasets: [{ data: [] }] };

    return (
      <ScrollView
        contentContainerStyle={styles.pad}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => go('courses')}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.detailHead}>
          <Text style={styles.detailCode}>
            {c.code} · {c.section}
          </Text>
          <Text style={styles.detailName}>{c.name}</Text>
          <Text style={styles.detailMeta}>
            Fall 2026 · {c.creditHours} credit hours
          </Text>
          <View style={{ marginTop: 10 }}>
            <RiskPill level={level} />
          </View>
        </View>

        <Card style={safe >= 0 ? styles.cardGood : styles.cardBad}>
          <Text style={styles.cardEyebrow}>Attendance forecast</Text>
          {safe >= 0 ? (
            <>
              <Text style={styles.cardBig}>
                Can miss {safe} more class{safe === 1 ? '' : 'es'} safely
              </Text>
              <Text style={styles.cardSub}>
                You'll stay above {ATTENDANCE_THRESHOLD}% in {c.code}.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.cardBig}>
                {Math.abs(safe)} class{Math.abs(safe) === 1 ? '' : 'es'} over
                the safe limit
              </Text>
              <Text style={styles.cardSub}>
                Attend {needed} consecutive class{needed === 1 ? '' : 'es'} to
                recover.
              </Text>
            </>
          )}
        </Card>

        <Card style={{ marginTop: 12 }}>
          <Text style={styles.cardEyebrow}>Running grade estimate</Text>
          <View style={styles.gradeRow}>
            <Text style={styles.gradeLetter}>{letter}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.gradePct}>{pct}% weighted</Text>
              <Text style={styles.cardSub}>
                Live estimate. FLEX's Grand Total stays blank until semester end
                — this updates as marks arrive.
              </Text>
            </View>
          </View>
        </Card>

        <Section eyebrow="Attendance">
          <Card>
            <AttendanceBar attended={c.attended} total={c.totalClasses} />
          </Card>
        </Section>

        <Section eyebrow="Marks over time">
          <Card>
            {c.assessments.length > 0 ? (
              <LineChart
                data={series}
                width={CHART_WIDTH}
                height={200}
                chartConfig={chartConfig}
                bezier
                style={{ marginLeft: -12, borderRadius: 12 }}
                withInnerLines={false}
                yAxisSuffix="%"
              />
            ) : (
              <Text style={styles.quiet}>No assessments recorded yet.</Text>
            )}
          </Card>
        </Section>

        <Section eyebrow="Assessment breakdown">
          <Card>
            {c.assessments.length === 0 ? (
              <Text style={styles.quiet}>No assessments recorded.</Text>
            ) : (
              c.assessments.map((a, idx) => (
                <View
                  key={a.id}
                  style={[
                    styles.assessRow,
                    idx === 0 && { borderTopWidth: 0, paddingTop: 0 },
                  ]}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.assessTitle}>{a.title}</Text>
                    <Text style={styles.assessMeta}>
                      {a.type} · weight {a.weightage}%
                    </Text>
                  </View>
                  <Text style={styles.assessScore}>
                    {a.obtained}/{a.total}
                  </Text>
                </View>
              ))
            )}
          </Card>
        </Section>

        <Section eyebrow="Assignments">
          <Card>
            {c.assignments.length === 0 ? (
              <Text style={styles.quiet}>Nothing pending.</Text>
            ) : (
              c.assignments.map((a, idx) => (
                <View
                  key={a.id}
                  style={[
                    styles.assessRow,
                    idx === 0 && { borderTopWidth: 0, paddingTop: 0 },
                  ]}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.assessTitle}>{a.title}</Text>
                    <Text style={styles.assessMeta}>Due {a.due}</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.smallBtn,
                      {
                        backgroundColor: a.submitted
                          ? COLORS.good
                          : COLORS.blue,
                      },
                    ]}
                    onPress={() => toggleAssignment(c.id, a.id)}>
                    <Text style={styles.smallBtnText}>
                      {a.submitted ? 'Submitted' : 'Mark done'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </Card>
        </Section>
      </ScrollView>
    );
  };

  // ═════════════════════════════════════════════════════
  // ADD COURSE
  // ═════════════════════════════════════════════════════
  const Add = () => (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.pad}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Register a course</Text>
        <Text style={styles.pageSub}>Adds to your local portal.</Text>

        <Field
          label="Course name"
          value={fName}
          onChangeText={setFName}
          placeholder="e.g. Artificial Intelligence"
          error={fErr.name}
        />
        <Field
          label="Course code"
          value={fCode}
          onChangeText={setFCode}
          placeholder="e.g. AI4009"
          error={fErr.code}
        />
        <Field
          label="Credit hours"
          value={fCr}
          onChangeText={setFCr}
          placeholder="1–6"
          keyboardType="numeric"
          error={fErr.cr}
        />
        <Field
          label="Total classes"
          value={fTot}
          onChangeText={setFTot}
          placeholder="e.g. 30"
          keyboardType="numeric"
          error={fErr.tot}
        />
        <Field
          label="Attended classes"
          value={fAtt}
          onChangeText={setFAtt}
          placeholder="e.g. 22"
          keyboardType="numeric"
          error={fErr.att}
        />

        <TouchableOpacity
          style={[styles.btnPrimary, { marginTop: 20 }]}
          onPress={submitCourse}>
          <Text style={styles.btnPrimaryText}>Register course</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnGhost, { marginTop: 10 }]}
          onPress={() => go('courses')}>
          <Text style={styles.btnGhostText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  // ═════════════════════════════════════════════════════
  // FEEDBACK
  // ═════════════════════════════════════════════════════
  const Feedback = () => {
    const avg =
      feedback.length === 0
        ? 0
        : Math.round(
            (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length) * 10
          ) / 10;

    return (
      <ScrollView
        contentContainerStyle={styles.pad}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Course Feedback</Text>
        <Text style={styles.pageSub}>
          Same as FLEX — but works even when the portal is down.
        </Text>

        <Field
          label="Course code"
          value={fbCode}
          onChangeText={setFbCode}
          placeholder="e.g. CS4039"
        />

        <Text style={styles.fieldLabel}>Rating</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setFbRate(s)}
              style={{ paddingRight: 6 }}>
              <Text
                style={[
                  styles.star,
                  { color: s <= fbRate ? COLORS.blue : COLORS.line },
                ]}>
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Field
          label="Comment"
          value={fbText}
          onChangeText={setFbText}
          placeholder="What worked, what didn't…"
          multiline
        />

        {fbErr ? <Text style={styles.err}>{fbErr}</Text> : null}

        <TouchableOpacity
          style={[styles.btnPrimary, { marginTop: 16 }]}
          onPress={submitFeedback}>
          <Text style={styles.btnPrimaryText}>Submit feedback</Text>
        </TouchableOpacity>

        <Section
          eyebrow={`${feedback.length} entr${
            feedback.length === 1 ? 'y' : 'ies'
          } · avg ${avg}★`}>
          {feedback.length === 0 ? (
            <Empty title="No feedback yet" hint="Yours will be the first." />
          ) : (
            feedback.map((f) => (
              <Card key={f.id} style={{ marginTop: 10 }}>
                <View style={styles.fbHead}>
                  <Text style={styles.fbCode}>{f.courseCode}</Text>
                  <Text style={styles.fbStars}>{'★'.repeat(f.rating)}</Text>
                </View>
                <Text style={styles.fbText}>{f.comment}</Text>
              </Card>
            ))
          )}
        </Section>
      </ScrollView>
    );
  };

  // ═════════════════════════════════════════════════════
  // ROOT
  // ═════════════════════════════════════════════════════
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.topBar}>
        <Text style={styles.brand}>FLEX · Mobile</Text>
        <View style={styles.brandDot} />
      </View>
      <Nav />
      <View style={{ flex: 1 }}>
        {view === 'home' && <Home />}
        {view === 'courses' && <Courses />}
        {view === 'attendance' && <Attendance />}
        {view === 'marks' && <Marks />}
        {view === 'transcript' && <Transcript />}
        {view === 'admit' && <Admit />}
        {view === 'detail' && <Detail />}
        {view === 'add' && <Add />}
        {view === 'feedback' && <Feedback />}
      </View>
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.paper },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: COLORS.navy,
  },
  brand: { fontSize: 14, fontWeight: '700', color: '#fff', letterSpacing: 0.4 },
  brandDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#93C5FD',
    marginLeft: 8,
  },

  navWrap: {
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  nav: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  navBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: 'center',
    marginRight: 4,
  },
  navText: { fontSize: 13, color: COLORS.muted, fontWeight: '500' },
  navTextOn: { color: COLORS.blue, fontWeight: '700' },
  navDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.blue,
    marginTop: 4,
  },

  pad: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },

  helloSmall: { fontSize: 12, color: COLORS.muted, letterSpacing: 0.5 },
  helloBig: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.ink,
    marginTop: 2,
  },

  infoPanel: {
    marginTop: 16,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
    overflow: 'hidden',
  },
  infoPanelHead: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  infoPanelTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  infoPanelBody: { paddingHorizontal: 14, paddingVertical: 8 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  infoLabel: { fontSize: 12, color: COLORS.muted },
  infoValue: { fontSize: 12, color: COLORS.ink, fontWeight: '600' },

  statsRow: { flexDirection: 'row', gap: 8 },

  stat: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  statValue: { fontSize: 20, fontWeight: '700' },
  statLabel: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statSub: { fontSize: 10, color: COLORS.muted, marginTop: 4 },

  eyebrow: {
    fontSize: 11,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    fontWeight: '600',
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  cardGood: { backgroundColor: COLORS.goodSoft, borderColor: '#A7F3D0' },
  cardBad: { backgroundColor: COLORS.badSoft, borderColor: '#FECACA' },
  cardEyebrow: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: COLORS.muted,
    marginBottom: 6,
    fontWeight: '600',
  },
  cardBig: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.ink,
    lineHeight: 22,
  },
  cardSub: { fontSize: 12, color: COLORS.muted, marginTop: 4, lineHeight: 17 },

  listHead: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  pageTitle: { fontSize: 22, fontWeight: '700', color: COLORS.ink },
  pageSub: { fontSize: 12, color: COLORS.muted },

  search: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: COLORS.ink,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  chipsRow: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
  sortBtn: { paddingVertical: 6 },
  sortBtnText: { fontSize: 12, color: COLORS.blue, fontWeight: '600' },

  courseRow: {
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    marginTop: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  courseRowTop: { flexDirection: 'row', alignItems: 'flex-start' },
  courseCode: {
    fontSize: 11,
    color: COLORS.navy,
    letterSpacing: 0.5,
    fontWeight: '700',
  },
  courseName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.ink,
    marginTop: 2,
  },
  courseSub: { fontSize: 11, color: COLORS.muted, marginTop: 3 },

  attendCard: {
    backgroundColor: COLORS.card,
    marginTop: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  attendTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  attendPct: { fontSize: 22, fontWeight: '800' },
  forecast: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },
  forecastText: { fontSize: 12.5, fontWeight: '600' },

  markCard: {
    backgroundColor: COLORS.card,
    marginTop: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  markTop: { flexDirection: 'row', alignItems: 'center' },
  markMeta: { fontSize: 11, color: COLORS.muted, marginTop: 4 },
  gradeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeCircleLetter: { fontSize: 22, fontWeight: '800', color: COLORS.blue },
  gradeCirclePct: { fontSize: 10, color: COLORS.navy, fontWeight: '600' },

  // Transcript styles
  semHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  semTitle: { fontSize: 16, fontWeight: '700', color: COLORS.ink },
  semSub: { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  tRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },
  tCode: {
    fontSize: 11,
    color: COLORS.navy,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  tName: { fontSize: 13, color: COLORS.ink, marginTop: 2 },
  tCredits: { fontSize: 11, color: COLORS.muted, marginHorizontal: 8 },
  tGrade: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tGradeText: { fontSize: 12, fontWeight: '700' },

  admitDate: { fontSize: 12, fontWeight: '600', color: COLORS.blue },
  instr: { fontSize: 12.5, color: COLORS.ink, lineHeight: 20, marginBottom: 4 },

  back: {
    fontSize: 13,
    color: COLORS.blue,
    fontWeight: '600',
    marginBottom: 14,
  },
  detailHead: { marginBottom: 18 },
  detailCode: {
    fontSize: 12,
    color: COLORS.navy,
    letterSpacing: 0.5,
    fontWeight: '700',
  },
  detailName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.ink,
    marginTop: 2,
  },
  detailMeta: { fontSize: 12, color: COLORS.muted, marginTop: 4 },

  gradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 4,
  },
  gradeLetter: {
    fontSize: 42,
    fontWeight: '800',
    color: COLORS.blue,
    letterSpacing: -1,
  },
  gradePct: { fontSize: 14, fontWeight: '700', color: COLORS.ink },

  assessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },
  assessTitle: { fontSize: 13, fontWeight: '600', color: COLORS.ink },
  assessMeta: { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  assessScore: { fontSize: 13, fontWeight: '700', color: COLORS.ink },

  pill: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 20 },
  pillText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.3 },

  barTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.line,
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: 3 },
  barRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 6,
  },
  barText: { fontSize: 12, fontWeight: '700' },
  barSub: { fontSize: 11, color: COLORS.muted },

  empty: { alignItems: 'center', paddingHorizontal: 40, paddingTop: 60 },
  emptyCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyDot: { fontSize: 40, color: COLORS.blue, marginTop: -10 },
  emptyTitle: { fontSize: 15, fontWeight: '600', color: COLORS.ink },
  emptyHint: {
    fontSize: 12,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 18,
    lineHeight: 17,
  },

  btnPrimary: {
    backgroundColor: COLORS.blue,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
  },
  btnPrimaryText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.2,
  },
  btnGhost: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.card,
  },
  btnGhostText: { color: COLORS.ink, fontWeight: '600', fontSize: 14 },

  smallBtn: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10 },
  smallBtnText: { color: '#fff', fontSize: 11, fontWeight: '700' },

  banner: {
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginTop: 8,
  },
  bannerText: { fontSize: 12.5, fontWeight: '600', lineHeight: 18 },

  field: { marginTop: 16 },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.ink,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
    fontSize: 14,
    color: COLORS.ink,
  },
  err: { color: COLORS.bad, fontSize: 11.5, marginTop: 5 },
  hint: { color: COLORS.muted, fontSize: 11.5, marginTop: 5 },

  stars: { flexDirection: 'row', marginBottom: 6 },
  star: { fontSize: 30 },
  fbHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  fbCode: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.blue,
    letterSpacing: 0.4,
  },
  fbStars: { color: COLORS.blue, fontSize: 13 },
  fbText: { fontSize: 13, color: COLORS.ink, lineHeight: 19 },

  quiet: { color: COLORS.muted, fontSize: 12.5, fontStyle: 'italic' },
});
