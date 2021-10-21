# Terraform Block
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "-> 3.00"
    }
  }
}

# Provider Block
provider "aws" {
  region  = "us-east-2"
  profile = "default"
}
