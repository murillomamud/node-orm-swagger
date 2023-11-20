resource "aws_security_group" "allow_http" {
  name        = "allow_http_sg"
  description = "Security Group to allow HTTP access"

  vpc_id = data.aws_vpc.my_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
