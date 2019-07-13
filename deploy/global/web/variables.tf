variable "certificate_arn" {
  description = "Certificate ARN"
}

variable "app_name" {}

variable "aws_region" {
  default     = "us-east-1"
}

variable "app_cpu" {
  description = "Fargate task definition CPU"
  default     = 256
}

variable "app_memory" {
  description = "Fargate task definition Memory"
  default     = 2048
}

variable "app_image" {}

variable "app_port" {}
