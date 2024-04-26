from django.urls import path, include
from proposal import views
from rest_framework.routers import DefaultRouter

app_name = 'proposal'

router = DefaultRouter()
router.register(r'service-item', views.ServiceItemViewSet)
router.register(r'proposal', views.ProposalViewSet)
router.register(r'proposal-item', views.ProposalItemViewSet)

urlpatterns = [
    path('', include(router.urls))
]