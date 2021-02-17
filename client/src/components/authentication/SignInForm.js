import React, { useState } from "react";
import config from "../../config";
import FormError from "../layout/FormError";
import { Layout } from 'antd';
const { Header } = Layout;

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    setErrors(newErrors);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    validateInput(userPayload);
    if (Object.keys(errors).length === 0) {
      fetch("/api/v1/user-sessions", {
        method: "post",
        body: JSON.stringify(userPayload),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then(() => {
            setShouldRedirect(true);
          });
        } else {
          const errorMessage = `${resp.status} (${resp.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      });
    }
  };
  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <Layout>
      <Header></Header>
      <div className="grid-container reg-form-background" onSubmit={onSubmit}>
        <form className="grid-x grid-padding-x reg-form-position">
          <div className="medium-3 cell">
            <label className="reg-form-text">
              Email
              <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
              <FormError error={errors.email} />
            </label>
          </div>
          <div className="medium-12 cell"></div>
          <div className="medium-3 cell">
            <label className="reg-form-text">
              Password
              <input
                type="password"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
              />
              <FormError error={errors.password} />
            </label>
          </div>
          <div className="medium-12 cell"></div>
          <div>
            <input type="submit" className="rounded-button button salmon" value="Sign In" />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SignInForm;
