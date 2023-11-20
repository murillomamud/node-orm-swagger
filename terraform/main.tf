provider "aws" {
  region = "us-east-1"
}


###########
# Backend configuration
###########
terraform {
  backend "s3" {
    key            = "product-api/backend/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
  }
}

data "aws_region" "current" {}

data "aws_caller_identity" "current" {}

data "aws_vpc" "my_vpc" {
  id = "vpc-633f1e18"
}

data "aws_subnet" "my_subnet" {
  id = "subnet-fbae2bb1"
}