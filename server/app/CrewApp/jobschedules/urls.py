from django.urls import path, include
from jobschedules import views
from rest_framework.routers import DefaultRouter

app_name = 'jobschedules'

router = DefaultRouter()
router.register(r'recurring-job', views.RecurringJobViewSet)
router.register(r'onetime-job', views.OneTimeJobViewSet)

urlpatterns = [
    path('', include(router.urls)),
]