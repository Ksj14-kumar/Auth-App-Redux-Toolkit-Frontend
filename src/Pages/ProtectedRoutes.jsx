import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
function ProtectedRoutes({ user, children }) {
    if (!user) {
        return <Navigate to="/" replace />
    }
    return children ? children : <Outlet />
}
export default ProtectedRoutes;