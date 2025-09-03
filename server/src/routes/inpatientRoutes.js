import express from "express";
import { verifyAuth, authorizedRoles } from "../middlewares/authenticate.js";
import { cacheMiddleware, clearCache } from "../middlewares/cache.js";
import { validateFormData } from "../middlewares/validateForm.js";
import { validateInpatientSchema } from "../utils/dataSchema.js";
import { register, getAllInpatients, updateInpatient } from "../controller/inpatientController.js";

const router = express.Router();

router.post(
  "/register",
  verifyAuth,
  authorizedRoles("admin"),
  validateFormData(validateInpatientSchema),
  clearCache("inpatients", "rooms"),
  register
);

router.get(
  "/all",
  verifyAuth,
  authorizedRoles("admin", "doctor"),
  cacheMiddleware("inpatients", 3600),
  getAllInpatients
);

router.patch(
  "/:id/update",
  verifyAuth,
  authorizedRoles("admin"),
  validateFormData(validateInpatientSchema),
  clearCache("inpatients", "rooms"),
  updateInpatient
);

export default router;