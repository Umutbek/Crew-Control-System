import django_filters
from jobschedules.models import Jobs  

class DateRangeFilter(django_filters.FilterSet):
    start_date = django_filters.DateFilter(field_name="date", lookup_expr='gte')
    end_date = django_filters.DateFilter(field_name="date", lookup_expr='lte')
    crew = django_filters.CharFilter('crew')
    date = django_filters.CharFilter('date')

    class Meta:
        model = Jobs
        fields = ['start_date', 'end_date','crew']
