export default ({ get, post }) => {
    get('/api/test', () => {
        const name = 'Test User';
        return { message: `Hello, ${name}! This is a test route.` };
     });
};