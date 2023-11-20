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
  cpu = 256
  memory = 512
  execution_role_arn = aws_iam_role.ecs_execution_role.arn

  container_definitions = jsonencode([
    {
      name  = "container-product-api"
      image = "381150242567.dkr.ecr.us-east-1.amazonaws.com/product-api:${var.ecr_image_tag}"
      portMappings = [
        {
          containerPort = 80,
          hostPort      = 80,
        },
      ],
      log_configuration = {
        log_driver = "awslogs"
        options = {
          "awslogs-group" = "/ecs/product-api-logs"
          "awslogs-region" = "us-east-1"
          "awslogs-stream-prefix" = "ecs"
        }
      },      
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

  deployment_circuit_breaker {
    enable   = true
    rollback = false
  }
}
