from rest_framework import viewsets
from .models import Usuario
from .serializers import UsuarioSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password

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
    
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        senha = request.data.get("senha")

        try:
            usuario = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            return Response(
                {"erro": "Email ou senha inválidos."},
                status=400
            )

        if not check_password(senha, usuario.senha):
            return Response(
                {"erro": "Email ou senha inválidos."},
                status=400
            )

        if usuario.situacao_cadastral == "Pendente":
            return Response(
            {"erro": "Seu cadastro ainda não foi aprovado pela síndica."},
                status=403
            )

        if usuario.situacao_cadastral == "Inativo":
            return Response(
                {"erro": "Sua conta está inativa. Entre em contato com a síndica."},
                status=403
            )

        if usuario.situacao_cadastral == "Cancelado":
            return Response(
                {"erro": "Seu acesso foi cancelado permanentemente."},
                status=403
            )

        return Response({
            "id_usuario": usuario.id_usuario,
            "nome": usuario.nome,
            "tipo_usuario": usuario.tipo_usuario,
            "situacao_cadastral": usuario.situacao_cadastral,
            "id_apartamento": usuario.id_apartamento.id_apartamento if usuario.id_apartamento else None,
            "apartamento": usuario.id_apartamento.apartamento if usuario.id_apartamento else None,
            "bloco": usuario.id_apartamento.id_bloco.bloco if usuario.id_apartamento else None,
        })