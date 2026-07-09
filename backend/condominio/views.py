from rest_framework import viewsets
from .models import Bloco, Apartamento
from .serializers import BlocoSerializer, ApartamentoSerializer


class BlocoViewSet(viewsets.ModelViewSet):
    queryset = Bloco.objects.all()
    serializer_class = BlocoSerializer


class ApartamentoViewSet(viewsets.ModelViewSet):
    queryset = Apartamento.objects.all()
    serializer_class = ApartamentoSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        bloco_id = self.request.query_params.get('bloco')
        if bloco_id:
            queryset = queryset.filter(id_bloco=bloco_id)
        return queryset