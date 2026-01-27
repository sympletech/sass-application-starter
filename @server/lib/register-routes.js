import { globSync } from 'glob';
import { ObjectId } from 'mongodb';
import { db } from '@server/lib/mongo-client.js';

//  ************************************************************
//  Register Route Handler
//  ************************************************************
const registerRouteHandler = (handler) => async (req, res) => {
    try {
        const params = req.method === 'GET' ? req.query : req.body;
        const result = await handler(params, { req, res });
        return res.jsonp(result);
    } catch (error) {
        console.error(error);
        const status = error?.status || 500;
        return res.status(status).jsonp({
            error: error?.message || 'Internal Server Error',
            redirect: error?.redirect || null
        });
    }
};

//  ************************************************************
//  Register Secured Route Handler
//  ************************************************************
const registerSecuredRouteHandler = (handler) => async (req, res) => {
    const userId = req.session?.userId;
    if (!userId) {
        return res.status(401).jsonp({
            error: 'Not Authorized',
            redirect: '/login'
        });
    }

    let objectId;
    try {
        objectId = new ObjectId(userId);
    } catch {
        return res.status(401).jsonp({
            error: 'Invalid Session ID',
            redirect: '/login'
        });
    }

    const user = await db.collections.accounts.findOne({ _id: objectId });
    if (!user) {
        return res.status(401).jsonp({
            error: 'User Not Found',
            redirect: '/login'
        });
    }

    if (user.inactive) {
        return res.status(401).jsonp({
            error: 'Account Is Inactive',
            redirect: '/login'
        });
    }

    try {
        const params = req.method === 'GET' ? req.query : req.body;
        const result = await handler(params, { req, res, user });
        return res.jsonp(result);
    } catch (error) {
        console.error(error);
        const status = error?.status || 500;
        return res.status(status).jsonp({
            error: error?.message || 'Internal Server Error',
            redirect: error?.redirect || null
        });
    }
};

//  ************************************************************
//  Register Routes
//  ************************************************************
export default async (app) => {
    const _dirname = import.meta.dirname.replace('/lib', '');
    const routeDefs = globSync('./@server/routes/**/_*-routes.js', { absolute: true });

    for (const routeDef of routeDefs) {
        const routeDefPath = `..${routeDef.replace(_dirname, '')}`;
        const { default: routeDefModule } = await import(routeDefPath);

        const routeDefParams = {
            app,
            get: (path, handler) => {
                app.get(path, registerRouteHandler(handler));
            },
            post: (path, handler) => {
                app.post(path, registerRouteHandler(handler));
            },
            securedGet: (path, handler) => {
                app.get(path, registerSecuredRouteHandler(handler));
            },
            securedPost: (path, handler) => {
                app.post(path, registerSecuredRouteHandler(handler));
            }
        };

        routeDefModule(routeDefParams);
    }
};