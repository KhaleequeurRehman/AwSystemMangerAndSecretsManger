// Import the required modules from AWS SDK v3
const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");

const client = new SSMClient({ 
  region: 'us-east-2',
});

const getParam = async (paramName) => {
  const command = new GetParameterCommand({
    Name: paramName,
    WithDecryption: true, // Set to true if the parameter is a SecureString
  });

  try {
    const response = await client.send(command);
    return response.Parameter.Value;
  } catch (error) {
    throw error;
  }
};

module.exports.handler = async (event, context) => {
  console.log('event', event);

  const paramName = 'demo_db_password';
  const paramValue = await getParam(paramName);
  
  console.log('param', paramValue);

  return {
    statusCode: 200,
    message: 'Parameter retrieved successfully',
    body: JSON.stringify(paramValue),
  };
};

