# Generated by Django 4.2.11 on 2024-05-25 21:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobschedules', '0002_assignedjob'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignedjob',
            name='active',
            field=models.BooleanField(default=False),
        ),
    ]
