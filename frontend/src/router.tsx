import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';

const RegisterPlaceholder = () => (
    <div className="flex h-screen items-center justify-center font-bold">Register Page (Coming Soon)</div>
);
const DashboardPlaceholder = () => (
    <div className="flex h-screen items-center justify-center font-bold">Dashboard (Coming Soon)</div>
);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <RegisterPlaceholder />,
    },
    {
        path: '/dashboard',
        element: <DashboardPlaceholder />,
    },
    {
        path: '*',
        element: <div className="flex h-screen items-center justify-center font-bold text-red-500">404 - Page Not Found</div>,
    },
]);