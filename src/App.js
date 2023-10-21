import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropertyCreateForm from "./pages/properties/PropertyCreateForm";
import PropertiesPage from "./pages/properties/PropertiesPage";
import PropertyPage from "./pages/properties/PropertyPage";
// import SideBar from "./components/SideBar";

import { useCurrentUser } from "./contexts/CurrentUserContext";

// export const CurrentUserContext = createContext();
// export const SetCurrentUserContext = createContext();

function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  // const [currentUser, setCurrentUser] = useState(null);

  // const handleMount = async () => {
  //   try {
  //     const { data } = await axios.get("dj-rest-auth/user/");
  //     setCurrentUser(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   handleMount();
  // }, []);

  return (
    // <CurrentUserContext.Provider value={currentUser}>
    //   <SetCurrentUserContext.Provider value={setCurrentUser}>
    <div className={styles.App}>
    <NavBar />
    <Container className={styles.Main}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <PropertiesPage message="No results found. Adjust the search keyword." />
          )}
        />
        {/* <Route
          exact
          path="/feed"
          render={() => (
            <PropertiesPage
              message="No results found. Adjust the search keyword or follow a user."
              filter={`owner__followed__owner__profile=${profile_id}&`}
            />
          )}
        /> */}
        <Route
          exact
          path="/prospectivebuyers"
          render={() => (
            <PropertiesPage
              message="No results found. Adjust the search keyword or like a post."
              filter={`prospectivebuyers__owner__profile=${profile_id}&ordering=-prospectivebuyers__created_at&`}
            />
          )}
        />
        <Route exact path="/signin" render={() => <SignInForm />} />
        <Route exact path="/signup" render={() => <SignUpForm />} />
        <Route exact path="/property/create" render={() => <PropertyCreateForm />} />
        <Route exact path="/property/:id" render={() => <PropertyPage />} />
        <Route exact path="/properties" render={() => <PropertiesPage />} />

        {/* <Route exact path="/posts/create" render={() => <PostCreateForm />} /> */}
        <Route render={() => <p>Page not found!</p>} />
      </Switch>
    </Container>
  </div>
    //   </SetCurrentUserContext.Provider>
    // </CurrentUserContext.Provider>
  );
}

export default App;