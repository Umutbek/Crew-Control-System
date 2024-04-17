from django.shortcuts import render
from rest_framework import permissions, status, generics, authentication, viewsets

from rest_framework.settings import api_settings
from rest_framework.views import APIView
from rest_framework.response import Response

from users import serializers, models

from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

import datetime
from django.contrib import auth
from rest_framework.renderers import JSONRenderer



class CrewViewSet(viewsets.ModelViewSet):
    """Manage a crew viewset"""
    serializer_class = serializers.CrewSerializer
    queryset = models.Crew.objects.all()

class CrewMemberViewSet(viewsets.ModelViewSet):
    """Manage a crew member viewset"""
    serializer_class = serializers.CrewMemberSerializer
    queryset = models.CrewMember.objects.all()