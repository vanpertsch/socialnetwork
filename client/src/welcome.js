
import { BrowserRouter, Route } from 'react-router-dom';
import Registration from './components/welcome/registration';
import Login from './components/welcome/login';
import ResetPassword from './components/welcome/reset-password';

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>
            <img className='logo-lg' src="/logo.png" alt="Logo"></img>
            <BrowserRouter>
                <div>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/password/reset">
                        <ResetPassword />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}
