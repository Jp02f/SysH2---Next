from rest_framework import serializers
from .models import Bloco, Apartamento


class BlocoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bloco
        fields = '__all__'


class ApartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartamento
        fields = '__all__'