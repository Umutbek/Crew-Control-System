from django.shortcuts import render
from rest_framework import permissions, status, generics, viewsets

from rest_framework.settings import api_settings
from rest_framework.views import APIView
from rest_framework.response import Response

from proposal import serializers, models
from django.contrib.auth import get_user_model
import datetime


class ServiceItemViewSet(viewsets.ModelViewSet):
    """Manage a service item"""
    serializer_class = serializers.ServiceItemSerializer
    queryset = models.ServiceItem.objects.all()


class ProposalViewSet(viewsets.ModelViewSet):
    """Manage Proposal"""
    serializer_class = serializers.ProposalSerializer
    queryset = models.Proposal.objects.all()


class ProposalItemViewSet(viewsets.ModelViewSet):
    """Manage Proposal Item"""
    serializer_class = serializers.ProposalItemSerializer
    queryset = models.ProposalItem.objects.all()