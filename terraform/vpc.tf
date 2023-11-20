resource "aws_vpc_endpoint" "ecr_api" {
  vpc_id            = data.aws_vpc.my_vpc.id
  service_name      = "com.amazonaws.us-east-1.ecr.api"
  vpc_endpoint_type = "Interface"

  security_group_ids = [aws_security_group.allow_http.id]

  subnet_ids = [data.aws_subnet.my_subnet.id]

  private_dns_enabled = true
}

resource "aws_vpc_endpoint" "ecr_dkr" {
  vpc_id            = data.aws_vpc.my_vpc.id
  service_name      = "com.amazonaws.us-east-1.ecr.dkr"
  vpc_endpoint_type = "Interface"

  security_group_ids = [aws_security_group.allow_http.id]

  subnet_ids = [data.aws_subnet.my_subnet.id]

  private_dns_enabled = true
}

resource "aws_vpc_endpoint" "cloudwatch_logs" {
  vpc_id            = data.aws_vpc.my_vpc.id
  service_name      = "com.amazonaws.us-east-1.logs"
  vpc_endpoint_type = "Interface"

  security_group_ids = [aws_security_group.allow_http.id]

  subnet_ids = [data.aws_subnet.my_subnet.id]

  private_dns_enabled = true
}