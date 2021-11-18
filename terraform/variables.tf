variable "aws_region" {
  description = "Region in which AWS resources will be created"
  type        = string
  default     = "us-east-2"
}

variable "solution_stack_name" {
  description = "The language/application that the Linux AMI is running"
  type        = string
  default     = "64bit Amazon Linux 2018.03 v2.17.1 running Docker 20.10.7-ce"
}

variable "app_name" {
  description = "The name of the application"
  type        = string
  default     = "webrtc-app"
}
