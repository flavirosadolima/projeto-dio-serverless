"use strict";

import { v4 } from "uuid";
import { DynamoDB } from "aws-sdk";

const insertItem = async (event) => {


  const {item} = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = v4()

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const newItem = {
    id,
    item,
    createdAt,
    itemStatus: false
  }

  await dynamodb.put
  (
    {
        TableName: "NewTable",
        Item: newItem
    }
  ).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(newItem),
  };
};


export const handler = insertItem;
