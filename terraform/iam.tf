resource "aws_iam_policy" "ecs_execution_policy" {
  name        = "product-api-execution-policy"
  description = "Policy for ECS Fargate execution role"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Action    = [
          "ecr:*",
          "logs:*",
          "ssm:*",
        ],
        Resource  = "*"
      }
    ],
  })
}

resource "aws_iam_role" "ecs_execution_role" {
  name = "product-api-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = {
          Service = "ecs-tasks.amazonaws.com",
        },
        Action    = "sts:AssumeRole",
      },
    ],
  })
}

resource "aws_iam_role" "ecs_task_role" {
    name = "product-api-task-role"
    
    assume_role_policy = jsonencode({
        Version = "2012-10-17",
        Statement = [
        {
            Effect    = "Allow",
            Principal = {
            Service = "ecs-tasks.amazonaws.com",
            },
            Action    = "sts:AssumeRole",
        },
        ],
    })
}

resource "aws_iam_role_policy_attachment" "ecs_execution_policy_attachment" {
  role       = aws_iam_role.ecs_execution_role.name
  policy_arn = aws_iam_policy.ecs_execution_policy.arn
}

resource "aws_iam_role_policy_attachment" "ecs_task_policy_attachment" {
    role       = aws_iam_role.ecs_task_role.name
    policy_arn = aws_iam_policy.ecs_execution_policy.arn
}
