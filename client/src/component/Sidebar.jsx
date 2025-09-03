import React from "react";
import Logo from "./Logo";
import { NavLink, useLocation } from "react-router";
import { navSections, roleBasedPathPermissions } from "@/utils/constant";
import Logout from "./Logout";

export default function Sidebar({ user }) {
  const location = useLocation();
  const path = location.pathname;
  const roles = ["patient", "doctor", "admin", "nurse", "staff"];
  const userRole = roles.find((role) => role === user?.role);
  const isAuthorized =
    (userRole === "admin" && roleBasedPathPermissions.admin.allowedSubpaths) ||
    (userRole === "doctor" &&
      roleBasedPathPermissions.doctor.allowedSubpaths) ||
    (userRole === "patient" &&
      roleBasedPathPermissions.patient.allowedSubpaths) ||
    (userRole === "nurse" && roleBasedPathPermissions.nurse.allowedSubpaths) ||
    (userRole === "staff" && roleBasedPathPermissions.staff.allowedSubpaths);
  return (
    <div className="container mx-auto py-5 px-4">
      <div className="hidden lg:flex pb-6">
        {" "}
        <Logo />
      </div>
      <div className="overflow-y-auto h-[calc(100vh-150px)] ">
        {/* navLinks */}
        {navSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h1 className="text-zinc-600 font-semibold">
              {section.title === "Management" && userRole === "patient"
                ? ""
                : section.title}
            </h1>
            {section.links
              .filter((subPaths) => {
                if (
                  roleBasedPathPermissions[userRole] &&
                  isAuthorized.includes(subPaths.path)
                ) {
                  return true;
                }
                return false;
              })
              .map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-4 lg:p-2 rounded-full transition-colors hover:text-blue-500 ${
                      isActive || path.split("/")[2] === item.path
                        ? "text-blue-500 font-bold bg-blue-100 rounded-full"
                        : "text-black"
                    }`
                  }
                  viewTransition
                  end
                >
                  <item.icon /> <span> {item.name}</span>
                </NavLink>
              ))}
          </div>
        ))}
      </div>
      <Logout />
    </div>
  );
}