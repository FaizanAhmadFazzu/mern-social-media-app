import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./styles/global.css";
import PageRender from "./PageRender";
import Login from "./pages/login";
import  Alert  from "./components/alert/Alert";
import Home from "./pages/home";
import { refreshToken } from "./redux/actions/authAction";


function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);


  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch])
  
  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Route exact path="/" component={ auth.token ? Home : Login} />
          <Route path="/:page" component={PageRender} />
          <Route path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
