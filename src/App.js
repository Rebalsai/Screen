import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Auth from "./auth";
import AppLayout from "./layout";
import { store } from "./store";
import { loadUser, OidcProvider } from 'redux-oidc';
import { userManager } from "./auth/index";
function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    localStorage.setItem("__url", window.location.pathname);
    loadUser(store, userManager).then(user => {
      setLoggedIn(true);
    })
  }, [])
  return (
    <Provider store={store}>
      <OidcProvider userManager={userManager} store={store}>
      <BrowserRouter>
        {isLoggedIn ? <AppLayout /> : <div className="loader">Loading....</div>}
      </BrowserRouter>
      </OidcProvider>
    </Provider>
  );
}

export default App;
