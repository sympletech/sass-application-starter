import { Outlet, Link } from 'react-router-dom';

function Layout() {
    return (
        <div className="layout">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </ul>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
