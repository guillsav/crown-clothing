import React from 'react';
import { Switch, Route } from 'react-router-dom';

// JSX Components
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// Third-party Libraries
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

// Style
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: null
        };
    }

    unsubscribeFromAuth = null;

    // Listening to auth changes on Firebase backend
    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapshot => {
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    });
                });
            }
            // If user sign out set the currentUser state to null
            this.setState({ currentUser: userAuth });
        });
    }

    // Stop subsciption to Firebase auth
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/shop" component={ShopPage} />
                    <Route
                        exact
                        path="/signin"
                        component={SignInAndSignUpPage}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
