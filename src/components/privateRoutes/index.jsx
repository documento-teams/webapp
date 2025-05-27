import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "@/lib/api";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const ProtectedRoutes = ({ children, redirectPath = "/login" }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await api.get("/api/user/me");
        setIsAuthenticated(!!user);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">{t("common.loading")}</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
  redirectPath: PropTypes.string
};

export default ProtectedRoutes;