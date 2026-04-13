const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const { email, password } = body;

    const params = {
        TableName: "users",
        Key: { email }
    };

    try {
        const user = await dynamo.get(params).promise();

        if (!user.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "User not found" })
            };
        }

        if (user.Item.password === password) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Login successful" })
            };
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "Invalid credentials" })
            };
        }

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};
