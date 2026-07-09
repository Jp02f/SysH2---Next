from django.db import models

class Bloco(models.Model):
    id_bloco = models.AutoField(primary_key=True)
    bloco = models.CharField(max_length=10)

    class Meta:
        db_table = 'bloco'

    def __str__(self):
        return self.bloco


class Apartamento(models.Model):
    id_apartamento = models.AutoField(primary_key=True)
    apartamento = models.IntegerField()
    id_bloco = models.ForeignKey(
        Bloco, on_delete=models.CASCADE, db_column='id_bloco', related_name='apartamentos'
    )

    class Meta:
        db_table = 'apartamento'

    def __str__(self):
        return f"{self.apartamento} - Bloco {self.id_bloco.bloco}"