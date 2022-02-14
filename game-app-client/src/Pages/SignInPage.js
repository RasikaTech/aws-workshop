import { useHistory, useLocation } from "react-router";
import { useAuth } from "../Authentication/authProvider";

export default function SignInPage() {
    const auth = useAuth();
    const location = useLocation();
    const history = useHistory();

    const {from} = location.state || {from: {pathname: "/"}};

    let login = () => {
        auth.signIn('test@abc.com', 'test pwd');
        history.replace(from);
    };

    return (
        <button onClick={login}>Log in</button>
    );
}