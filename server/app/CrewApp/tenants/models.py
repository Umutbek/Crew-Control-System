from django.db import models
from django_tenants.models import TenantMixin
from django_tenants.models import DomainMixin


class Tenant(TenantMixin):
    name = models.CharField(max_length=255)
    created_on = models.DateField(auto_now_add=True)


class Domain(DomainMixin):
    pass 
