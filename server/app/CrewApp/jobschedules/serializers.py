from rest_framework import serializers
from .models import OneTimeJob, RecurringJob

class OneTimeJobSerializer(serializers.ModelSerializer):
    gross_revenue = serializers.SerializerMethodField()

    class Meta:
        model = OneTimeJob
        fields = (
            'id', 'customer', 'job_location', 'crew', 'date',
            'total_man_hours', 'gross_revenue', 'job_ordering', 'instructions_for_crew',
            'files', 'proposal', 'mow', 'edge', 'blow'
        )
        read_only_fields = ('id', 'gross_revenue')

    def get_gross_revenue(self, obj):
        return obj.calculate_gross_revenue()


class RecurringJobSerializer(serializers.ModelSerializer):
    gross_revenue = serializers.SerializerMethodField()

    class Meta:
        model = RecurringJob
        fields = (
            'id', 'customer', 'crew', 'start_date', 'day_of_week',
            'frequency', 'total_man_hours', 'job_ordering', 'custom_interval_days', 'last_visit_date',
            'gross_revenue', 'instructions_for_crew', 'files',
            'mow', 'edge', 'blow', 'next_visit_date'
        )
        read_only_fields = ('id', 'next_visit_date', 'gross_revenue')
    
    def get_gross_revenue(self, obj):
        return obj.calculate_gross_revenue()

