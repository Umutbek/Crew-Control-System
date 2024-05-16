import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import WithBgSpinner from "../components/spinners/WithBgSpinner";
import PrivateRoute from "../components/PrivateRoute";  // Import the PrivateRoute component
import MainScheduling from "./job/MainScheduling";

const LoginPage = lazy(() => import("./auth/LoginPage"));
const ManageCustomers = lazy(() => import("./manage/ManageCustomers"));
const ManageCrew = lazy(() => import("./manage/ManageCrew"));
const ManageCrewMembers = lazy(() => import("./manage/ManageCrewMembers"));
const Reports = lazy(() => import('./reports/Reports')); 
const Billing = lazy(() => import("./billing/Billing"));
const CreateOneTimeJob = lazy(() => import("../components/jobs/CreateOneTimeJob"));

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

        <Route path="/manage-customers" element={
          <PrivateRoute>
            <ManageCustomers />
          </PrivateRoute>
        } />

        <Route path="/manage-crew" element={
          <PrivateRoute>
            <ManageCrew />
          </PrivateRoute>
        } />

        <Route path="/manage-crew-members" element={
          <PrivateRoute>
            <ManageCrewMembers />
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

        <Route path="/create-one-time-job" element={
          <PrivateRoute>
            <CreateOneTimeJob />
          </PrivateRoute>
        } />
        
      </Routes>
    </Suspense>
  );
}
