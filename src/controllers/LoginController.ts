import { Request, Response, NextFunction } from 'express'
import { get, controller, bodyValidator, post } from './decorators'

@controller('/auth')
class LoginController {

    @get('/login')
    getLogin(req: Request, res: Response): void {
        res.send(`
        <form method="POST">
            <div>
                <label>Email</label>
                <input name="email">
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password">
            </div>
            <button>Submit</button>
        </form>
    `)
    }

    @post('/login')
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response) {
        const { email, password } = req.body;
        console.log(email, password)
        if (email && password && email === 'email@email.com' && password === 'boss') {
            req.session = { loggedIn: true };
            res.redirect('/');
        } else {
            res.send('Invalid email or password');
        }
    }

    @get('/logout')
    getlogout(req: Request, res: Response) {
        req.session = undefined;
        res.redirect('/');
    };
}