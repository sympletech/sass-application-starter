import login from './login.js';
import me from './me.js';

export default ({ post, securedGet }) => {
    post('/auth/login', login);
    securedGet('/auth/me', me);
};
