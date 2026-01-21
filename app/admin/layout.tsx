import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { checkRole } from '@/utils/roles'
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {


    const isAdmin = await checkRole('admin')
    if (!isAdmin) {
        redirect('/')
    }


    return (
        <div className="flex h-screen overflow-hidden bg-background-light text-black">
            <AdminSidebar />

            <main className="flex-1 flex flex-col overflow-y-auto pt-16">
                <AdminHeader />
                <div className="p-8 space-y-8">{children}</div>
            </main>
        {/* <div className="flex min-h-screen"> */}
            {/* <aside className="w-64 bg-black text-white p-4 pt-20">
                <h2 className="font-bold mb-4">Admin Panel</h2>
                <ul className="space-y-2 text-sm">
                <li><a href="/admin">Dashboard</a></li>
                <li><a href="/admin/exam-categories">Exam Categories</a></li>
                <li><a href="/admin/courses">Courses</a></li>
                <li><a href="/admin/mock-tests">Mock Tests</a></li>
                <li><a href="/admin/questions">Questions</a></li>
                <li><a href="/admin/blogs">Blogs</a></li>
                <li><a href="/admin/notes">Notes</a></li>
                </ul>
                </aside>
                
                <main className="flex-1 p-6 bg-gray-50 text-black pt-20">{children}</main> */}


        {/* </div> */}
                </div>
    );
}
