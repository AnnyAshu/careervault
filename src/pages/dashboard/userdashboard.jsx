import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/ui/dashboardcard";
import { getUserStats } from "../../api/userApi";

const UserDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const s = await getUserStats();
        if (!mounted) return;
        setStats(s);
      } catch (err) {
        if (!mounted) return;
        setStats({
          appliedJobs: 4,
          savedJobs: 2,
          profileCompleteness: 78
        });
      }
    };
    load();
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>

      <div className="row g-3 mt-3">
        <div className="col-md-4">
          <DashboardCard title="Applied Jobs" value={stats?.appliedJobs ?? "..."} icon="✉️" />
        </div>
        <div className="col-md-4">
          <DashboardCard title="Saved Jobs" value={stats?.savedJobs ?? "..."} icon="🔖" />
        </div>
        <div className="col-md-4">
          <DashboardCard title="Profile" value={`${stats?.profileCompleteness ?? "..."}%`} icon="🧾" />
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">Next Steps</div>
        <div className="card-body">
          <ul>
            <li>Complete your profile to 100%.</li>
            <li>Apply to recommended jobs from the dashboard.</li>
            <li>Upload your resume in Profile → Files.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
