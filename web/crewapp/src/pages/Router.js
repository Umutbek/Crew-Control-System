import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import WithBgSpinner from "../components/spinners/WithBgSpinner";
import PrivateRoute from "../components/PrivateRoute";  // Import the PrivateRoute component
import MainScheduling from "./job/MainScheduling";

const LoginPage = lazy(() => import("./auth/LoginPage"));
const Kanban = lazy(() => import("./job/KanbanVertical"));
const Manage = lazy(() => import("./manage/Manage"));
const Reports = lazy(() => import('./reports/Reports')); 
const Billing = lazy(() => import("./billing/Billing"));


export default function Router() {
  return (
    <Suspense fallback={<WithBgSpinner />}>
      <Routes>
        <Route exact path="/auth/login" element={<LoginPage />} />
        <Route exact path="/login" element={<Navigate to="/auth/login" />} />

        <Route path="/mainscheduling" element={
          <PrivateRoute>
            <MainScheduling />
          </PrivateRoute>
        } />

        <Route path="/manage" element={
          <PrivateRoute>
            <Manage />
          </PrivateRoute>
        } />

        <Route path="/reports" element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        } />

        <Route path="/billing" element={
          <PrivateRoute>
            <Billing />
          </PrivateRoute>
        } />

      </Routes>
    </Suspense>
  );
}
