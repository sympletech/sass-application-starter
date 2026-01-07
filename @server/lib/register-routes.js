import { globSync } from 'glob';

export default async (app) => {
    const _dirname = import.meta.dirname.replace('/lib', '');
    const routeDefs = globSync('./@server/routes/**/_*-routes.js', { absolute: true });

    for (const routeDef of routeDefs) {
        const routeDefPath = `..${routeDef.replace(_dirname, '')}`;
        const { default: routeDefModule } = await import(routeDefPath);

        const routeDefParams = {
            get: (path, handler) => {
                app.get(path, async (req, res) => {
                    try {
                        const params = req.query;
                        const result = await handler(params);
                        res.jsonp(result);
                    } catch (error) {
                        console.error(error);
                        res.status(500).jsonp({ error: error.message });
                    }
                });
            },
            post: (path, handler) => {
                app.post(path, async (req, res) => {
                    try {
                        const params = req.body;
                        const result = await handler(params);
                        res.jsonp(result);
                    } catch (error) {
                        console.error(error);
                        res.status(500).jsonp({ error: error.message });
                    }
                });
            }
        };

        routeDefModule(routeDefParams);
    }
};