from rest_framework import viewsets
from .models import Jobs
from .serializers import JobsSerializer


class JobsViewSet(viewsets.ModelViewSet):
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer

    def get_queryset(self):
        # Filtering by frequency
        queryset = super().get_queryset()
        frequency_param = self.request.query_params.get('frequency', None)
        if frequency_param:
            queryset = queryset.filter(frequency=frequency_param)
        return queryset