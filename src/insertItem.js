"use strict"

import { v4 } from "uuid";
import { DynamoDB } from "aws-sdk";

const insertItem = async (event) => {

    const {item} = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = v4()

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const newItem = {
        id,
        item,
        createdAt,
        itemStatus: false
    };

    await dynamoDB.put(
        {
            TableName: "NewTable",
            Item: newItem
        }
    );

    return {
        statusCode: 200,
        body: JSON.stringify(newItem)
    };
}

export const handler = insertItem;