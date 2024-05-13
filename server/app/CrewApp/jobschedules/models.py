from django.db import models
import datetime
from users.models import Crew, Customers
from proposal.models import Proposal
from jobschedules import utils
from django_fsm import FSMIntegerField


class Jobs(models.Model):
    customer = models.ForeignKey(Customers, on_delete=models.CASCADE)
    crew = models.ForeignKey(Crew, on_delete=models.SET_NULL, null=True)
    job_location = models.CharField(max_length=255, blank=True, null=True)

    date = models.DateField(help_text="The first date the job should start (mm/dd/yyyy)")
    day_of_week = models.CharField(max_length=9, choices=[
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday')
    ])
    frequency = models.CharField(max_length=10, choices=[
        ('weekly', 'Weekly'),
        ('biweekly', 'Every Two Weeks'),
        ('triweekly', 'Triweekly'),
        ('quadweekly', 'Quadweekly'),

        ('custom', 'Custom')
    ])
    custom_interval_days = models.IntegerField(null=True, blank=True, help_text="Number of days for custom frequency")
    total_man_hours = models.DecimalField(max_digits=5, decimal_places=2)
    job_ordering = models.PositiveIntegerField(help_text="Order of the job in the day's schedule")
    last_visit_date = models.DateField(null=True, blank=True)

    instructions_for_crew = models.TextField(blank=True, null=True)
    files = models.FileField(upload_to='recurring_job_files/', blank=True, null=True)
    status = FSMIntegerField(choices=utils.JobStatus.choices, default=utils.JobStatus.SCHEDULED)
    job_type = FSMIntegerField(choices=utils.JobType.choices, default=utils.JobType.ONETIME)

    proposal = models.ForeignKey(Proposal, on_delete=models.SET_NULL, null=True)

    mow = models.BooleanField(default=False)
    edge = models.BooleanField(default=False)
    blow = models.BooleanField(default=False)

    def next_visit_date(self):
        if not self.last_visit_date:
            return self.start_date
        if self.frequency == 'weekly':
            return self.last_visit_date + datetime.timedelta(weeks=1)
        elif self.frequency == 'biweekly':
            return self.last_visit_date + datetime.timedelta(weeks=2)
        elif self.frequency == 'triweekly':
            return self.last_visit_date + datetime.timedelta(weeks=3)
        elif self.frequency == 'quadweekly':
            return self.last_visit_date + datetime.timedelta(weeks=4)
        elif self.frequency == 'custom' and self.custom_interval_days:
            return self.last_visit_date + datetime.timedelta(days=self.custom_interval_days)
        return None

    def calculate_gross_revenue(self):
        total_revenue = 0
        if self.mow:
            total_revenue += 50  # Example fixed price for mowing
        if self.edge:
            total_revenue += 20  # Example fixed price for edging
        if self.blow:
            total_revenue += 15  # Example fixed price for blowing

        return total_revenue

    def __str__(self):
        return f"Job for {self.customer.name}, starts on {self.date}"