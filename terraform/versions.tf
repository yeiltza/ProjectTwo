# Terraform Block
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.00"
    }
  }
  backend "s3" {
    bucket = "tf-state-jbdiop"
    key    = "core/terraform.tfstate"
    region = "us-east-2"
  }
}

# Provider Block
provider "aws" {
  region  = "us-east-2"
  profile = "default"
}
