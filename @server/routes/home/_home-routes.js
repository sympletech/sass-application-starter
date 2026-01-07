export default ({ get, post }) => {
    get('/home/hello', ({ name = 'world' }) => {
        const response = `Hello ${name}`;
        return response;
    });

    post('/home/hello', ({ name = 'Post World' }) => {
        const response = `Post Hello ${name}`;
        return response;
    });
};