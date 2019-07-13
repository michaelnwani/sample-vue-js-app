variable "app_name" {}

variable "alb_is_internal" {}

variable "app_cpu" {}

variable "app_memory" {}

variable "app_image" {}

variable "app_port" {}

variable "aws_region" {}

variable "ecs_cluster_id" {}

variable "ecs_task_sg_ids" {}

variable "ecs_lb_target_group" {}

variable "lb_arn" {}

variable "log_group_name" {}

variable "task_role_name" {}

variable "task_execution_role" {}

variable "certificate_arn" {}

variable "ecs_subnets" {
  type = "list"
}
