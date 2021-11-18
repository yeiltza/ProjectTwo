locals {
  admin_policy = file("${path.module}/policy/admin.json")
  eb_policy    = file("${path.module}/policy/eb.json")
}
