from rest_framework.routers import DefaultRouter
from .views import BlocoViewSet, ApartamentoViewSet

router = DefaultRouter()
router.register(r'blocos', BlocoViewSet)
router.register(r'apartamentos', ApartamentoViewSet)

urlpatterns = router.urls