from rest_framework import serializers, exceptions
from django.contrib.auth import get_user_model, authenticate, password_validation
from rest_framework.response import Response
from users import models

from rest_framework.authtoken.models import Token


class CrewSerializer(serializers.ModelSerializer):
    """Crew account serializer"""
    class Meta:
        model = models.Crew
        fields = ('id','name', 'email', 'phone', 'address', 'logo', 'business_id', 'password')

        read_only_fields = ('id',)
        extra_kwargs = {'password':{'write_only':True},}

    def create(self, validated_data):
        """Create user with encrypted password and return it"""
        user = models.Crew.objects.create_crew(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


    def update(self, instance, validated_data):
        """Update a user, setting the password correctly and return it"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()
        return user

class CrewMemberSerializer(serializers.ModelSerializer):
    """Serializer for Crew members"""
    class Meta:
        model = models.CrewMember
        fields = ('id', 'name', 'email', 'phone', 'crew')
