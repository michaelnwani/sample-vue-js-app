output "alb-target-group" {
  value = "${aws_alb_target_group.alb_target_group.arn}"
}

output "task_execution_role" {
  value = "ecsTaskExecutionRole"
}

output "task_role_name" {
  value = "${aws_iam_role.task_role.name}"
}

output "cluster_id" {
  value = "${aws_ecs_cluster.cluster.id}"
}

output "alb-id" {
  value = "${aws_alb.alb.id}"
}

output "task_sg_id" {
  value = "${aws_security_group.task_sg.id}"
}

output "public_subnets" {
  value = "${data.aws_subnet_ids.vpc_subnet_ids.ids}"
}

output "lb_dns_name" {
  value = "${aws_alb.alb.dns_name}"
}

output "lb_zone_id" {
  value = "${aws_alb.alb.zone_id}"
}
