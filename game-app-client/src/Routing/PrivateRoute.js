import { Redirect, Route } from "react-router";
import { useAuth } from "../Authentication/authProvider";

export default function PrivateRoute({children, ...rest}) {
    const auth = useAuth();
    return(<Route 
        {...rest} 
        render={({location}) => auth.loggedInUser ? (
            children
            ): (
                <Redirect 
                    to={{
                        pathname: "/signin",
                        state: {from: location}
                    }}
                />
            )
        }
    />);
}