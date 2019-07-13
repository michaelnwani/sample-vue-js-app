resource "aws_ecs_task_definition" "app" {
  family                   = "${var.app_name}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "${var.app_cpu}"
  memory                   = "${var.app_memory}"
  execution_role_arn       = "${var.task_execution_role}"
  task_role_arn            = "${var.task_role_name}"

  container_definitions = <<DEFINITION
[
  {
    "cpu": ${var.app_cpu},
    "image": "${var.app_image}",
    "memory": ${var.app_memory},
    "name": "${var.app_name}",
    "networkMode": "awsvpc",
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "${var.log_group_name}",
        "awslogs-region": "${var.aws_region}",
        "awslogs-stream-prefix": "${var.app_name}"
      }
    },
    "portMappings": [
      {
        "containerPort": ${var.app_port},
        "hostPort": ${var.app_port}
      }
    ],
    "environment": [
      {
        "name": "PORT",
        "value": "${var.app_port}"
      }
    ]
  }
]
DEFINITION
}

resource "aws_alb_listener" "alb_listener" {
  load_balancer_arn = "${var.lb_arn}"
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "${var.certificate_arn}"

  default_action {
    target_group_arn = "${var.ecs_lb_target_group}"
    type             = "forward"
  }
}


resource "aws_ecs_service" "main" {
  name            = "${var.app_name}-service"
  cluster         = "${var.ecs_cluster_id}"
  task_definition = "${aws_ecs_task_definition.app.arn}"
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    security_groups   = ["${var.ecs_task_sg_ids}"]
    subnets           = ["${var.ecs_subnets}"]
    assign_public_ip  = true
  }

  load_balancer {
    target_group_arn = "${var.ecs_lb_target_group}"
    container_name   = "${var.app_name}"
    container_port   = "${var.app_port}"
  }

  depends_on = [
    "aws_alb_listener.alb_listener",
  ]
}
