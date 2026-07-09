from rest_framework import viewsets
from .models import Usuario
from .serializers import UsuarioSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer 

    def get_queryset(self):
        queryset = super().get_queryset()
        tipo = self.request.query_params.get('tipo_usuario')
        apartamento_id = self.request.query_params.get('apartamento')
        if tipo:
            queryset = queryset.filter(tipo_usuario=tipo)
        if apartamento_id:
            queryset = queryset.filter(id_apartamento=apartamento_id)
        return queryset