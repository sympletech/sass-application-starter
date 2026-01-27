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

// Hooks
import { useResponsive } from '@client/hooks/use-responsive.js';
import { useTheme } from '@client/hooks/use-theme.js';
import { useDrawer } from '@client/hooks/use-drawer.js';

// Components
import Logo from '@client/components/logo/logo.jsx';
import Footer from '@client/components/footer.jsx';

const { Header, Content } = AntLayout;

function PublicLayout() {
    const location = useLocation();
    const { isMobile } = useResponsive();
    const { isDarkMode, toggleTheme } = useTheme();
    const { drawerVisible, toggleDrawer } = useDrawer();

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
                    colorPrimary: 'var(--color-brand-500)',
                    borderRadius: 8,
                    fontFamily: 'Inter, system-ui, sans-serif',
                },
            }}
        >
            <AntLayout className="min-h-screen">
                <Header
                    className={`glass-header sticky top-0 z-[1000] w-full h-16 flex items-center justify-between px-6 ${isDarkMode ? 'dark' : ''}`}
                >
                    {/* Logo Section */}
                    <Logo to="/" showText={!isMobile} isDarkMode={isDarkMode} />

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
                                className="ml-2"
                            />
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
                <Content className="px-6 py-6 min-h-[calc(100vh-64px-134px)]">
                    <div className="max-w-[1200px] mx-auto">
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
