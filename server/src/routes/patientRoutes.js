import express from "express";
import { verifyAuth, authorizedRoles } from "../middlewares/authenticate.js";
import { validateFormData } from "../middlewares/validateForm.js";
import { validatePatientSchema } from "../utils/dataSchema.js";
import { clearCache, cacheMiddleware } from "../middlewares/cache.js";
import { register, getPatient } from "../controller/patientController.js";
import { updatePatient } from "../controller/patientController.js";
import { getAllPatients } from "../controller/patientController.js";



const router = express.Router();

router.post(
  "/register",
  verifyAuth,
  authorizedRoles("admin", "patient"), //only the patient and admin can access this route
  validateFormData(validatePatientSchema),
  clearCache("auth_user"),
  register
);

router.get("/me", verifyAuth, cacheMiddleware("patient", 3600), getPatient);

router.patch(
  "/:id/update",
  verifyAuth,
  authorizedRoles("admin", "patient"),
  validateFormData(validatePatientSchema),
  clearCache("patient"),
  updatePatient
);

router.get(
  "/all",
  verifyAuth,
  cacheMiddleware("patients", 3600),
  authorizedRoles("admin", "doctor", "staff", "nurse"),
  getAllPatients
);

export default router;

// here we handle patient-related routes - we are registering the user as a patient - this involves validating the user's information, creating a patient record, and linking it to the user account.
// after this we move to create and import our patientRoutes