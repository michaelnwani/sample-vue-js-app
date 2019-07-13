resource "aws_cloudwatch_log_group" "log_group" {
  name = "${var.app_name}"

  tags {
    Application = "${var.app_name}"
  }
}
