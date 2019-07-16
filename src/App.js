import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// JSX Components
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInPage from './pages/sign-in/sign-in.component';
import SignUpPage from './pages/sign-up/sign-up.component';

// Third-party Libraries
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/actions';

// Style
import './App.css';

class App extends React.Component {
    unsubscribeFromAuth = null;

    // Listening to auth changes on Firebase backend
    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    });
                });
            }
            // If user sign out set the currentUser state to null
            setCurrentUser(userAuth);
        });
    }

    // Stop subsciption to Firebase auth
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/shop" component={ShopPage} />
                    <Route exact path="/signin" component={SignInPage} />
                    <Route exact path="/signup" component={SignUpPage} />
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
    null,
    mapDispatchToProps
)(App);
