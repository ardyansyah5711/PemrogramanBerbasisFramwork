import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from "react-router-dom";

export default function NestingAuthExample() {
  return(
    <Router>
      <nav class="navbar navbar-expand-lg navbar-info bg-secondary">
        <div class="container">
          <a class="navbar=brand" href="#">Shoes Store Malang</a>
          <button class="navbar-toggler " type="button" data-toggle="collapse" 
          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
          aria-expanded="false" aria-label="Toggle navigation">
            
            <span class="navbar-toggler-icon"></span>
          </button>  
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link">
                  <Link to="/home">HOME</Link>
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link">
                  <Link to="/prodact">BRANDS</Link>
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item ml-2 mt-2">
              <AuthButton />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr />

      <Switch>
        <Route  path="/home">
          <Home />
        </Route>
        <Route  path="/login">
          <LoginPage />
        </Route>
        <Route  path="/prodact">
          <Prodact />
        </Route>
        <PrivateRoute path="/private">
          <ProtectedPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

const fakeAuth={
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: {pathname: "/"}};

  return fakeAuth.isAuthenticated ? (
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push(from));
        }}
      >
        Sign out
      </button>
  ) : (
    <p>You are not logged in.</p>
  );
}

function PrivateRoute({children, ...rest}){
  return (
    <Route 
    {...rest}
    render={({ location }) =>
    fakeAuth.isAuthenticated ? (
      children
    ) : (
      <Redirect
      to={{
        pathname: "/login",
        state: {from:location}
      }}
      />
    )
    }
    />
  );
}

function ProtectedPage() {
  return <h3>Private</h3>;
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: {pathname: "/prodact"}};
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <center>
      <p>You must log in to view the page at {from.pathname}</p>
      <button type="button" class="btn btn-success" onClick={login}>Log in</button>
      </center>
    </div>
  );
}

function Home(){
  const isLoggedIn = fakeAuth.isAuthenticated;
  return(
    <div>
      <center>
          <div class="container">
          <img src="https://www.mainbasket.com/thumbs/extra-large/uploads/post/2017/09/97decda7b690b95269b66afe46a254b5.jpg"
          alt="content"/>
          <h1> HI Guys!</h1>
          <br></br><p>Selamat Datang dan Terimakasih Sudah berkunjung !!.</p>
            <br></br><p>Produck kami sudah terjamin 100% ori.</p>
        </div>
      </center>
    </div>
  );
}

function Prodact(){
  let { path, url } = useRouteMatch();
  const isLoggedIn = fakeAuth.isAuthenticated;
  if (isLoggedIn == true) {
    return(
      <div>
        <center>
          <h4>All Product</h4>
          <div class="card card-group">
            <div class="card">
            <Link to={`${url}/sepatu converse high motif metalica sepatu kasual sneakers terbaru Rp1.200.000`}>
              <img src="//id-test-11.slatic.net/p/6475723b4e5adb9a5d69060aeb62a89f.jpg_720x720q80.jpg_.webp"
              alt="sepatu converse high motif metalica sepatu kasual sneakers" /><br></br>
              <h5>Converse</h5>
              </Link>
            </div>

            <div class="card">
            <Link to={`${url}/SEPATU VANS OFF THE WALL OFF WHIFE Rp1.500.000`}>
              <img src="https://s4.bukalapak.com/img/4963948073/large/SEPATU_VANS.jpg"
              alt="SEPATU VANS OFF THE WALL OFF WHIFE" /><br></br>
              <h5>VANS</h5>
              </Link>
            </div>

            <div class="card">
            <Link to={`${url}/Sepatu adidas alphabounce RP500.000`}>
              <img src="//id-test-11.slatic.net/p/70f71fafacf9dfcc4f60d25e3be3c994.jpg_720x720q80.jpg_.webp"  
              alt="Sepatu adidas alphabounce"/>
              <br></br>
              <h5>Adidas</h5>
              </Link>
              <br></br>
              <br/>
            </div>
          </div>
          <br></br>

          <div className="bgLink">
          <Switch>
            <Route exact path="{path}">
              <h3>Please Choose Your Goods!</h3>
            </Route>

            <Route path={`${path}/:prodactId`}>
                <Prodacts />
            </Route>
          </Switch>
          </div>
        </center>
      </div>
    );
  }
  return (
    <div>
      <center>
        <h2>Shoes Store Malang</h2>
      <Link to="/login">
      <button className="btn btn-warning">Go to login page</button>
      </Link>
      </center>
    </div>
  );
}

function Prodacts(){
  let {prodactId} = useParams();

  return (
    <div>
      <h3>{prodactId}</h3>
    </div>
  );
}

//<img id="firstHeadlineImage" class="img img-fluid d-block mx-auto" src="https://www.mainbasket.com/thumbs/extra-large/uploads/post/2017/09/97decda7b690b95269b66afe46a254b5.jpg">