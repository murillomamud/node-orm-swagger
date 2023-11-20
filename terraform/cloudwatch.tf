resource "aws_cloudwatch_log_group" "product_api_logs" {
  name = "/ecs/product-api-logs"
  retention_in_days = 7 
}
