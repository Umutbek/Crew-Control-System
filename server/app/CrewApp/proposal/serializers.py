from rest_framework import serializers, exceptions
from rest_framework.response import Response
from proposal import models
from users.models import Customers


class ServiceItemSerializer(serializers.ModelSerializer):
    """Serializer for Service Item"""
    class Meta:
        model = models.ServiceItem
        fields = ('id', 'name', 'price_per_unit', 'description')
        read_only_fields = ('id',)


class ProposalSerializer(serializers.ModelSerializer):
    """Serializer for Proposal"""
    items = serializers.PrimaryKeyRelatedField(queryset=models.ServiceItem.objects.all(), many=True)

    class Meta:
        model = models.Proposal
        fields = ('id', 'customer', 'items', 'tax_rate', 'discount_percent',
                  'total_price_before_tax', 'total_tax', 'total_discount',
                  'total_price_after_discount', 'total_price')
        
        read_only_fields = ('id', 'total_price_before_tax', 'total_tax', 'total_discount',
                            'total_price_after_discount', 'total_price')
    
        def create(self, validated_data):
            items_data = validated_data.pop('items', [])
            proposal = models.Proposal.objects.create(**validated_data)
            proposal.items.set(items_data)
            return proposal

        def update(self, instance, validated_data):
            items_data = validated_data.pop('items', None)
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            if items_data is not None:
                instance.items.set(items_data)
            instance.save()
            return instance


class ProposalItemSerializer(serializers.ModelSerializer):
    """Serializer for Proposal Item"""
    class Meta:
        model = models.ProposalItem
        fields = ('id', 'proposal', 'service_item', 'quantity', 'calculate_price')
        read_only_fields = ('id', 'calculate_price')