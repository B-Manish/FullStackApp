import React, { useState } from "react";
import UserPool from "../../UserPool";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const onSubmit = (event) => {
    event.preventDefault();
    UserPool.signUp(
      email,
      password,
      [{ Name: "phone_number", Value: phone }],
      null,
      (err, data) => {
        if (err) {
          console.error(err);
        }
        console.log(data);
      }
    );
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>

        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>

        <label htmlFor="phone">Phone</label>
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        ></input>

        <button type="submit">SignUp</button>
      </form>
    </div>
  );
};
export default SignUp;
