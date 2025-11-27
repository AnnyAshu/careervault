export const hasRole = (user, allowedRoles = []) => {
  if (!user || !user.role) return false;
  return allowedRoles.includes(user.role);
};

export const isAdmin = (user) => user?.role === "Admin";
export const isUser = (user) => user?.role === "User";
export const isRecruiter = (user) => user?.role === "Recruiter";
export const isSuperAdmin = (user) => user?.role === "SuperAdmin";
