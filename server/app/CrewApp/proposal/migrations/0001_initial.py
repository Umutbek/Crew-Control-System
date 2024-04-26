# Generated by Django 4.2.11 on 2024-04-26 17:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0004_customers'),
    ]

    operations = [
        migrations.CreateModel(
            name='Proposal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tax_rate', models.DecimalField(decimal_places=2, default=0.0, help_text='Tax rate as a percentage, e.g., 20 for 20%', max_digits=5)),
                ('discount_percent', models.DecimalField(decimal_places=2, default=0.0, help_text='Discount rate as a percentage, e.g., 10 for 10%', max_digits=5)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.customers')),
            ],
        ),
        migrations.CreateModel(
            name='ServiceItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('price_per_unit', models.DecimalField(decimal_places=2, max_digits=8)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ProposalItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('proposal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proposal.proposal')),
                ('service_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proposal.serviceitem')),
            ],
        ),
        migrations.AddField(
            model_name='proposal',
            name='items',
            field=models.ManyToManyField(through='proposal.ProposalItem', to='proposal.serviceitem'),
        ),
    ]
