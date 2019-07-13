locals {
  base_name   = "${var.app_name}"
  vpc_id      = "vpc-714b4r02"
}

data "aws_subnet_ids" "vpc_subnet_ids" {
  vpc_id = "${local.vpc_id}"
}


resource "aws_security_group" "alb_sg" {
  name        = "${var.app_name}-alb"
  description = "Allow HTTP from Anywhere into ALB"
  vpc_id      = "${local.vpc_id}"

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # this means allow ALL ports
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags {
    Name        = "${var.app_name}-alb"
  }
}

resource "aws_security_group" "task_sg" {
  name        = "${var.app_name}-task"
  description = "Allow HTTP from ALB to tasks"
  vpc_id      = "${local.vpc_id}"

  ingress {
    from_port       = 0
    to_port         = 65535
    protocol        = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # this means allow ALL ports
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags {
    Name        = "${var.app_name}-task"
  }
}

resource "aws_ecs_cluster" "cluster" {
  name = "${local.base_name}"

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_alb" "alb" {
  name            = "${local.base_name}"
  subnets         = ["${data.aws_subnet_ids.vpc_subnet_ids.ids}"] # optional
  security_groups = ["${aws_security_group.alb_sg.id}"]
  internal        = "${var.alb_is_internal}"

  tags {
    Name        = "${local.base_name}"
  }
}

resource "aws_alb_listener" "alb_listener" {
  load_balancer_arn = "${aws_alb.alb.arn}"
  port              = "80"
  protocol          = "HTTP"
  depends_on        = ["aws_alb_target_group.alb_target_group"]

  default_action {
    target_group_arn = "${aws_alb_target_group.alb_target_group.arn}"
    type             = "forward"
  }
}

resource "random_id" "target_group_suffix" {
  byte_length = 2
}

resource "aws_iam_role" "task_role" {
  name = "${var.app_name}-task"

  assume_role_policy = <<END
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
END
}

resource "aws_alb_target_group" "alb_target_group" {
  name        = "${random_id.target_group_suffix.hex}"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = "${local.vpc_id}"
  target_type = "ip"

  tags {
    Name        = "${random_id.target_group_suffix.hex}"
  }

  health_check {
    timeout             = "${var.alb_health_check_timeout}"
    interval            = "${var.alb_health_check_interval}"
    path                = "${var.alb_health_check_path}"
    healthy_threshold   = "${var.alb_health_check_healthy_threshold}"
    unhealthy_threshold = "${var.alb_health_check_unhealthy_threshold}"
    matcher             = "${var.alb_health_check_matcher}"
    protocol            = "${var.alb_health_check_protocol}"
  }
}
