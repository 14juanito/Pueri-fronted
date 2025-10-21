export type UserRole = 'DEVELOPER' | 'ADMIN' | 'TEACHER' | 'PARENT';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  classId: string;
  parentId?: string;
  subdivision?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Class {
  id: string;
  name: string;
  level: string;
  schoolYear: string;
  teacherId?: string;
  studentIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  subjectId: string;
  classId: string;
  dueDate: string;
  maxScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface Grade {
  id: string;
  studentId: string;
  assignmentId: string;
  score: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SchoolYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Term {
  id: string;
  name: string;
  schoolYearId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Period {
  id: string;
  name: string;
  termId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  type: string;
  referenceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Timetable {
  id: string;
  classId: string;
  entries: TimetableEntry[];
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimetableEntry {
  id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
  subjectId: string;
  teacherId: string;
  room?: string;
}
