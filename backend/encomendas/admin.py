from django.contrib import admin
from .models import Token, Encomenda, Retirada, Notificacao

admin.site.register(Token)
admin.site.register(Encomenda)
admin.site.register(Retirada)
admin.site.register(Notificacao)