from rest_framework import viewsets
from .models import Token, Encomenda, Retirada, Notificacao
from .serializers import (
    TokenSerializer, EncomendaSerializer, RetiradaSerializer, NotificacaoSerializer
)


class TokenViewSet(viewsets.ModelViewSet):
    queryset = Token.objects.all()
    serializer_class = TokenSerializer


class EncomendaViewSet(viewsets.ModelViewSet):
    queryset = Encomenda.objects.all().order_by('-data_recebimento', '-hora_recebimento')
    serializer_class = EncomendaSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        usuario_id = self.request.query_params.get('usuario')
        if usuario_id:
            queryset = queryset.filter(id_usuario=usuario_id)
        return queryset


class RetiradaViewSet(viewsets.ModelViewSet):
    queryset = Retirada.objects.all()
    serializer_class = RetiradaSerializer


class NotificacaoViewSet(viewsets.ModelViewSet):
    queryset = Notificacao.objects.all()
    serializer_class = NotificacaoSerializer