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

// Hooks
import { useResponsive } from '@client/hooks/use-responsive.js';
import { useTheme } from '@client/hooks/use-theme.js';
import { useDrawer } from '@client/hooks/use-drawer.js';

// Components
import Logo from '@client/components/Logo/logo.jsx';
import { apiBaseUrl, getData } from '@client/lib/use-api.js';

const { Header, Content, Footer } = AntLayout;

function LoggedInLayout() {
    const [authLoading, setAuthLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { isMobile } = useResponsive();
    const { isDarkMode, toggleTheme } = useTheme();
    const { drawerVisible, toggleDrawer } = useDrawer();

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
                console.error('Auth check failed', error);
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);

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
                    className="sticky top-0 z-[1000] w-full h-16 flex items-center justify-between px-6 shadow-soft bg-surface-base border-b border-surface-border"
                >
                    {/* Logo Section */}
                    <Logo to="/@" showText={!isMobile} isDarkMode={isDarkMode} />

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
