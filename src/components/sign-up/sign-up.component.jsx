import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async e => {
        e.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("Password don't match");
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            await createUserProfileDocument(user, { displayName });

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (e) {
            console.error(e);
        }
    };

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className="sign-up">
                <h2>I do not have an account.</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        handleChange={this.handleChange}
                        type="text"
                        label="Name"
                        name="displayName"
                        value={displayName}
                        required
                    />
                    <FormInput
                        handleChange={this.handleChange}
                        type="email"
                        label="Email"
                        name="email"
                        value={email}
                        required
                    />
                    <FormInput
                        handleChange={this.handleChange}
                        type="password"
                        label="Password"
                        name="password"
                        value={password}
                        required
                    />
                    <FormInput
                        handleChange={this.handleChange}
                        type="password"
                        label="Confirm password"
                        name="confirmPassword"
                        value={confirmPassword}
                        required
                    />
                    <div className="buttons">
                        <CustomButton type="submit">SIGN UP</CustomButton>
                    </div>
                    <Link className="navigate" to="/signin">
                        Already have an account?
                    </Link>
                </form>
            </div>
        );
    }
}

export default SignUp;
