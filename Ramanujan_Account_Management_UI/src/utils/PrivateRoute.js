import {Redirect,Route} from 'react-router-dom'

export default function PrivateRoute({component: Component, ...rest}) {
    const token =localStorage.getItem('token');
    return (
        <Route
            {...rest}
            render={props => {
                return token ? <Component {...props} /> : <Redirect to='/signin'/>
            }}
        >
        </Route>
    )
}