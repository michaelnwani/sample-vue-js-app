# Default AWS environment variables
variable "app_name" {
  description = "Name of the application. Will be added to names for uniqueness."
}

# ALB-specific variables
variable "alb_is_internal" {
  description = "Marks the alb as internal"
  default     = false
}

# Begin health-check block
variable "alb_health_check_timeout" {
  description = "The amount of time, in seconds, during which no response means a failed health check"
  default     = 30
}


variable "alb_health_check_interval" {
  description = "The amount of time in seconds between health checks of a target"
  default     = 60
}

variable "alb_health_check_path" {
  description = "Name of the healthcheck endpoint"
  default     = "/health"
}

variable "alb_health_check_healthy_threshold" {
  description = "No. of consecutive successful responses to label the target as healthy"
  default     = 2
}

variable "alb_health_check_unhealthy_threshold" {
  description = "No. of consecutive unsuccessful responses to label the target as unhealthy"
  default     = 5
}

variable "alb_health_check_matcher" {
  description = "The range of successful HTTP response status codes"
  default     = "200-399"
}

variable "alb_health_check_protocol" {
  description = "The health check protocol"
  default     = "HTTP"
}
# End health-check block
