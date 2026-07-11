from rest_framework import serializers
from .models import Token, Encomenda, Retirada, Notificacao


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = '__all__'


class EncomendaSerializer(serializers.ModelSerializer):
    usuario_nome = serializers.CharField(source='id_usuario.nome', read_only=True)
    token_codigo = serializers.CharField(source='id_token.token', read_only=True)
    porteiro_nome = serializers.CharField(source='id_porteiro_cadastro.nome', read_only=True, default=None)
    retirada_data = serializers.DateField(source='retirada.data_retirada', read_only=True, default=None)
    retirada_hora = serializers.TimeField(source='retirada.hora_retirada', read_only=True, default=None)
    retirada_por = serializers.CharField(source='retirada.retirada_terceiros', read_only=True, default=None)

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