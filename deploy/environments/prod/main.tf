provider "aws" {
  region  = "${var.aws_region}"
}

terraform {
  backend "s3" {}
}

data "aws_acm_certificate" "certificate_arn" {
  domain   = "*.redacted.io"
  statuses = ["ISSUED"]
}

module "web" {
  source          = "../../global/web"
  app_name        = "${var.app_name}"
  app_image       = "${var.app_image}"
  app_port        = "${var.app_port}"
  certificate_arn = "${data.aws_acm_certificate.certificate_arn.arn}"
}
