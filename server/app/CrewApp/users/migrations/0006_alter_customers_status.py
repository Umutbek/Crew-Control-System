# Generated by Django 4.2.11 on 2024-05-18 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_customers_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customers',
            name='status',
            field=models.BooleanField(default=False),
        ),
    ]
