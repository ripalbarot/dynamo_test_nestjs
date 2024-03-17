import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';
import { IDatabaseRepository } from './IDatabaseRepository';
import * as console from 'console';

@Injectable()
export class DatabaseRepository<T> implements IDatabaseRepository<T> {
  readonly docClient: DynamoDBDocumentClient;
  readonly tableName: string;
  constructor() {
    const client = new DynamoDBClient({});
    this.docClient = DynamoDBDocumentClient.from(client);
    this.tableName = 'book_catalogue';
  }

  async save(item: T): Promise<T> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: item,
    });
    try {
      await this.docClient.send(command);
      return item;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findById(id: string): Promise<T> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        pk: id,
      },
    });
    try {
      const response = await this.docClient.send(command);
      return response.Item as T;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
