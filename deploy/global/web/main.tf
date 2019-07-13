terraform {
  backend "s3" {}
}

provider "aws" {
  region  = "${var.aws_region}"
}

module "fargate-application" {
  source              = "../../modules/fargate"
  app_name            = "${var.app_name}"
}

module "service" {
  source              = "../../modules/service"
  app_name            = "${var.app_name}"
  aws_region          = "${var.aws_region}"
  app_cpu             = "${var.app_cpu}"
  app_memory          = "${var.app_memory}"
  app_image           = "${var.app_image}"
  app_port            = "${var.app_port}"
  certificate_arn     = "${var.certificate_arn}"
  ecs_lb_target_group = "${module.fargate-application.alb-target-group}"
  alb_is_internal     = false
  task_execution_role = "${module.fargate-application.task_execution_role}"
  task_role_name      = "${module.fargate-application.task_role_name}"
  ecs_cluster_id      = "${module.fargate-application.cluster_id}"
  lb_arn              = "${module.fargate-application.alb-id}"
  ecs_task_sg_ids     = "${module.fargate-application.task_sg_id}"
  ecs_subnets         = "${module.fargate-application.public_subnets}"
  log_group_name      = "${module.logging.log_group_name}"
}

module "logging" {
  source              = "../../modules/logging"
  app_name            = "${var.app_name}"
}

module "route_53" {
  source              = "../../modules/route_53"
  lb_dns_name         = "${module.fargate-application.lb_dns_name}"
  lb_zone_id          = "${module.fargate-application.lb_zone_id}"
}
