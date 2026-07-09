from rest_framework import serializers
from .models import Token, Encomenda, Retirada, Notificacao


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = '__all__'


class EncomendaSerializer(serializers.ModelSerializer):
    usuario_nome = serializers.CharField(source='id_usuario.nome', read_only=True)
    token_codigo = serializers.CharField(source='id_token.token', read_only=True)

    class Meta:
        model = Encomenda
        fields = '__all__'


class RetiradaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Retirada
        fields = '__all__'


class NotificacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacao
        fields = '__all__'