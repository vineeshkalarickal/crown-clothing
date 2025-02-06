import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component.jsx";
import Button from "../button/button.component.jsx";
import "./sign-in-form.styles.scss";
import { UserContext } from "../../contexts/user.context.jsx";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  sinInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    //setCurrentUser(user);
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await sinInAuthUserWithEmailAndPassword(email, password);
      //setCurrentUser(user);

      resetFormFields();
      // Redirect to login page here if needed
    } catch (error) {
      console.log(error.message);

      switch (error.code) {
        case "auth/user-not-found":
          alert("Invalid email or User not found");
          break;
        case "auth/wrong-password":
          alert("Invalid password. Please try again.");
          break;
        default:
          console.log(error.message);
          break;
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h1>Already have an account?</h1>
      <h4>Sign In with your email and password</h4>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          required
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <br />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>

          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
