import stripeClient from '@server/lib/stripe-client.js';

export default async () => {
    const setupIntent = await stripeClient.setupIntents.create({
        payment_method_types: ['card'],
    });
    return { clientSecret: setupIntent.client_secret };
}