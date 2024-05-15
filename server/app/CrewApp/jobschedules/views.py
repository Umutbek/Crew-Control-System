from rest_framework import viewsets
from .models import Jobs
from .serializers import JobsSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import DateRangeFilter



class JobsViewSet(viewsets.ModelViewSet):
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = DateRangeFilter

    def get_queryset(self):
        # Filtering by frequency
        queryset = super().get_queryset()
        frequency_param = self.request.query_params.get('frequency', None)
        if frequency_param:
            queryset = queryset.filter(frequency=frequency_param)
        return queryset