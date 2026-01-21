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
        <AntFooter style={{ padding: '60px 40px 20px', background: 'transparent' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Row gutter={[32, 32]}>
                    <Col xs={24} sm={12} md={6}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                background: 'var(--primary-gradient)',
                                borderRadius: '6px',
                                marginRight: '10px'
                            }} />
                            <Title level={4} style={{ margin: 0 }}>Sympletech</Title>
                        </div>
                        <Text type="secondary">
                            Building the next generation of SaaS starters. Fast, secure, and ready to scale.
                        </Text>
                        <Space style={{ marginTop: '20px', fontSize: '20px' }} size="middle">
                            <TwitterOutlined className="premium-gradient-text" style={{ cursor: 'pointer' }} />
                            <GithubOutlined className="premium-gradient-text" style={{ cursor: 'pointer' }} />
                            <LinkedinOutlined className="premium-gradient-text" style={{ cursor: 'pointer' }} />
                        </Space>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Title level={5}>Product</Title>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '10px' }}><Link to="/"><Text type="secondary">Features</Text></Link></li>
                            <li style={{ marginBottom: '10px' }}><a href="/#pricing"><Text type="secondary">Pricing</Text></a></li>
                            <li style={{ marginBottom: '10px' }}><Text type="secondary">Documentation</Text></li>
                            <li style={{ marginBottom: '10px' }}><Text type="secondary">Changelog</Text></li>
                        </ul>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Title level={5}>Company</Title>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '10px' }}><Link to="/about"><Text type="secondary">About Us</Text></Link></li>
                            <li style={{ marginBottom: '10px' }}><Text type="secondary">Careers</Text></li>
                            <li style={{ marginBottom: '10px' }}><Text type="secondary">Contact</Text></li>
                            <li style={{ marginBottom: '10px' }}><Text type="secondary">Blog</Text></li>
                        </ul>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Title level={5}>Legal</Title>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '10px' }}><Link to="/legal"><Text type="secondary">Privacy Policy</Text></Link></li>
                            <li style={{ marginBottom: '10px' }}><Link to="/legal"><Text type="secondary">Terms of Service</Text></Link></li>
                            <li style={{ marginBottom: '10px' }}><Text type="secondary">Cookie Policy</Text></li>
                        </ul>
                    </Col>
                </Row>

                <Divider style={{ margin: '40px 0 20px' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                        © {new Date().getFullYear()} Sympletech Inc. All rights reserved.
                    </Text>
                    <Space size="large" style={{ marginTop: '10px' }}>
                        <Text type="secondary" style={{ fontSize: '13px', display: 'flex', alignItems: 'center' }}>
                            <GlobalOutlined style={{ marginRight: '4px' }} /> English (US)
                        </Text>
                    </Space>
                </div>
            </div>
        </AntFooter>
    );
};

export default Footer;
