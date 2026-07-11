from django.db import models
from authentication.models import Usuario


class Token(models.Model):
    id_token = models.AutoField(primary_key=True)
    token = models.CharField(max_length=6, unique=True)

    class Meta:
        db_table = 'token'

    def __str__(self):
        return self.token


class Encomenda(models.Model):
    id_encomendas = models.AutoField(primary_key=True)
    id_token = models.OneToOneField(
        Token, on_delete=models.CASCADE, db_column='id_token', related_name='encomenda'
    )
    id_usuario = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, db_column='id_usuario', related_name='encomendas'
    )
    id_porteiro_cadastro = models.ForeignKey(
        Usuario, on_delete=models.SET_NULL, null=True, blank=True,
        db_column='id_porteiro_cadastro', related_name='encomendas_cadastradas'
    )
    data_recebimento = models.DateField()
    hora_recebimento = models.TimeField()
    retirar_urgencia = models.BooleanField(default=False)
    codigo_rastreio = models.CharField(max_length=30)
    quantidade = models.IntegerField(default=1)
    observacao = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'encomenda'

    def __str__(self):
        return f"{self.codigo_rastreio} - {self.id_usuario.nome}"


class Retirada(models.Model):
    id_retirada = models.AutoField(primary_key=True)
    id_encomendas = models.OneToOneField(
        Encomenda, on_delete=models.CASCADE, db_column='id_encomendas', related_name='retirada'
    )
    retirada_terceiros = models.CharField(max_length=150, blank=True, null=True)
    hora_retirada = models.TimeField()
    data_retirada = models.DateField()

    class Meta:
        db_table = 'retirada'

    def __str__(self):
        return f"Retirada de {self.id_encomendas.codigo_rastreio}"


class Notificacao(models.Model):
    id_notif = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, db_column='id_usuario', related_name='notificacoes'
    )
    id_encomendas = models.ForeignKey(
        Encomenda, on_delete=models.CASCADE, db_column='id_encomendas', related_name='notificacoes'
    )
    mensagem = models.CharField(max_length=255)
    data_hora = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'notificacao'

    def __str__(self):
        return f"Notificação para {self.id_usuario.nome}"