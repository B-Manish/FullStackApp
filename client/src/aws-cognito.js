import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_r70o04deM",
  ClientId: "17shnbmh639c0vhp8j591437j7",
};

// export default new CognitoUserPool(poolData);
export const userPool = new CognitoUserPool(poolData);
