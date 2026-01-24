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
                    navigate('/login');
                    return;
                }
                if (user.inactive) {
                    navigate(`/reactivate?email=${encodeURIComponent(user.email)}`);
                    return;
                }
                setAuthLoading(false);
            } catch (error) {
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);

    // Close drawer when route changes
    useEffect(() => {
        setDrawerVisible(false);
    }, [location]);

    // Sync CSS variables with selected theme
    useEffect(() => {
        const root = document.documentElement;
        root.dataset.theme = isDarkMode ? 'dark' : 'light';
        root.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

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

    if (authLoading) {
        return (
            <ConfigProvider
                theme={{
                    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                }}
            >
                <div className="flex justify-center items-center min-h-screen">
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
            <AntLayout className="min-h-screen">
                <Header
                    className="sticky top-0 z-[1000] w-full flex items-center justify-between px-6 shadow-soft bg-surface-base border-b border-surface-border"
                    style={{ height: '64px' }}
                >
                    {/* Logo Section */}
                    <Link to="/@" className="flex items-center h-full no-underline">
                        <div className="w-10 h-10 bg-gradient-alt rounded-lg flex items-center justify-center text-text-inverse font-bold text-xl mr-3 shadow-soft">
                            S
                        </div>
                        <span className={`text-lg font-semibold ${isDarkMode ? 'text-text-inverse' : 'text-text-strong'} ${isMobile ? 'hidden' : 'inline'}`}>
                            Sympletech
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <div className="flex items-center gap-4 flex-1 justify-end">
                            <Menu
                                mode="horizontal"
                                selectedKeys={[location.pathname]}
                                items={menuItems}
                                className="flex-1 min-w-0 border-none justify-end bg-transparent"
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
                                    className="bg-gradient-alt cursor-pointer shadow-soft"
                                    icon={<UserOutlined />}
                                />
                            </Dropdown>
                        </div>
                    )}

                    {/* Mobile Navigation Toggle */}
                    {isMobile && (
                        <div className="flex items-center gap-3">
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
                                    className="bg-gradient-alt cursor-pointer shadow-soft"
                                    icon={<UserOutlined />}
                                />
                            </Dropdown>
                            <Button
                                type="text"
                                icon={<MenuOutlined />}
                                onClick={toggleDrawer}
                                className={`text-xl ${isDarkMode ? 'text-text-inverse' : 'text-text-strong'}`}
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
                        className="border-none"
                    />
                </Drawer>

                {/* Main Content */}
                <Content className="p-6 md:p-8">
                    <div className="max-w-[1200px] mx-auto min-h-[calc(100vh-64px-140px)]">
                        <Outlet />
                    </div>
                </Content>

                {/* Footer */}
                <Footer className="text-center py-8">
                    <div className="mb-2 text-text-strong font-medium">
                        Sympletech ©{new Date().getFullYear()} Created with ❤️
                    </div>
                    <div className="text-xs text-text-muted">
                        Built with React & Ant Design
                    </div>
                </Footer>
            </AntLayout>
        </ConfigProvider>
    );
}

export default LoggedInLayout;
