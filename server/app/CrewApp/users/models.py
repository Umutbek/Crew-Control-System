from django.db import models
from django.contrib.auth.models import AbstractBaseUser, \
    BaseUserManager, PermissionsMixin

from django_fsm import FSMIntegerField
from users import utils
from django.contrib.auth.models import Group, Permission
from tenants.models import Tenant

class CrewMember(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=20)

    class Meta:
        ordering = ('-id',)
        verbose_name = ("Crew member")
        verbose_name_plural = ("Crew Members")


class UserManager(BaseUserManager):
    def create_business(self, name, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Businesses must have an email address')

        business = self.model(email=email, **extra_fields)
        business.set_password(password)
        business.save(using=self._db)

        # Create a tenant for the new business
        tenant = Tenant.objects.create(name=name)
        business.tenant = tenant
        business.save()
        return business

class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=255)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    logo = models.ImageField(upload_to='tenant_logos/', null=True, blank=True)
    tenant = models.ForeignKey(Tenant, related_name='users', on_delete=models.CASCADE)
    type = FSMIntegerField(choices=utils.UserTypes.choices, null=True, blank=True)
    crew_members = models.ManyToManyField('CrewMember', blank=True, verbose_name='crew_members')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    groups = models.ManyToManyField(
        Group,
        verbose_name='user groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name="custom_user_set",  # Changed from 'user_set' to 'custom_user_set'
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user specific permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="custom_user_set",  # Changed from 'user_set' to 'custom_user_set'
        related_query_name="user",
    )