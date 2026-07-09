from rest_framework.routers import DefaultRouter
from .views import TokenViewSet, EncomendaViewSet, RetiradaViewSet, NotificacaoViewSet

router = DefaultRouter()
router.register(r'tokens', TokenViewSet)
router.register(r'encomendas', EncomendaViewSet)
router.register(r'retiradas', RetiradaViewSet)
router.register(r'notificacoes', NotificacaoViewSet)

urlpatterns = router.urls