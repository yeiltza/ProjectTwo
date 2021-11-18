resource "aws_iam_role" "beanstalk_service" {
  name               = "beanstalk_service"
  path               = "/"
  assume_role_policy = local.eb_policy
}

data "aws_iam_role" "eb" {
  name = "AWSServiceRoleForElasticBeanstalk"
}

data "aws_iam_policy" "beanstalk_policy" {
  arn = "arn:aws:iam::aws:policy/AdministratorAccess-AWSElasticBeanstalk"
}

resource "aws_iam_role_policy_attachment" "name" {
  role       = aws_iam_role.beanstalk_service.name
  policy_arn = data.aws_iam_policy.beanstalk_policy.arn
}

# // S3 Config
# resource "aws_s3_bucket" "latest" {
#   bucket = "webrtc.vlatest.bucket"
# }

# resource "aws_s3_bucket_object" "latest" {
#   bucket = aws_s3_bucket.latest.id
#   key    = "beanstalk/go-v1.zip"
#   source = "go-v1.zip"
# }

resource "aws_s3_bucket" "ci-deploy" {
  bucket = "ci-deploy-jbdiop"
  acl    = "private"
}

resource "aws_s3_bucket_object" "deploy_file" {
  bucket = aws_s3_bucket.ci-deploy.bucket
  key    = "app/webrtc-app.zip"
}



// Elastic Beanstalk Config
resource "aws_elastic_beanstalk_application" "webrtc-proj2" {
  name        = var.app_name
  description = "Project Two WebRTC application"

  appversion_lifecycle {
    service_role          = aws_iam_role.beanstalk_service.arn
    delete_source_from_s3 = true
  }
}

# resource "aws_elastic_beanstalk_application_version" "latest" {
#   name        = "webrtc-latest"
#   application = var.app_name
#   description = "WebRTC application version created by Terraform"
#   bucket      = aws_s3_bucket.latest.id
#   key         = aws_s3_bucket.latest.id
# }

resource "aws_elastic_beanstalk_configuration_template" "webrtc-template" {
  name                = "webrtc-app-template-config"
  application         = aws_elastic_beanstalk_application.webrtc-proj2.name
  solution_stack_name = var.solution_stack_name
}


resource "aws_elastic_beanstalk_environment" "webrtc-env" {
  name                = var.app_name
  application         = aws_elastic_beanstalk_application.webrtc-proj2.name
  solution_stack_name = var.solution_stack_name

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }
}

// Travis CI User
data "aws_iam_policy" "beanstalk_admin" {
  arn = "arn:aws:iam::aws:policy/AdministratorAccess-AWSElasticBeanstalk"
}
resource "aws_iam_user" "travis-ci" {
  name = "travis-ci"
}

# resource "aws_iam_policy" "travis-ci-policy" {
#   name        = "admin-beanstalk"
#   description = "Admin access for Elastic Beanstalk"
#   policy      = data.aws_iam_policy.beanstalk_admin.arn
# }

resource "aws_iam_user_policy" "travis-ci-policy" {
  name = "ci-policy"
  user = aws_iam_user.travis-ci.name

  policy = local.admin_policy
}

resource "aws_iam_access_key" "travis-ci" {
  user = aws_iam_user.travis-ci.name
}


// Github Action User
resource "aws_iam_user" "ga" {
  name = "github-actions"
}

resource "aws_iam_access_key" "ga" {
  user = aws_iam_user.ga.name
}

resource "aws_iam_user_policy" "ga_policy" {
  name = "ga-policy"
  user = aws_iam_user.ga.name

  policy = local.admin_policy
}
