import stripeClient from '@server/lib/stripe-client.js';
import { clientBase } from '@server/lib/client-path-helpers.js';

export default async (_params, { user }) => {
    if (!user.stripeCustomerId) {
        throw new Error('No billing account found');
    }

    const session = await stripeClient.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${clientBase}/profile`,
    });

    return { url: session.url };
}