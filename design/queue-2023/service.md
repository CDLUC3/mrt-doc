# Underlying Queue Service

- [Design](README.md)

## Why [Zookeeper](https://zookeeper.apache.org/)?

Explain our rationale.

## Queueing Alternatives

- [Amazon SQS](https://aws.amazon.com/pm/sqs/) - no priority, messages have a shorter duration than we need
- [Amazon MQ](https://aws.amazon.com/amazon-mq/) (deploys to managed EC2 instances)
  - [Apache MQ](https://activemq.apache.org/) (uses Zookeeper!)
  - [Rabbit MQ](https://www.rabbitmq.com/) 
- [Apache Kafka](https://kafka.apache.org/intro) (more like Amazon SNS) 

## Distributed Locking
- [Redis](https://redis.io/)
- [DynamoDB](https://aws.amazon.com/dynamodb)

## State Transition (for Queue Items)
- [Amazon Eventbridge](https://aws.amazon.com/eventbridge/)
- [Amazon Step Functions](https://docs.aws.amazon.com/step-functions/index.html)
