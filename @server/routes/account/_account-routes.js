import initStripeForm from './init-stripe-form.js';
import signup from './signup.js';
import convertToPaid from '../account/convert-to-paid.js';
import createStripePortalSessionUrl from '../account/create-stripe-portal-session-url.js';
import cancel from './cancel.js';
import reactivate from '../account/reactivate.js';

export default ({ get, post, securedPost }) => {
    get('/auth/init-stripe-form', initStripeForm);
    post('/account/signup', signup);
    securedPost('/account/convert-to-paid', convertToPaid);
    securedPost('/account/create-stripe-portal-session-url', createStripePortalSessionUrl);
    securedPost('/account/cancel', cancel);
    post('/account/reactivate', reactivate);
};