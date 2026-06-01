import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F4F4F5] flex">
      <AdminSidebar />
      <main className="flex-1 ml-[230px] min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
