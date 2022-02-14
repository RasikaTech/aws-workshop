import { useAuth } from '../Authentication/authProvider';
import {  Link } from "react-router-dom";

export default function Profile() {
    const auth = useAuth();

    return (auth.loggedInUser? (
        <div>
            <span>{auth.loggedInUser.email}</span>
            <button onClick={() => auth.signOut()}>Sign out</button>
        </div>
    ): (
    <Link to="/signin">Sign in</Link>
    ));
}

