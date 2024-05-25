from django.urls import path, include
from jobschedules import views
from rest_framework.routers import DefaultRouter

app_name = 'jobschedules'

router = DefaultRouter()
router.register(r'jobs', views.JobsViewSet)
router.register(r'assignedjobs', views.AssignedJobViewSet)

urlpatterns = [
    path('', include(router.urls)),
]