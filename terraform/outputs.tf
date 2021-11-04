output "aws_region" {
  value = var.aws_region
}

output "elastic_beanstalk_app_name" {
  value = aws_elastic_beanstalk_application.webrtc-proj2.name
}

output "elastic_beanstalk_env_name" {
  value = aws_elastic_beanstalk_environment.webrtc-env.name
}

output "travis_user_id" {
  value = aws_iam_access_key.travis-ci.user
}

output "travis_user_secret" {
  value = aws_iam_access_key.travis-ci.encrypted_secret
}

output "ga_user_id" {
  value = aws_iam_access_key.ga.user
}

output "ga_user_secret" {
  value = aws_iam_access_key.ga.encrypted_secret
}

output "ci_bucket_name" {
  value = aws_s3_bucket.ci-deploy.bucket_domain_name
}

# output "s3_bucket_name" {
#   value = aws_s3_bucket.latest.bucket
# }

# output "s3_bucket_path" {
#   value = aws_elastic_beanstalk_application.webrtc-proj2.name
# }
