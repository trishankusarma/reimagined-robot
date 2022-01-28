import { Redirect, Route, useHistory } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
export default function PrivateRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem("token");
  const history = useHistory();
  const auth = useSelector(state => state.auth)
  const user = JSON.parse(localStorage.getItem("user"));
  const data = user
    ? user?.access.map((item) => {
        return item.to;
      })
    : null;

  const key = data
    ? data?.includes(history.location.pathname.split("/")[1])
    : false;
//    console.log(key,history.location.pathname.split("/")[1] == "","conditions") 
  if (history.location.pathname.split("/")[1] == ""||auth?.user?.isSuperAdmin) {
    return (
      <Route
        {...rest}
        render={(props) => {
          return token ? <Component {...props} /> : <Redirect to="/signin" />;
        }}
      ></Route>
    );
  } else {
    return (
      <Route
        {...rest}
        render={(props) => {
          return token && key ? (
            <Component {...props} />
          ) : (
            <Redirect to="/signin" />
          );
        }}
      ></Route>
    );
  }
}
