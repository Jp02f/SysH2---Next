from django.db import models
from condominio.models import Apartamento

class Usuario(models.Model):
    TIPO_USUARIO_CHOICES = [
        (1, 'Morador'),
        (2, 'Porteiro'),
        (3, 'Síndico'),
    ]

    id_usuario = models.AutoField(primary_key=True)
    id_apartamento = models.ForeignKey(
        Apartamento, on_delete=models.SET_NULL, db_column='id_apartamento',
        related_name='usuarios', null=True, blank=True
    )
    nome = models.CharField(max_length=150)
    email = models.EmailField(max_length=255)
    telefone = models.CharField(max_length=18)
    tipo_usuario = models.IntegerField(choices=TIPO_USUARIO_CHOICES)
    senha = models.CharField(max_length=255)
    
    SITUACAO_CHOICES = [
    ('Pendente', 'Pendente'),
    ('Ativo', 'Ativo'),
    ('Inativo', 'Inativo'),
    ('Cancelado', 'Cancelado'),
]

    situacao_cadastral = models.CharField(max_length=20, choices=SITUACAO_CHOICES, default='Pendente')

    class Meta:
        db_table = 'usuario'

    def __str__(self):
        return self.nome