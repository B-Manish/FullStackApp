import { CognitoUserPool } from "amazon-cognito-identity-js";

// const poolData = {
//   UserPoolId: "us-east-1_ipLhWAQTq",
//   ClientId: "3mdqd1h5d7lttj8fkoch77pqbu",
// };

const poolData = {
  UserPoolId: "us-east-1_EjCt290pk",
  ClientId: "60q0fdv415h7pbvnnqt5ejrth4",
};

export default new CognitoUserPool(poolData);
