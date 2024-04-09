from django.db import models
from django_tenants.models import TenantMixin
from django.contrib.auth.models import AbstractBaseUser, \
    BaseUserManager, PermissionsMixin


class Tenant(TenantMixin):
    name = models.CharField(max_length=255)