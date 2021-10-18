import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PageRender from "./customRouter/PageRender";
import Login from "./pages/login";
import  Alert  from "./components/alert/Alert";
import Home from "./pages/home";
import { refreshToken } from "./redux/actions/authAction";
import Header from "./components/header/Header";
import Register from "./pages/register";
import PrivateRouter from "./customRouter/PrivateRouter";
import StatusModal from "./components/StatusModal";
import { getPosts } from "./redux/actions/postAction";


function App() {
  const dispatch = useDispatch();
  const { auth, status } = useSelector(state => state);


  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch])

  useEffect(() => {
    if(auth.token) dispatch(getPosts(auth.token))
  }, [dispatch, auth.token])
  
  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          { auth.token && <Header /> }
          { status && <StatusModal /> }
          <Route exact path="/" component={ auth.token ? Home : Login} />
          <Route exact path="/register" component={ Register } />


          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
