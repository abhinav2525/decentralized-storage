// import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const ipfsClient = require("ipfs-http-client");

export const ipfs = ipfsClient({
  protocol: "https",
  port: 5001,
  host: "ipfs.infura.io",
});
//
// export const ipfs = ipfsClient({
//   protocol: "http",
//   port: 5001,
//   host: "ec2-15-207-162-68.ap-south-1.compute.amazonaws.com",
// });

function App() {
  return (
    <div className="">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
