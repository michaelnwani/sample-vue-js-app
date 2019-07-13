
data "aws_route53_zone" "zone" {
  name  = "redacted.io"
  private_zone = false
}

data "aws_acm_certificate" "certificate_arn" {
  domain   = "*.redacted.io"
  statuses = ["ISSUED"]
}

resource "aws_route53_record" "app_alias" {
  zone_id     = "${data.aws_route53_zone.zone.zone_id}"
  name        = "redacted.io"
  type        = "A"

  alias {
    name                    = "${var.lb_dns_name}"
    zone_id                 = "${var.lb_zone_id}"
    evaluate_target_health  = false
  }
}
