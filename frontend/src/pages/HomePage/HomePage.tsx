import "./HomePage.css";

import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import Path from "../../assets/path.svg";
import Logo1 from "../../assets/HomePage/Usenov_logo.svg";
import Logo2 from "../../assets/HomePage/Flowtab_logo.svg";
import Logo3 from "../../assets/HomePage/Artify_logo.svg";
import GithubLogo from "../../assets/HomePage/Github_logo.svg";

import HomeNavbar from "../../components/HomeNavbar/HomeNavbar";
import HomeFooter from "../../components/HomeFooter/HomeFooter";

import DashboardIcon from "../../assets/HomePage/Dashboard_icon.svg";

const latencyData = [
    { time: "10:00", latency: 84 },
    { time: "10:30", latency: 72 },
    { time: "11:00", latency: 96 },
    { time: "11:30", latency: 64 },
    { time: "12:00", latency: 78 },
    { time: "12:30", latency: 58 },
    { time: "13:00", latency: 69 },
    { time: "13:30", latency: 52 },
];

export function HomePage() {
    return (
        <main className="home-page">
            <HomeNavbar />

            <section className="home-hero">
                <img src={Path} alt="" className="home-hero-path" />

                <div className="home-hero-content">
                    <div className="home-members-badge">
                        <div className="home-avatar-stack">
                            <img src={Logo3} alt="" />
                            <img src={Logo2} alt="" />
                            <img src={Logo1} alt="" />
                        </div>

                        <span>Live monitoring</span>

                        <a href="/widget">Widget →</a>
                    </div>

                    <h1>
                        Monitor your services.
                        <br />
                        Share your uptime.
                    </h1>

                    <p>
                        A modern status platform for websites, APIs and developer tools.
                        Built with Cloudflare Workers, Supabase and a reusable React widget.
                    </p>

                    <a href="/live" className="home-primary-button">
                        View live status
                    </a>
                </div>
            </section>

            <section className="home-dashboard">
                <div className="home-dashboard-header">
                    <div className="home-dashboard-tag">
                        <img src={DashboardIcon} alt="" />
                        Dashboard
                    </div>

                    <h2>An intuitive analytic dashboard</h2>

                    <p>
                        Get deep visibility and control with real-time status,
                        latency history and monitoring analytics.
                    </p>
                </div>

                <div className="home-dashboard-preview">
                    <div className="home-dashboard-topbar">
                        <div>
                            <p className="home-dashboard-label">Usenov Status</p>
                            <h3>Latency graph</h3>
                        </div>

                        <div className="home-dashboard-status">
                            All systems operational
                        </div>
                    </div>

                    <div className="home-dashboard-stats">
                        <div>
                            <span>Uptime</span>
                            <strong>99.98%</strong>
                        </div>

                        <div>
                            <span>Avg latency</span>
                            <strong>72ms</strong>
                        </div>

                        <div>
                            <span>Checks</span>
                            <strong>128</strong>
                        </div>
                    </div>

                    <div
                        className="home-dashboard-chart-real"
                        onMouseDown={(event) => event.preventDefault()}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={latencyData}>
                                <defs>
                                    <linearGradient
                                        id="homeLatencyGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#34d399"
                                            stopOpacity={0.35}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#34d399"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>

                                <XAxis
                                    dataKey="time"
                                    stroke="#71717a"
                                    tick={{ fontSize: 12 }}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <YAxis
                                    stroke="#71717a"
                                    tick={{ fontSize: 12 }}
                                    unit="ms"
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <Tooltip
                                    cursor={{
                                        stroke: "rgba(52, 211, 153, 0.25)",
                                        strokeWidth: 1,
                                    }}
                                    contentStyle={{
                                        background: "#09090b",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "14px",
                                        color: "#fff",
                                    }}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="latency"
                                    stroke="#34d399"
                                    fill="url(#homeLatencyGradient)"
                                    strokeWidth={2}
                                    activeDot={{ r: 4 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="home-dashboard-services">
                        <div>
                            <span className="status-dot online" />
                            API Gateway
                        </div>

                        <div>
                            <span className="status-dot online" />
                            Auth Service
                        </div>

                        <div>
                            <span className="status-dot degraded" />
                            Image CDN
                        </div>

                        <div>
                            <span className="status-dot online" />
                            Status Widget
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-open-source">
                <div className="home-open-glow" />

                <div className="home-open-source-content">
                    <div className="home-open-source-left">
                        <div className="home-open-source-badge">
                            <img src={GithubLogo} alt="" />
                            Open source ecosystem
                        </div>

                        <h2>
                            Built for developers.
                            <br />
                            Designed for scale.
                        </h2>

                        <p>
                            Usenov Status combines realtime monitoring,
                            public status pages and embeddable widgets
                            into one modern ecosystem powered by
                            Cloudflare Workers and React.
                        </p>

                        <div className="home-open-source-actions">
                            <a
                                href="https://github.com/ArseniiFrontend/Usenov-Status"
                                target="_blank"
                                rel="noreferrer"
                                className="home-github-button"
                            >
                                <img src={GithubLogo} alt="" />
                                View on GitHub
                            </a>

                            <a href="/live" className="home-live-button">
                                Open live demo
                            </a>
                        </div>
                    </div>

                    <div className="home-open-source-right">
                        <div className="home-code-window">
                            <div className="home-code-window-top">
                                <div className="home-code-window-dots">
                                    <span />
                                    <span />
                                    <span />
                                </div>

                                <p>status-widget.tsx</p>
                            </div>

                            <div className="home-code-window-content">
                                <div className="home-code-line">
                                    <span className="code-blue">import</span>
                                    <span className="code-white">
                                        {" { StatusWidget } "}
                                    </span>
                                    <span className="code-blue">from</span>
                                    <span className="code-green">
                                        "@usenov/status-widget"
                                    </span>
                                </div>

                                <div className="home-code-line">
                                    <span className="code-blue">import</span>
                                    <span className="code-green">
                                        "@usenov/status-widget/dist/status-widget.css"
                                    </span>
                                </div>

                                <div className="home-code-space" />

                                <div className="home-code-line">
                                    <span className="code-blue">
                                        export default function
                                    </span>
                                    <span className="code-yellow"> Dashboard</span>
                                    <span>()</span>
                                </div>

                                <div className="home-code-line">
                                    <span>{"{"}</span>
                                </div>

                                <div className="home-code-line code-indent">
                                    <span className="code-blue">return</span>
                                </div>

                                <div className="home-code-line code-indent-xl">
                                    <span className="code-blue">&lt;StatusWidget</span>
                                </div>

                                <div className="home-code-line code-indent-2xl">
                                    service="Artify API"
                                </div>

                                <div className="home-code-line code-indent-2xl">
                                    workerUrl="https://status.usenov.com"
                                </div>

                                <div className="home-code-line code-indent-2xl">
                                    theme="glass"
                                </div>

                                <div className="home-code-line code-indent-xl">
                                    <span className="code-blue">/&gt;</span>
                                </div>

                                <div className="home-code-line">
                                    <span>{"}"}</span>
                                </div>
                            </div>

                            <div className="home-code-stack">
                                <span>React</span>
                                <span>TypeScript</span>
                                <span>Cloudflare</span>
                                <span>Supabase</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <HomeFooter />
        </main>
    );
}

export default HomePage;