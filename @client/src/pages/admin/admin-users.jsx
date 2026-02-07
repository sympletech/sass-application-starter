import { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Tag, Modal, message, Card, Tooltip } from 'antd';
import { SearchOutlined, ReloadOutlined, StopOutlined, CheckCircleOutlined, CreditCardOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { getData, postData } from '@client/lib/use-api.js';

const { Search } = Input;
const { confirm } = Modal;

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        total: 0
    });

    const fetchUsers = async (page = 1, limit = 20, search = '') => {
        setLoading(true);
        try {
            const response = await getData('/admin/users', {
                page: page.toString(),
                limit: limit.toString(),
                search
            });
            setUsers(response.users);
            setPagination({
                current: response.pagination.page,
                pageSize: response.pagination.limit,
                total: response.pagination.total
            });
        } catch (error) {
            message.error(error?.response?.data?.error || 'Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleTableChange = (newPagination) => {
        fetchUsers(newPagination.current, newPagination.pageSize, searchText);
    };

    const handleSearch = (value) => {
        setSearchText(value);
        fetchUsers(1, pagination.pageSize, value);
    };

    const handleUpdateStatus = async (userId, inactive, userName) => {
        const action = inactive ? 'inactivate' : 'reactivate';
        confirm({
            title: `Are you sure you want to ${action} this user?`,
            content: `User: ${userName}`,
            okText: 'Yes',
            okType: inactive ? 'danger' : 'primary',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await postData('/admin/users/update-status', { userId, inactive });
                    message.success(`User ${action}d successfully`);
                    fetchUsers(pagination.current, pagination.pageSize, searchText);
                } catch (error) {
                    message.error(error?.response?.data?.error || `Failed to ${action} user`);
                }
            }
        });
    };

    const handleUpdateSubscription = async (userId, action, userName) => {
        const actionMessages = {
            'convert-to-paid': 'convert to paid subscription',
            'cancel-subscription': 'cancel subscription',
            'reactivate-subscription': 'reactivate subscription'
        };

        confirm({
            title: `Are you sure you want to ${actionMessages[action]}?`,
            content: `User: ${userName}`,
            okText: 'Yes',
            okType: action === 'cancel-subscription' ? 'danger' : 'primary',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await postData('/admin/users/update-subscription', { userId, action });
                    message.success(`Subscription updated successfully`);
                    fetchUsers(pagination.current, pagination.pageSize, searchText);
                } catch (error) {
                    message.error(error?.response?.data?.error || 'Failed to update subscription');
                }
            }
        });
    };

    const getPlanTag = (plan, subscriptionStatus) => {
        if (!plan || plan === 'trial') {
            return <Tag color="blue">Trial</Tag>;
        }
        if (subscriptionStatus === 'canceled') {
            return <Tag color="red">Canceled</Tag>;
        }
        if (subscriptionStatus === 'active') {
            return <Tag color="green">Paid</Tag>;
        }
        return <Tag color="orange">{plan}</Tag>;
    };

    const getStatusTag = (inactive) => {
        return inactive 
            ? <Tag color="red">Inactive</Tag> 
            : <Tag color="green">Active</Tag>;
    };

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            fixed: 'left',
            width: 250,
            ellipsis: true
        },
        {
            title: 'Name',
            key: 'name',
            width: 200,
            render: (_, record) => {
                const name = [record.firstName, record.lastName].filter(Boolean).join(' ');
                return name || '-';
            }
        },
        {
            title: 'Status',
            key: 'status',
            width: 100,
            render: (_, record) => getStatusTag(record.inactive)
        },
        {
            title: 'Plan',
            key: 'plan',
            width: 100,
            render: (_, record) => getPlanTag(record.plan, record.subscriptionStatus)
        },
        {
            title: 'Role',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            width: 100,
            render: (isAdmin) => isAdmin ? <Tag color="purple">Admin</Tag> : <Tag>User</Tag>
        },
        {
            title: 'Auth Type',
            key: 'authType',
            width: 120,
            render: (_, record) => {
                if (record.isSocial && record.oauthProvider) {
                    return <Tag>{record.oauthProvider}</Tag>;
                }
                return record.isSocial ? <Tag>Social</Tag> : <Tag>Password</Tag>;
            }
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            render: (date) => date ? new Date(date).toLocaleDateString() : '-'
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            width: 250,
            render: (_, record) => {
                const isInactive = record.inactive;
                const isAdmin = record.isAdmin;
                const isTrial = record.plan === 'trial';
                const isCanceled = record.subscriptionStatus === 'canceled';
                const cancelAtPeriodEnd = record.cancelAtPeriodEnd;

                return (
                    <Space size="small" wrap>
                        {!isAdmin && (
                            <Tooltip title={isInactive ? 'Reactivate Account' : 'Inactivate Account'}>
                                <Button
                                    size="small"
                                    type={isInactive ? 'primary' : 'default'}
                                    danger={!isInactive}
                                    icon={isInactive ? <CheckCircleOutlined /> : <StopOutlined />}
                                    onClick={() => handleUpdateStatus(record.id, !isInactive, record.email)}
                                >
                                    {isInactive ? 'Reactivate' : 'Inactivate'}
                                </Button>
                            </Tooltip>
                        )}
                        
                        {!isInactive && record.subscriptionId && (
                            <>
                                {isTrial && (
                                    <Tooltip title="Convert Trial to Paid">
                                        <Button
                                            size="small"
                                            type="primary"
                                            icon={<CreditCardOutlined />}
                                            onClick={() => handleUpdateSubscription(record.id, 'convert-to-paid', record.email)}
                                        >
                                            Convert
                                        </Button>
                                    </Tooltip>
                                )}
                                
                                {!isTrial && !isCanceled && !cancelAtPeriodEnd && (
                                    <Tooltip title="Cancel Subscription">
                                        <Button
                                            size="small"
                                            danger
                                            icon={<CloseCircleOutlined />}
                                            onClick={() => handleUpdateSubscription(record.id, 'cancel-subscription', record.email)}
                                        >
                                            Cancel
                                        </Button>
                                    </Tooltip>
                                )}
                                
                                {cancelAtPeriodEnd && (
                                    <Tooltip title="Reactivate Subscription">
                                        <Button
                                            size="small"
                                            type="primary"
                                            icon={<CheckCircleOutlined />}
                                            onClick={() => handleUpdateSubscription(record.id, 'reactivate-subscription', record.email)}
                                        >
                                            Reactivate
                                        </Button>
                                    </Tooltip>
                                )}
                            </>
                        )}
                    </Space>
                );
            }
        }
    ];

    return (
        <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ margin: 0 }}>User Management</h1>
                    <Space>
                        <Search
                            placeholder="Search users by email or name"
                            allowClear
                            enterButton={<SearchOutlined />}
                            size="large"
                            onSearch={handleSearch}
                            style={{ width: 400 }}
                        />
                        <Button
                            size="large"
                            icon={<ReloadOutlined />}
                            onClick={() => fetchUsers(pagination.current, pagination.pageSize, searchText)}
                        >
                            Refresh
                        </Button>
                    </Space>
                </div>

                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey="id"
                    loading={loading}
                    pagination={pagination}
                    
                    onChange={handleTableChange}
                    scroll={{ x: 1400 }}
                />
            </Space>
        </Card>
    );
}

export default AdminUsers;
