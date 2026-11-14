import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { NotificationProvider } from './context/NotificationContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { OfflineBanner } from './components/common/OfflineBanner';
import { InstallPwaPrompt } from './components/common/InstallPwaPrompt';
import { DemoRoleSwitcher } from './components/common/DemoRoleSwitcher';
import { RoleProtectedRoute } from './components/common/RoleProtectedRoute';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { PricingPage } from './pages/public/PricingPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';
import { OnboardingPage } from './pages/public/OnboardingPage';
import { ProfilePage } from './pages/public/ProfilePage';

// Family Portal
import { FamilyLayout } from './pages/family/FamilyLayout';
import { FamilyDashboard } from './pages/family/FamilyDashboard';
import { ParentHealthMonitoring } from './pages/family/ParentHealthMonitoring';
import { LiveLocationPage } from './pages/family/LiveLocationPage';
import { CaregiverTrackingPage } from './pages/family/CaregiverTrackingPage';
import { SosAlertsPage } from './pages/family/SosAlertsPage';
import { MedicationManagementPage } from './pages/family/MedicationManagementPage';
import { AppointmentSchedulingPage } from './pages/family/AppointmentSchedulingPage';
import { VisitReportsPage } from './pages/family/VisitReportsPage';
import { SubscriptionPage } from './pages/family/SubscriptionPage';

// Elder Portal
import { ElderLayout } from './pages/elder/ElderLayout';
import { ElderDashboard } from './pages/elder/ElderDashboard';
import { ElderSosPage } from './pages/elder/ElderSosPage';
import { ElderVitalsPage } from './pages/elder/ElderVitalsPage';
import { ElderMedicationsPage } from './pages/elder/ElderMedicationsPage';
import { ElderVisitsPage } from './pages/elder/ElderVisitsPage';
import { ElderFamilyContactsPage } from './pages/elder/ElderFamilyContactsPage';
import { ElderAssistanceRequestsPage } from './pages/elder/ElderAssistanceRequestsPage';

// Caregiver Portal
import { CaregiverLayout } from './pages/caregiver/CaregiverLayout';
import { CaregiverDashboard } from './pages/caregiver/CaregiverDashboard';
import { AssignedVisitsPage } from './pages/caregiver/AssignedVisitsPage';
import { VisitTaskDetailPage } from './pages/caregiver/VisitTaskDetailPage';
import { CaregiverNavigationPage } from './pages/caregiver/CaregiverNavigationPage';
import { VisitDocumentationPage } from './pages/caregiver/VisitDocumentationPage';
import { AvailabilityPage } from './pages/caregiver/AvailabilityPage';

// Admin Portal
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { CaregiverVerificationPage } from './pages/admin/CaregiverVerificationPage';
import { EmergencyMonitoringPage } from './pages/admin/EmergencyMonitoringPage';
import { SubscriptionAdminPage } from './pages/admin/SubscriptionAdminPage';
import { AnalyticsReportsPage } from './pages/admin/AnalyticsReportsPage';
import { PlatformConfigPage } from './pages/admin/PlatformConfigPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AccessibilityProvider>
          <NotificationProvider>
            <div className="min-h-[100dvh] flex flex-col bg-[#FFFFF0] text-[#17211C] font-serif">
              {/* Top Navigation & Offline Warning */}
              <Navbar />
              <OfflineBanner />

              {/* Main Routing Area */}
              <div className="flex-1 flex flex-col">
                <Routes>
                  {/* Public Pages */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/onboarding" element={<OnboardingPage />} />
                  <Route path="/profile" element={<ProfilePage />} />

                  {/* Family Portal */}
                  <Route
                    path="/family"
                    element={
                      <RoleProtectedRoute allowedRoles={['family', 'admin']}>
                        <FamilyLayout />
                      </RoleProtectedRoute>
                    }
                  >
                    <Route index element={<FamilyDashboard />} />
                    <Route path="health" element={<ParentHealthMonitoring />} />
                    <Route path="location" element={<LiveLocationPage />} />
                    <Route path="caregiver" element={<CaregiverTrackingPage />} />
                    <Route path="sos" element={<SosAlertsPage />} />
                    <Route path="medications" element={<MedicationManagementPage />} />
                    <Route path="appointments" element={<AppointmentSchedulingPage />} />
                    <Route path="visits" element={<VisitReportsPage />} />
                    <Route path="subscription" element={<SubscriptionPage />} />
                  </Route>

                  {/* Elderly Parent Portal */}
                  <Route
                    path="/parent"
                    element={
                      <RoleProtectedRoute allowedRoles={['elder', 'family', 'admin']}>
                        <ElderLayout />
                      </RoleProtectedRoute>
                    }
                  >
                    <Route index element={<ElderDashboard />} />
                    <Route path="sos" element={<ElderSosPage />} />
                    <Route path="vitals" element={<ElderVitalsPage />} />
                    <Route path="meds" element={<ElderMedicationsPage />} />
                    <Route path="visits" element={<ElderVisitsPage />} />
                    <Route path="contacts" element={<ElderFamilyContactsPage />} />
                    <Route path="help" element={<ElderAssistanceRequestsPage />} />
                  </Route>

                  {/* Caregiver Portal */}
                  <Route
                    path="/caregiver"
                    element={
                      <RoleProtectedRoute allowedRoles={['caregiver', 'admin']}>
                        <CaregiverLayout />
                      </RoleProtectedRoute>
                    }
                  >
                    <Route index element={<CaregiverDashboard />} />
                    <Route path="visits" element={<AssignedVisitsPage />} />
                    <Route path="tasks" element={<VisitTaskDetailPage />} />
                    <Route path="navigation" element={<CaregiverNavigationPage />} />
                    <Route path="documentation" element={<VisitDocumentationPage />} />
                    <Route path="availability" element={<AvailabilityPage />} />
                  </Route>

                  {/* Admin Portal */}
                  <Route
                    path="/admin"
                    element={
                      <RoleProtectedRoute allowedRoles={['admin']}>
                        <AdminLayout />
                      </RoleProtectedRoute>
                    }
                  >
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<UserManagementPage />} />
                    <Route path="verification" element={<CaregiverVerificationPage />} />
                    <Route path="emergencies" element={<EmergencyMonitoringPage />} />
                    <Route path="subscriptions" element={<SubscriptionAdminPage />} />
                    <Route path="analytics" element={<AnalyticsReportsPage />} />
                    <Route path="config" element={<PlatformConfigPage />} />
                  </Route>

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>

              {/* Universal Footer */}
              <Footer />

              {/* PWA Install Banner */}
              <InstallPwaPrompt />

              {/* Floating Demo Role Switcher for instant evaluator testing */}
              <DemoRoleSwitcher />
            </div>
          </NotificationProvider>
        </AccessibilityProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
