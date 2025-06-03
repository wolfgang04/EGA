import { Navigate } from "react-router";

const RoleGuard: React.FC<{
  role: string | null;
  allowed: string[];
  children: React.ReactNode;
}> = ({ allowed, children, role }) => {
  if (!allowed.includes(role || "")) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default RoleGuard;
