import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout as AntLayout, Menu, Button, Drawer, Switch, ConfigProvider, theme, Dropdown, Avatar, Spin } from 'antd';
import {
    MenuOutlined,
    DashboardOutlined,
    LogoutOutlined,
    BulbOutlined,
    BulbFilled,
    UserOutlined,
    SettingOutlined
} from '@ant-design/icons';

import { apiBaseUrl, getData } from '@client/lib/use-api.js';

const { Header, Content, Footer } = AntLayout;

function LoggedInLayout() {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    // Handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auth gate: Check authentication status
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await getData('/auth/me');
                if (!user || !user.email) {
                    // Not authenticated
                    navigate('/login');
                    return;
                }
                if (user.inactive) {
                    // Inactive account - redirect to reactivate
                    navigate(`/reactivate?email=${encodeURIComponent(user.email)}`);
                    return;
                }
                // Authenticated and active
                setAuthLoading(false);
            } catch (error) {
                // If /auth/me fails (401, etc.), redirect to login
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);

    // Close drawer when route changes
    useEffect(() => {
        setDrawerVisible(false);
    }, [location]);

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleLogout = () => {
        window.location.href = `${apiBaseUrl}/auth/logout`;
    };

    // Menu items configuration
    const menuItems = [
        {
            key: '/@',
            icon: <DashboardOutlined />,
            label: <Link to="/@">Dashboard</Link>,
        },
        {
            key: '/logout',
            icon: <LogoutOutlined />,
            label: <span onClick={handleLogout}>Logout</span>,
        },
    ];

    // Profile dropdown menu items
    const profileMenuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: <Link to="/@/profile">Profile</Link>,
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: <Link to="/@/settings">Settings</Link>,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: handleLogout,
        },
    ];

    // Show loading spinner while checking auth
    if (authLoading) {
        return (
            <ConfigProvider
                theme={{
                    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <Spin size="large" />
                </div>
            </ConfigProvider>
        );
    }

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <AntLayout style={{ minHeight: '100vh' }}>
                <Header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1000,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 24px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        background: isDarkMode ? '#001529' : '#ffffff',
                    }}
                >
                    {/* Logo Placeholder */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '20px',
                                marginRight: '12px',
                            }}
                        >
                            L
                        </div>
                        <span
                            style={{
                                color: isDarkMode ? '#fff' : 'rgba(0, 0, 0, 0.85)',
                                fontSize: '18px',
                                fontWeight: '600',
                                display: isMobile ? 'none' : 'inline',
                            }}
                        >
                            Sympletech Application Starter
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, justifyContent: 'flex-end' }}>
                            <Menu
                                mode="horizontal"
                                selectedKeys={[location.pathname]}
                                items={menuItems}
                                style={{
                                    flex: 1,
                                    minWidth: 0,
                                    border: 'none',
                                    justifyContent: 'flex-end',
                                }}
                            />
                            <Switch
                                checked={isDarkMode}
                                onChange={toggleTheme}
                                checkedChildren={<BulbFilled />}
                                unCheckedChildren={<BulbOutlined />}
                            />
                            <Dropdown
                                menu={{ items: profileMenuItems }}
                                placement="bottomRight"
                                trigger={['click']}
                            >
                                <Avatar
                                    style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        cursor: 'pointer',
                                    }}
                                    icon={<UserOutlined />}
                                />
                            </Dropdown>
                        </div>
                    )}

                    {/* Mobile Navigation Toggle */}
                    {isMobile && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Switch
                                checked={isDarkMode}
                                onChange={toggleTheme}
                                checkedChildren={<BulbFilled />}
                                unCheckedChildren={<BulbOutlined />}
                                size="small"
                            />
                            <Dropdown
                                menu={{ items: profileMenuItems }}
                                placement="bottomRight"
                                trigger={['click']}
                            >
                                <Avatar
                                    size="small"
                                    style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        cursor: 'pointer',
                                    }}
                                    icon={<UserOutlined />}
                                />
                            </Dropdown>
                            <Button
                                type="text"
                                icon={<MenuOutlined />}
                                onClick={toggleDrawer}
                                style={{
                                    fontSize: '20px',
                                    color: isDarkMode ? '#fff' : 'rgba(0, 0, 0, 0.85)',
                                }}
                            />
                        </div>
                    )}
                </Header>

                {/* Mobile Drawer */}
                <Drawer
                    title="Menu"
                    placement="right"
                    onClose={toggleDrawer}
                    open={drawerVisible}
                    width={280}
                >
                    <Menu
                        mode="vertical"
                        selectedKeys={[location.pathname]}
                        items={menuItems}
                        style={{ border: 'none' }}
                    />
                </Drawer>

                {/* Main Content */}
                <Content
                    style={{
                        padding: '24px',
                        minHeight: 'calc(100vh - 64px - 70px)',
                    }}
                >
                    <div
                        style={{
                            maxWidth: '1200px',
                            margin: '0 auto',
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>

                {/* Footer */}
                <Footer
                    style={{
                        textAlign: 'center',
                        padding: '24px 50px',
                    }}
                >
                    <div style={{ marginBottom: '8px' }}>
                        MyApp ©{new Date().getFullYear()} Created with ❤️
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.7 }}>
                        Built with React & Ant Design
                    </div>
                </Footer>
            </AntLayout>
        </ConfigProvider>
    );
}

export default LoggedInLayout;
