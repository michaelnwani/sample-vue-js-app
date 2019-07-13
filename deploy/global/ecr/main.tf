terraform {
  backend "s3" {}
}

provider "aws" {
  region  = "${var.region}"
  profile = "redacted-${var.region}"
}

locals {
  base_name = "${var.app_name}"
}

resource "aws_ecr_repository" "ecr_repository" {
  name = "${local.base_name}"
}
