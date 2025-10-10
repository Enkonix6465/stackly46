import React, { useEffect, useState } from "react";
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // <-- Add this
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useLocation } from "react-router-dom";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // <-- Add this
  Title,
  Tooltip,
  Legend
);

const LoginBarChart = ({ loginData, setLoginData }) => {
  // Function to simulate a login (for demonstration)
  const simulateLogin = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];

    setLoginData(prevData => ({
      ...prevData,
      [today]: prevData[today] + 1
    }));
  };

  // Chart configuration
  const chartData = {
    labels: Object.keys(loginData),
    datasets: [
      {
        label: 'Number of Logins',
        data: Object.values(loginData),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Logins by Day of the Week',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Login Analytics</h2>
      <div className="h-80">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="mt-6">
        <button
          onClick={simulateLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Simulate Login (Demo)
        </button>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>This chart displays login data stored in your browser's local storage.</p>
        <p>Click the button to simulate a login for the current day.</p>
      </div>
    </div>
  );
};

const translations = {
  en: {
    emailDomain: "Email Domain Stats",
    domain: "Domain",
    userCount: "User Count",
    noDomain: "No domain data found.",
    loginsWeek: "Logins This Week",
    day: "Day",
    loginCount: "Login Count"
  },
  ar: {
    emailDomain: "إحصائيات نطاق البريد الإلكتروني",
    domain: "النطاق",
    userCount: "عدد المستخدمين",
    noDomain: "لا توجد بيانات نطاق.",
    loginsWeek: "تسجيلات الدخول هذا الأسبوع",
    day: "اليوم",
    loginCount: "عدد الدخول"
  },
  he: {
    emailDomain: "סטטיסטיקת דומיין אימייל",
    domain: "דומיין",
    userCount: "מספר משתמשים",
    noDomain: "לא נמצאו נתוני דומיין.",
    loginsWeek: "כניסות השבוע",
    day: "יום",
    loginCount: "מספר כניסות"
  }
};

const AdminDashboard = () => {
  const [loginData, setLoginData] = useState({
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0
  });
  
  const [logins, setLogins] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, loginsToday: 0 });
  const [recentLogins, setRecentLogins] = useState([]);
  const [mostActiveUsers, setMostActiveUsers] = useState([]);
  const [emailDomains, setEmailDomains] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");
 
  const t = translations[language] || translations["en"];

  // Initialize chart data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('loginData');
    if (storedData) {
      setLoginData(JSON.parse(storedData));
    }
  }, []);

  // Update localStorage when loginData changes
  useEffect(() => {
    localStorage.setItem('loginData', JSON.stringify(loginData));
  }, [loginData]);

  useEffect(() => {
    // Get login data from localStorage
    const userLogins = JSON.parse(localStorage.getItem("userLogins")) || {};
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Section 4: Most Active Users (top 5 by login count)
    const userLoginCounts = {};
    Object.entries(userLogins).forEach(([email]) => {
      userLoginCounts[email] = (userLoginCounts[email] || 0) + 1;
    });
    const activeUsersList = users.map(u => ({
      username: `${u.firstName} ${u.lastName}`,
      email: u.email,
      count: userLoginCounts[u.email] || 0
    })).sort((a, b) => b.count - a.count).slice(0, 5);
    setMostActiveUsers(activeUsersList);

    // Section 5: Email Domain Stats
    const domainCounts = {};
    users.forEach(user => {
      const u = user || {};
      if (!u.email) return;
      const domain = u.email.split('@')[1] || 'unknown';
      domainCounts[domain] = (domainCounts[domain] || 0) + 1;
    });
    setEmailDomains(Object.entries(domainCounts).map(([domain, count]) => ({ domain, count })));

    // Map email to username and login time
    const loginRows = Object.entries(userLogins)
      .filter(([email]) => users.some(u => u.email === email))
      .map(([email, loginTime])=> {
        const user = users.find(u => u.email === email);
        return {
          username: user ? `${user.firstName} ${user.lastName}` : "Unknown",
          email,
          loginTime: new Date(loginTime).toLocaleString()
        };
      });
    setLogins(loginRows);

    // Section 2: User Statistics
    const totalUsers = users.length;
    const today = new Date();
    const loginsToday = loginRows.filter(row => {
      const d = new Date(row.loginTime);
      return d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear();
    }).length;
    setStats({ totalUsers, loginsToday });

    // Section 3: Recent Logins (last 5)
    setRecentLogins(loginRows.slice(-5).reverse());
  }, []);

  // Sync loginData with actual logins
  useEffect(() => {
    const userLogins = JSON.parse(localStorage.getItem("userLogins")) || {};
    const loginCounts = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0
    };
    Object.values(userLogins).forEach(loginTime => {
      const date = new Date(loginTime);
      const dayName = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ][date.getDay()];
      loginCounts[dayName]++;
    });
    setLoginData(loginCounts);
  }, [logins]); // Recalculate when logins change

  useEffect(() => {
    const syncLanguage = () => {
      const lang = localStorage.getItem("language") || "en";
      setLanguage(lang);
      document.documentElement.dir = (lang === "ar" || lang === "he") ? "rtl" : "ltr";
    };
    window.addEventListener("storage", syncLanguage);
    const customLangChange = (e) => {
      const lang = e.detail || localStorage.getItem("language") || "en";
      setLanguage(lang);
      document.documentElement.dir = (lang === "ar" || lang === "he") ? "rtl" : "ltr";
    };
    window.addEventListener("languageChange", customLangChange);
    syncLanguage();
    return () => {
      window.removeEventListener("storage", syncLanguage);
      window.removeEventListener("languageChange", customLangChange);
    };
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      const theme = localStorage.getItem("theme");
      setIsDark(theme === "dark");
    };

    // Listen for theme changes
    window.addEventListener("themeChange", updateTheme);

    // Also listen for localStorage changes (if theme is changed in another tab)
    window.addEventListener("storage", updateTheme);

    // Set initial theme
    updateTheme();

    return () => {
      window.removeEventListener("themeChange", updateTheme);
      window.removeEventListener("storage", updateTheme);
    };
  }, []);

  // Add dark mode classes to main container and tables
  return (
    <div className={`w-full min-h-screen p-8 pt-24 transition-colors duration-300 ${isDark ? "dark" : ""} ${isDark ? "bg-black text-white" : "bg-gray-50 text-black"}`}>
      {/* Admin Page Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-center mb-2">
          Admin Page
        </h1>
        <p className="text-lg text-gray-500 text-center dark:text-white">
          Welcome to the admin dashboard. Here you can view user statistics, logins, and analytics.
        </p>
      </div>
      {/* Section 1: Logins Table */}
      <section className="w-full mb-10">
        <h2 className="text-2xl font-bold mb-4">User Logins</h2>
        <div className="overflow-x-auto">
          <table className={`w-full rounded-lg shadow text-left ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
            <thead className={isDark ? "bg-purple-900 text-white" : "bg-purple-600 text-white"}>
              <tr>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Login Time</th>
              </tr>
            </thead>
            <tbody>
              {logins.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 px-4 text-center text-gray-500">{isDark ? <span className="text-white">No logins found.</span> : "No logins found."}</td>
                </tr>
              ) : (
                logins.map((row, idx) => (
                  <tr key={idx} className="border-b last:border-none">
                    <td className="py-3 px-4">{row.username}</td>
                    <td className="py-3 px-4">{row.email}</td>
                    <td className="py-3 px-4">{row.loginTime}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* Section 2: User Statistics */}
      <section className="w-full mb-10">
        <h2 className="text-2xl font-bold mb-4">User Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`rounded-lg shadow p-6 flex flex-col items-center ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
            <span className="text-4xl font-bold text-purple-600">{stats.totalUsers}</span>
            <span className="mt-2 text-lg">{isDark ? <span className="text-white">Total Users</span> : "Total Users"}</span>
          </div>
          <div className={`rounded-lg shadow p-6 flex flex-col items-center ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
            <span className="text-4xl font-bold text-purple-600">{stats.loginsToday}</span>
            <span className="mt-2 text-lg">{isDark ? <span className="text-white">Logins Today</span> : "Logins Today"}</span>
          </div>
        </div>
      </section>

      {/* Section 3: Recent Logins */}
      <section className="w-full mb-10">
        <h2 className="text-2xl font-bold mb-4">Recent Logins</h2>
        <div className="overflow-x-auto">
          <table className={`w-full rounded-lg shadow text-left ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
            <thead className={isDark ? "bg-purple-900 text-white" : "bg-purple-600 text-white"}>
              <tr>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Login Time</th>
              </tr>
            </thead>
            <tbody>
              {recentLogins.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 px-4 text-center text-gray-500">{isDark ? <span className="text-white">No recent logins found.</span> : "No recent logins found."}</td>
                </tr>
              ) : (
                recentLogins.map((row, idx) => (
                  <tr key={idx} className="border-b last:border-none">
                    <td className="py-3 px-4">{row.username}</td>
                    <td className="py-3 px-4">{row.email}</td>
                    <td className="py-3 px-4">{row.loginTime}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Most Active Users */}
      <section className="w-full mb-10">
        <h2 className="text-2xl font-bold mb-4">Most Active Users</h2>
        <div className="overflow-x-auto">
          <table className={`w-full rounded-lg shadow text-left ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
            <thead className={isDark ? "bg-purple-900 text-white" : "bg-purple-600 text-white"}>
              <tr>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Login Count</th>
              </tr>
            </thead>
            <tbody>
              {mostActiveUsers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 px-4 text-center text-gray-500">{isDark ? <span className="text-white">No active users found.</span> : "No active users found."}</td>
                </tr>
              ) : (
                mostActiveUsers.map((row, idx) => (
                  <tr key={idx} className="border-b last:border-none">
                    <td className="py-3 px-4">{row.username}</td>
                    <td className="py-3 px-4">{row.email}</td>
                    <td className="py-3 px-4">{row.count}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      
      
      
      {/* Section 6: Daily Login Statistics & User Status */}
      <section className="w-full mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Daily Login Statistics (Bar Chart) */}
          <div className={`rounded-lg shadow-md p-6 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
            <h2 className="text-2xl font-bold mb-2">Daily Login Statistics</h2>
            <hr className="border-purple-600 mb-4" />
            <div className="h-64 flex items-center justify-center">
              <Bar
                data={{
                  labels: Object.keys(loginData),
                  datasets: [
                    {
                      label: 'Total Logins',
                      data: Object.values(loginData),
                      backgroundColor: [
                        "#a78bfa", // light purple
                        "#7c3aed", // purple
                        "#6d28d9", // dark purple
                        "#c4b5fd", // lighter purple
                        "#8b5cf6", // medium purple
                        "#ddd6fe", // very light purple
                        "#4c1d95"  // deepest purple
                      ],
                      borderColor: "#7c3aed", // purple border
                      borderWidth: 2,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'bottom',
                      labels: { color: isDark ? "#fff" : "#222" }
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { stepSize: 1, color: isDark ? "#fff" : "#222" },
                      grid: { color: isDark ? "#333" : "#eee" }
                    },
                    x: {
                      ticks: { color: isDark ? "#fff" : "#222" },
                      grid: { display: false }
                    }
                  },
                }}
              />
            </div>
          </div>
          {/* User Status (Pie Chart) */}
          <div className={`rounded-lg shadow-md p-6 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
            <h2 className="text-2xl font-bold mb-2">User Status</h2>
            <hr className="border-purple-600 mb-4" />
            <div className="h-64 flex items-center justify-center">
              <Pie
                data={{
                  labels: ['Active Users', 'Inactive Users'],
                  datasets: [
                    {
                      data: [
                        stats.totalUsers > 0 ? stats.loginsToday : 0,
                        stats.totalUsers > 0 ? stats.totalUsers - stats.loginsToday : 0
                      ],
                      backgroundColor: [
                        "#7c3aed", // purple for active
                        "#ddd6fe"  // very light purple for inactive
                      ],
                      borderColor: "#fff",
                      borderWidth: 2,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'bottom',
                      labels: { color: isDark ? "#fff" : "#222" }
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AdminDashboard;