import { Request, Response, NextFunction } from 'express'
import { get, controller, use } from './decorators'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../swagger.json'

function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.loggedIn) {
        return next();
    }

    res.status(403);
    res.send('Not permitted');
}

@controller('')
class routeController {
    @get('/')
    getRoute(req: Request, res: Response) {
        if (req.session && req.session.loggedIn) {
            res.send(`
            <div>
                <div> You are logged in </div>
                <a href='/auth/logout'> Logout </a>
            </div>
            `)
        } else {
            res.send(`
            <div>
                <div> You are NOT logged in </div>
                <a href='/auth/login'> Login </a>
            </div>
            `)
        }
    };

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send('Welcome to protected route')
    }

    @get('/api-docs')
    @use(swaggerUi.setup(swaggerDocument))
    getDocs(req: Request, res: Response) {
    }
}