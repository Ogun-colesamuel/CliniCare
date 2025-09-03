import {
  RiBankCardLine,
  RiCalendarLine,
  RiDashboardLine,
  RiGroup3Line,
  RiGroupLine,
  RiHotelBedLine,
  RiSettingsLine,
  RiStethoscopeLine,
  RiUserLine,
} from "@remixicon/react";
import dayjs from "dayjs";
import axiosInstances from "./axiosInstances";

export const bloodGroup = {
  "A+": "A-positive",
  "A-": "A-negative",
  "B+": "B-positive",
  "B-": "B-negative",
  "AB+": "AB-positive",
  "AB-": "AB-negative",
  "O+": "O-positive",
  "O-": "O-negative",
};

export const navSections = [
  {
    title: "Menu",
    links: [
      { icon: RiDashboardLine, path: "/dashboard", name: "Dashboard", id: 1 },
      {
        icon: RiCalendarLine,
        path: "/dashboard/appointments",
        name: "Appointments",
        id: 2,
      },

      { icon: RiHotelBedLine, path: "/dashboard/rooms", name: "Rooms", id: 3 },
      { icon: RiBankCardLine, path: "/dashboard/payments", name: "Payments", id: 4 },
      {
        id: 10,
        name: "Appointments",
        path: "/dashboard/patient-appointments",
        icon: RiCalendarLine,
      },
      {
        id: 11,
        name: "Payments",
        path: "/dashboard/patient-payments",
        icon: RiCalendarLine,
      },
    ],
  },
  {
    title: "Management",
    links: [
      { icon: RiStethoscopeLine, path: "/dashboard/doctors", name: "Doctors", id: 1 },
      { icon: RiGroupLine, path: "/dashboard/patients", name: "Patients", id: 2 },
      { icon: RiGroup3Line, path: "/dashboard/inpatients", name: "Inpatients", id: 3 },
    ],
  },
  {
    title: "Settings",
    links: [
      { icon: RiUserLine, path: "/dashboard/users", name: "Users", id: 1 },
      { icon: RiSettingsLine, path: "/dashboard/settings", name: "Settings", id: 2 },
    ],
  },
];

export const headers = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

export const formatDate = (item, format = "display") => {
  if (format === "input") {
    return dayjs(item).format("YYYY-MM-DD");
  }
  return dayjs(item).format("DD/MM/YYYY");
};

export const settingsLink = [
  {
    id: "account",
    href: "/dashboard/settings/account",
    name: "Account",
  },
  {
    id: "password",
    href: "/dashboard/settings/password",
    name: "Password",
  },
  {
    id: "health",
    href: "/dashboard/settings/health",
    name: "Health Record",
  },
];

export const user = [
  {
    _id: 1,
    fullname: "O",
    email: "ozordanielmichael@gmail.com",
    role: "Admin",
    phone: "09033186443",
    joined: "22/07/2025",
  },
  {
    _id: 2,
    fullname: "Joseph Gift",
    email: "jgifted13@gmail.com",
    role: "Patient",
    phone: "N/A",
    joined: "21/07/2025",
  },
  {
    _id: 3,
    fullname: "",
    email: "cobimbachu@gmail.com",
    role: "Patient",
    phone: "N/A",
    joined: "11/07/2025",
  },
  {
    _id: 4,
    fullname: "Mubarak Tech",
    email: "charlesmutob@gmail.com",
    role: "Doctor",
    phone: "N/A",
    joined: "11/07/2025",
  },
  {
    _id: 5,
    fullname: "Dizzy Gilepsy",
    email: "ceenobi@icloud.com",
    role: "Admin",
    phone: "N/A",
    joined: "21/07/2025",
  },
];

export const usersRoleColors = {
  admin: "bg-blue-200 text-blue-700",
  doctor: "bg-green-200 text-green-700",
  nurse: "bg-yellow-200 text-yellow-700",
  staff: "bg-teal-200 text-teal-700",
  patient: "bg-red-200 text-red-700",
};

export const roleBasedPathPermissions = {
  admin: {
    allowedSubpaths: [
      "/dashboard",
      "/dashboard/appointments",
      "/dashboard/rooms",
      "/dashboard/payments",
      "/dashboard/doctors",
      "/dashboard/patients",
      "/dashboard/inpatients",
      "/dashboard/users",
      "/dashboard/settings",
      "/dashboard/settings/account",
      "/dashboard/settings/password",
    ],
  },
  doctor: {
    allowedSubpaths: [
      "/dashboard",
      "/dashboard/appointments",
      "/dashboard/rooms",
      "/dashboard/doctors",
      "/dashboard/patients",
      "/dashboard/inpatients",
      "/dashboard/settings",
      "/dashboard/settings/account",
      "/dashboard/settings/password",
    ],
  },
  patient: {
    allowedSubpaths: [
      "/dashboard",
      "/dashboard/patient-appointments",
      "/dashboard/patient-payments",
      "/dashboard/settings",
      "/dashboard/settings/account",
      "/dashboard/settings/password",
      "/dashboard/settings/health",
    ],
  },
  nurse: {
    allowedSubpaths: [
      "/dashboard",
      "/dashboard/appointments",
      "/dashboard/rooms",
      "/dashboard/settings",
      "/dashboard/settings/account",
      "/dashboard/settings/password",
    ],
  },
  staff: {
    allowedSubpaths: [
      "/dashboard",
      "/dashboard/appointments",
      "/dashboard/rooms",
      "/dashboard/settings",
      "/dashboard/settings/account",
      "/dashboard/settings/password",
    ],
  },
};

export const patientsTableColumns = [
  { name: "NAME", uid: "fullname" },
  { name: "GENDER", uid: "gender" },
  { name: "DATE OF BIRTH", uid: "dateOfBirth" },
  { name: "ADDRESS", uid: "address" },
  { name: "BLOOD GROUP", uid: "bloodGroup" },
  { name: "PHONE", uid: "phone" },
  { name: "ACTION", uid: "action" },
];

export const roomsTableColumns = [
  { name: "ROOM NUMBER", uid: "roomNumber" },
  { name: "ROOM TYPE", uid: "roomType" },
  { name: "ROOM CAPACITY", uid: "roomCapacity" },
  { name: "ROOM PRICE", uid: "roomPrice" },
  { name: "ROOM STATUS", uid: "roomStatus" },
  { name: "IS FILLED", uid: "isFilled" },
  { name: "ACTION", uid: "action" },
];

export const roomsStatusColors = {
  available: "bg-green-200 text-green-700",
  occupied: "bg-yellow-200 text-yellow-700",
  maintenance: "bg-red-200 text-red-700",
};

export const formatCurrency = (amount, currency = "NGN") => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency || "NGN",
  }).format(amount);
};


export const doctorsTableColumns = [
  { name: "DOCTOR NAME", uid: "fullname" },
  { name: "PHONE", uid: "phone" },
  { name: "SPECIALIZATION", uid: "specialization" },
  { name: "STATUS", uid: "availability" },
  { name: "ACTION", uid: "action" },
];

export const doctorsStatusColors = {
  available: "bg-green-200 text-green-700",
  unavailable: "bg-blue-200 text-blue-700",
  "on leave": "bg-yellow-200 text-yellow-700",
  sick: "bg-red-200 text-red-700",
};

export const patientsAppointmentsTableColumns = [
  { name: "APPOINTMENT ID", uid: "appointmentId" },
  { name: "DATE", uid: "appointmentDate" },
  { name: "DOCTOR", uid: "doctor" },
  { name: "TIME", uid: "appointmentTime" },
  { name: "STATUS", uid: "status" },
  { name: "ACTION", uid: "action" },
];

export const appointmentsStatusColors = {
  scheduled: "bg-yellow-200 text-yellow-700",
  confirmed: "bg-green-200 text-green-700",
  cancelled: "bg-red-200 text-red-700",
};

export const appointmentsTableColumns = [
  { name: "APPOINTMENT ID", uid: "appointmentId" },
  { name: "PATIENT", uid: "patientName" },
  { name: "DOCTOR", uid: "doctor" },
  { name: "DATE", uid: "appointmentDate" },
  { name: "TIME", uid: "appointmentTime" },
  { name: "STATUS", uid: "status" },
  { name: "ACTION", uid: "action" },
];

export const paymentsTableColumns = [
  { name: "PATIENT", uid: "patientName" },
  { name: "PAYMENT ID", uid: "paymentId" },
  { name: "PAYMENT TYPE", uid: "paymentType" },
  { name: "AMOUNT", uid: "amount" },
  { name: "STATUS", uid: "status" },
  { name: "PAID AT", uid: "paidAt" },
  { name: "ACTION", uid: "action" },
];

export const paymentStatusColors = {
  pending: "bg-yellow-200 text-yellow-700",
  confirmed: "bg-green-200 text-green-700",
  cancelled: "bg-red-200 text-red-700",
};

export const inpatientsTableColumns = [
  { name: "PATIENT", uid: "patientName" },
  { name: "DOCTOR", uid: "doctorName" },
  { name: "ROOM", uid: "room" },
  { name: "ADMISSION DATE", uid: "admissionDate" },
  { name: "DISCHARGE DATE", uid: "dischargeDate" },
  { name: "STATUS", uid: "status" },
  { name: "ACTION", uid: "action" },
];

export const inpatientStatusColors = {
  admitted: "bg-green-200 text-green-700",
  discharged: "bg-red-200 text-red-700",
  transferred: "bg-yellow-200 text-yellow-700",
};