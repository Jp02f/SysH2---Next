from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):

    bloco = serializers.CharField(
        source='id_apartamento.id_bloco.bloco',
        read_only=True
    )

    apartamento = serializers.IntegerField(
        source='id_apartamento.apartamento',
        read_only=True
    )

    class Meta:
        model = Usuario
        fields = [
            "id_usuario",
            "nome",
            "email",
            "telefone",
            'tipo_usuario',
            "situacao_cadastral",
            "id_apartamento",
            "bloco",
            "apartamento",
            "senha",
        ]
        extra_kwargs = {
            "senha": {"write_only": True},
            "tipo_usuario": {"read_only": True},
            "situacao_cadastral": {
                "required": False,
                "allow_null": True,
            }
        }
            
        

    def create(self, validated_data):
        validated_data['senha'] = make_password(validated_data['senha'])

        validated_data['tipo_usuario'] = 1
        validated_data['situacao_cadastral'] = 'Pendente'
        
        return Usuario.objects.create(**validated_data)