from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, LoginView

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)

urlpatterns = router.urls + [
    path("login/", LoginView.as_view(), name="login"),
]