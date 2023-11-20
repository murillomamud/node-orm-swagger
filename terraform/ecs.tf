locals {
  public_subnets_ids = ["subnet-d052bab7", "subnet-390e1116"]
}

resource "aws_ecs_cluster" "my_cluster" {
  name = "cluster-product-api"
}

resource "aws_ecs_task_definition" "my_task_definition" {
  family                   = "task-product-api"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]

  container_definitions = jsonencode([
    {
      name  = "container-product-api"
      image = "381150242567.dkr.ecr.us-east-1.amazonaws.com/product-api:f918f21fe50de8b50a89dbe47d8e611ca9ec7e05"
      portMappings = [
        {
          containerPort = 80,
          hostPort      = 80,
        },
      ],
    },
  ])
}

resource "aws_ecs_service" "my_service" {
  name            = "service-product-api"
  cluster         = aws_ecs_cluster.my_cluster.id
  task_definition = aws_ecs_task_definition.my_task_definition.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets = local.public_subnets_ids
    security_groups = [aws_security_group.allow_http.id]
  }
}
