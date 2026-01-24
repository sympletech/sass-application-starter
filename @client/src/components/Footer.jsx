import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import {
    TwitterOutlined,
    GithubOutlined,
    LinkedinOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer = () => {
    return (
        <AntFooter className="px-10 pt-16 pb-5 bg-transparent">
            <div className="max-w-[1200px] mx-auto">
                <Row gutter={[32, 32]}>
                    <Col xs={24} sm={12} md={6}>
                        <div className="flex items-center mb-5">
                            <div className="w-8 h-8 bg-gradient-primary rounded-md mr-3" />
                            <Title level={4} className="m-0">Sympletech</Title>
                        </div>
                        <Text className="text-text-body">
                            Building the next generation of SaaS starters. Fast, secure, and ready to scale.
                        </Text>
                        <Space className="mt-5 text-xl" size="middle">
                            <TwitterOutlined className="premium-gradient-text cursor-pointer hover:scale-110 transition-transform" />
                            <GithubOutlined className="premium-gradient-text cursor-pointer hover:scale-110 transition-transform" />
                            <LinkedinOutlined className="premium-gradient-text cursor-pointer hover:scale-110 transition-transform" />
                        </Space>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Title level={5}>Product</Title>
                        <ul className="list-none p-0 m-0">
                            <li className="mb-2"><Link to="/"><Text type="secondary" className="hover:text-brand-500 transition-colors">Features</Text></Link></li>
                            <li className="mb-2"><a href="/#pricing"><Text type="secondary" className="hover:text-brand-500 transition-colors">Pricing</Text></a></li>
                            <li className="mb-2"><Text type="secondary" className="cursor-not-allowed">Documentation</Text></li>
                            <li className="mb-2"><Text type="secondary" className="cursor-not-allowed">Changelog</Text></li>
                        </ul>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Title level={5}>Company</Title>
                        <ul className="list-none p-0 m-0">
                            <li className="mb-2"><Link to="/about"><Text type="secondary" className="hover:text-brand-500 transition-colors">About Us</Text></Link></li>
                            <li className="mb-2"><Text type="secondary" className="cursor-not-allowed">Careers</Text></li>
                            <li className="mb-2"><Text type="secondary" className="cursor-not-allowed">Contact</Text></li>
                            <li className="mb-2"><Text type="secondary" className="cursor-not-allowed">Blog</Text></li>
                        </ul>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Title level={5}>Legal</Title>
                        <ul className="list-none p-0 m-0">
                            <li className="mb-2"><Link to="/legal"><Text type="secondary" className="hover:text-brand-500 transition-colors">Privacy Policy</Text></Link></li>
                            <li className="mb-2"><Link to="/legal"><Text type="secondary" className="hover:text-brand-500 transition-colors">Terms of Service</Text></Link></li>
                            <li className="mb-2"><Text type="secondary" className="cursor-not-allowed">Cookie Policy</Text></li>
                        </ul>
                    </Col>
                </Row>

                <Divider className="my-10 mt-10 mb-5" />

                <div className="flex flex-wrap justify-between items-center gap-4">
                    <Text className="text-text-muted text-[13px]">
                        © {new Date().getFullYear()} Sympletech Inc. All rights reserved.
                    </Text>
                    <Space size="large">
                        <Text type="secondary" className="text-[13px] flex items-center">
                            <GlobalOutlined className="mr-1" /> English (US)
                        </Text>
                    </Space>
                </div>
            </div>
        </AntFooter>
    );
};

export default Footer;
