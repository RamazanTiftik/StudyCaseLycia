'use client';
import { usePathname } from 'next/navigation';
import AdminAuthGuard from "@/app/components/AdminAuthGuard";
import AdminNavbar from "@/app/components/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    
    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-gray-50">
                {children}
            </div>
        );
    }

    
    return (
        <AdminAuthGuard>
            <AdminNavbar />
            <div className="p-8 mt-16">{children}</div> 
        </AdminAuthGuard>
    );
}