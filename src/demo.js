const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const client = new SecretsManagerClient({
  region: "us-east-2",
});



module.exports.handler = async (event) => {
  console.log("event --> ", event);
  let response;
  const secret_name = "zaroorikey";
  const version_stage = "AWSCURRENT";

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: version_stage
      })
    );

    console.log('secret ',response.SecretString)
  } catch (error) {
    throw error;
  }

  // const secret = response.SecretString;

    return {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello from demo",
      data: response.SecretString
    }),
  };

}
