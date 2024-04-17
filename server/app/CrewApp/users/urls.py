from django.urls import path, include
from users import views
from rest_framework.routers import DefaultRouter

app_name = 'users'

router = DefaultRouter()
router.register(r'crew', views.CrewViewSet)
router.register(r'crewmember', views.CrewMemberViewSet)


urlpatterns = [
    path('', include(router.urls)),
    # path("login/", views.LoginAPI.as_view()),

]