from rest_framework import viewsets
from .models import OneTimeJob, RecurringJob
from .serializers import OneTimeJobSerializer, RecurringJobSerializer


class OneTimeJobViewSet(viewsets.ModelViewSet):
    queryset = OneTimeJob.objects.all()
    serializer_class = OneTimeJobSerializer

    def get_queryset(self):
        # Filtering by date
        queryset = super().get_queryset()
        date_param = self.request.query_params.get('date', None)
        if date_param:
            queryset = queryset.filter(date=date_param)
        return queryset


class RecurringJobViewSet(viewsets.ModelViewSet):
    queryset = RecurringJob.objects.all()
    serializer_class = RecurringJobSerializer

    def get_queryset(self):
        # Filtering by frequency
        queryset = super().get_queryset()
        frequency_param = self.request.query_params.get('frequency', None)
        if frequency_param:
            queryset = queryset.filter(frequency=frequency_param)
        return queryset