//código do lambda na integra

const AWS = require("aws-sdk");  

//Chamando dynamodb: 
const dynamo = new AWS.DynamoDB.DocumentClient(); 

exports.handler = async(event) => { 

    // TODO implement 

    let body; 

    let statusCode = 200; 

    const headers = { 

        // body: JSON.stringify('Hello from Lambda!'), 

    }; 

let requestJSON;  

//(captura informações do token do request do lambda ao dynamo para tratamento em formato JSON) 

try {   

    switch (event.routeKey) {    

//(routeKey vai tratar os métodos HTTP)  

                case "POST /items":  

//(no caso, POST no dynamodb é feito com o método .put, de modo que a função LAMBDA vai apontar para estes métodos e fazer o put no DB) 

        requestJSON = JSON.parse(event.body); 

        await dynamo 

            .put({ 

                TableName: "Products",  

//em TableName colocar o nome da tabela onde a função irá atuar no DynamoDB 

                Item: { 

                    id: requestJSON.id, 

//o id é exatamente o id da chave primária no dynamodb, chamada como parâmetro da tabela dentro do dynamodb 

                    price: requestJSON.price, 

                    name: requestJSON.name 

                } 

            }) 

            .promise(); 

        body = "Put item ${requestJSON.id}"; 

        break;   

 

       case "DELETE /items/{id}": 

        console.log(event.pathParameters.id) 

//O event.pathParameters.id é a KEY que vai estar no parâmetro da URL ao usar o postman como front-end da API 

        await dynamo 

            .delete({ 

                TableName: "Products",  

                Key: { 

                    id: event.pathParameters.id 

                } 

            }) 

            .promise(); 

        body = "Delete item ${event.pathParameters.id}"; 

        break;   

        case "GET/items/{id}":    

//(este case GET busca os itens) 

        body = await dynamo 

            .get({ 

                TableName: "Products",  

                Key: { 

                    id: event.pathParameters.id 

                } 

            }) 

            .promise(); 

      break;   

        case "GET /items":    

//(este case GET faz a listagem com o scan) 

        body = await dynamo.scan({ TableName: "Products"}).promise(); 

        break; 

        case "PUT /items/{id}":  

//(este PUT é para .update) 

            requestJSON = JSON.parse(event.body); 

            await dynamo 

            .update({ 

                TableName: "Products", 

                Key: { 

                    id: event.pathParameters.id 

                }, 

                UpdateExpression: 'set price = :r', 

//updateExpression é palavra reservada para dynamodb, e o :r no json é parâmetro para entrar valor de update 

                ExpressionAttributeValues: { 

                    ':r': requestJSON.price, 

                }, 

            }) 

            .promise(); 

            body = 'Put item ${event.pathParameters.id}'; 

            break; 

            //(default para rota não encontrada) 

            default: 

            throw new Error('Unsupported route: "${event.routeKey}"'); 

    } 

}catch (err) { 

statusCode = 400; 

body = err.message; 

} finally { 

body = JSON.stringify(body); 

} 

return { 

statusCode, 

body, 

headers 

}; 

}; 