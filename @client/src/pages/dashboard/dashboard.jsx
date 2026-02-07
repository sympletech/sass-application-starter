import './dashboard.css';

function Dashboard() {
    return (
        <div className="dashboardContainer">
            <header className="header">
                <h1>SYSTEM OVERVIEW <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '400' }}>v2.4.0</span></h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>LAST SYNC</div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>06 FEB 2026 23:15:42</div>
                    </div>
                </div>
            </header>

            <div className="dashboardGrid">
                {/* Stats Row */}
                <div className="card statCard">
                    <span className="statLabel">TOTAL THROUGHPUT</span>
                    <span className="statValue">1,284.5 GB</span>
                    <div className="statTrend trendUp">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                        +12.4%
                    </div>
                    <svg className="sparkline" viewBox="0 0 100 40">
                        <path d="M0,35 Q10,32 20,38 T40,30 T60,35 T80,25 T100,32" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    </svg>
                </div>

                <div className="card statCard">
                    <span className="statLabel">ACTIVE SESSIONS</span>
                    <span className="statValue">42,903</span>
                    <div className="statTrend trendUp">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                        +8.1%
                    </div>
                    <svg className="sparkline" viewBox="0 0 100 40">
                        <path d="M0,30 Q10,35 20,28 T40,32 T60,25 T80,30 T100,20" fill="none" stroke="#818cf8" strokeWidth="2" />
                    </svg>
                </div>

                <div className="card statCard">
                    <span className="statLabel">LATENCY</span>
                    <span className="statValue">18.4 MS</span>
                    <div className="statTrend trendDown">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ transform: 'rotate(90deg)' }}><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                        -2.3%
                    </div>
                    <svg className="sparkline" viewBox="0 0 100 40">
                        <path d="M0,20 Q10,25 20,22 T40,28 T60,20 T80,22 T100,25" fill="none" stroke="#f472b6" strokeWidth="2" />
                    </svg>
                </div>

                <div className="card statCard">
                    <span className="statLabel">ERROR RATE</span>
                    <span className="statValue">0.02 %</span>
                    <div className="statTrend trendDown">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ transform: 'rotate(90deg)' }}><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                        -0.01%
                    </div>
                    <svg className="sparkline" viewBox="0 0 100 40">
                        <path d="M0,40 L20,38 L40,39 L60,37 L80,38 L100,37" fill="none" stroke="#fbbf24" strokeWidth="2" />
                    </svg>
                </div>

                {/* Main Visual */}
                <div className="card mainVisual">
                    <span className="visualTitle">Global Node Distribution</span>
                    <div className="mapContainer">
                        <svg viewBox="0 0 800 400" width="100%" height="100%" style={{ filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.3))' }}>
                            {/* Simplified World Outline */}
                            <path d="M150,100 Q180,80 220,100 T300,120 T380,100 T450,120 T550,100 T650,120 T750,100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            <path d="M100,200 Q150,180 200,220 T300,200 T400,240 T500,210 T600,230 T700,200" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            <circle cx="200" cy="150" r="4" fill="#38bdf8">
                                <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="450" cy="180" r="4" fill="#818cf8">
                                <animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="1;0.2;1" dur="3s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="600" cy="120" r="4" fill="#f472b6">
                                <animate attributeName="r" values="4;8;4" dur="2.5s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite" />
                            </circle>
                            <line x1="200" y1="150" x2="450" y2="180" stroke="rgba(56, 189, 248, 0.2)" strokeDasharray="5,5" />
                            <line x1="450" y1="180" x2="600" y2="120" stroke="rgba(129, 140, 248, 0.2)" strokeDasharray="5,5" />
                        </svg>
                    </div>
                </div>

                {/* Distribution Charts */}
                <div className="card distributionCard">
                    <span className="statLabel">RESOURCE ALLOCATION</span>
                    <div className="donutContainer">
                        <div className="donut"></div>
                        <div className="donutCenter">
                            <div className="donutValue">78%</div>
                            <div className="donutLabel">USED</div>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1rem' }}>
                        <div style={{ fontSize: '0.7rem', color: '#38bdf8' }}>● COMPUTE</div>
                        <div style={{ fontSize: '0.7rem', color: '#818cf8' }}>● STORAGE</div>
                        <div style={{ fontSize: '0.7rem', color: '#f472b6' }}>● NETWORK</div>
                        <div style={{ fontSize: '0.7rem', color: '#fbbf24' }}>● AUX</div>
                    </div>
                </div>

                <div className="card distributionCard">
                    <span className="statLabel">LOAD PER REGION</span>
                    <div className="chartPlaceholder">
                        <div className="bar" style={{ height: '60%' }}></div>
                        <div className="bar" style={{ height: '85%' }}></div>
                        <div className="bar" style={{ height: '45%' }}></div>
                        <div className="bar" style={{ height: '95%' }}></div>
                        <div className="bar" style={{ height: '70%' }}></div>
                        <div className="bar" style={{ height: '30%' }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.6rem', color: '#64748b' }}>
                        <span>US-E</span>
                        <span>US-W</span>
                        <span>EU-C</span>
                        <span>AP-S</span>
                        <span>SA-E</span>
                        <span>AF-S</span>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="card listCard">
                    <span className="statLabel">SECURITY EVENTS</span>
                    <div style={{ marginTop: '1rem' }}>
                        {[
                            { time: '23:14:02', msg: 'Firewall: Blocked IP 192.168.1.45', type: 'warn' },
                            { time: '23:12:45', msg: 'Auth: Successful login - admin_node_1', type: 'info' },
                            { time: '23:10:12', msg: 'System: Kernel update complete', type: 'success' },
                            { time: '23:08:55', msg: 'DB: Automated backup initiated', type: 'info' },
                            { time: '23:05:30', msg: 'Scale: Spawned instance worker-7b', type: 'success' },
                            { time: '23:02:11', msg: 'Alert: Latency spike in AP-S', type: 'error' },
                        ].map((log, i) => (
                            <div key={i} className="logItem">
                                <div className="logTime">{log.time}</div>
                                <div className="logContent" style={{ color: log.type === 'error' ? '#ef4444' : log.type === 'warn' ? '#fbbf24' : log.type === 'success' ? '#10b981' : '#e2e8f0' }}>
                                    {log.msg}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance Radar Placeholder */}
                <div className="card" style={{ gridColumn: 'span 1' }}>
                    <span className="statLabel">SYSTEM STABILITY</span>
                    <div className="radarContainer">
                        <svg viewBox="0 0 100 100" width="120" height="120">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                            <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                            <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                            <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                            <path d="M50,15 L80,40 L70,75 L30,75 L20,40 Z" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="1" />
                        </svg>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '600' }}>OPTIMIZED</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

