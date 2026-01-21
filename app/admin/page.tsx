import StatCard from "@/components/admin/StatCard";
// import ActivityTable from "@/components/admin/ActivityTable";
// import UpcomingTests from "@/components/admin/UpcomingTests";
import { getAdminStats } from "@/lib/admin";

export default async function AdminDashboard() {
  const stats = await getAdminStats();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="people" title="Total Students" value={stats.users} />
        <StatCard icon="monetization_on" title="Monthly Revenue" value={`₹${stats.revenue}`} />
        <StatCard icon="quiz" title="Active Mock Tests" value={stats.tests} />
        <StatCard icon="schedule" title="Pending Sessions" value={stats.sessions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* <ActivityTable />
        <UpcomingTests /> */}
      </div>
    </>
  );
}