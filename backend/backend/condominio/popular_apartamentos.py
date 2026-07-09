from condominio.models import Bloco, Apartamento

numeros = [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44, 51, 52, 53, 54]

blocos = Bloco.objects.all()

for bloco in blocos:
    for numero in numeros:
        Apartamento.objects.get_or_create(apartamento=numero, id_bloco=bloco)

print(f"Criados apartamentos para {blocos.count()} blocos.")