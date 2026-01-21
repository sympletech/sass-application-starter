import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Layout as AntLayout, Menu, Button, Drawer, Switch, ConfigProvider, theme } from 'antd';
import {
    MenuOutlined,
    HomeOutlined,
    LoginOutlined,
    UserAddOutlined,
    BulbOutlined,
    BulbFilled,
    InfoCircleOutlined,
    DollarOutlined,
    FileTextOutlined
} from '@ant-design/icons';

const { Header, Content } = AntLayout;
import Footer from '../../components/Footer.jsx';

function PublicLayout() {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    // Handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    // Menu items configuration
    const menuItems = [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: <Link to="/">Home</Link>,
        },
        {
            key: '/about',
            icon: <InfoCircleOutlined />,
            label: <Link to="/about">About</Link>,
        },
        {
            key: '/#pricing',
            icon: <DollarOutlined />,
            label: <a href="/#pricing">Pricing</a>,
        },
        {
            key: '/legal',
            icon: <FileTextOutlined />,
            label: <Link to="/legal">Legal</Link>,
        },
        {
            key: '/login',
            icon: <LoginOutlined />,
            label: <Link to="/login">Login</Link>,
        },
        {
            key: '/signup',
            icon: <UserAddOutlined />,
            label: <Link to="/signup">Signup</Link>,
        },
    ];

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#6366f1',
                    borderRadius: 8,
                    fontFamily: 'Inter, system-ui, sans-serif',
                },
            }}
        >
            <AntLayout style={{ minHeight: '100vh' }}>
                <Header
                    className={`glass-header ${isDarkMode ? 'dark' : ''}`}
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1000,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 24px',
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
                <Footer />
            </AntLayout>
        </ConfigProvider>
    );
}

export default PublicLayout;
