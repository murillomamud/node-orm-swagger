resource "aws_iam_policy" "ecs_execution_policy" {
  name        = "product-api-execution-policy"
  description = "Policy for ECS Fargate execution role"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Action    = [
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:BatchCheckLayerAvailability",
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource  = "*" // Você pode restringir os recursos específicos conforme necessário
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

resource "aws_iam_role_policy_attachment" "ecs_execution_policy_attachment" {
  role       = aws_iam_role.ecs_execution_role.name
  policy_arn = aws_iam_policy.ecs_execution_policy.arn
}
