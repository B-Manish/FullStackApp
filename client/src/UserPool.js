import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_ipLhWAQTq",
  ClientId: "3mdqd1h5d7lttj8fkoch77pqbu",
};

export default new CognitoUserPool(poolData);
