from rest_framework import serializers
from .models import Jobs
from users.serializers import CustomerSerializer
from users.models import Customers 


class JobsSerializer(serializers.ModelSerializer):
    gross_revenue = serializers.SerializerMethodField()
    customer_data = CustomerSerializer(source='customer', read_only=True)  # For output

    class Meta:
        model = Jobs
        fields = (
            'id', 'customer', 'customer_data', 'job_location', 'crew', 'date', 'day_of_week',
            'frequency', 'total_man_hours', 'job_ordering', 'custom_interval_days', 'last_visit_date',
            'gross_revenue', 'instructions_for_crew', 'files', 'proposal',
            'mow', 'edge', 'blow', 'next_visit_date', 'status', 'job_type'
        )
        read_only_fields = ('id', 'next_visit_date', 'gross_revenue', 'customer_data')
    
    def get_gross_revenue(self, obj):
        return obj.calculate_gross_revenue()
    
    def create(self, validated_data):
        customer_data = validated_data.pop('customer', None)
        if customer_data:
            customer = Customers.objects.create(**customer_data)
            validated_data['customer'] = customer
        job = Jobs.objects.create(**validated_data)
        return job