import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import WithBgSpinner from "../components/spinners/WithBgSpinner";

const LoginPage = lazy(() => import("./auth/LoginPage"));

export default function Router() {
  return (
    <Suspense fallback={<WithBgSpinner />}>
      <Routes>
        <Route exact path="/auth/login" element={<LoginPage />} />
        <Route exact path="/login" element={<Navigate to="/auth/login" />} />
      </Routes>
    </Suspense>
  );
}
