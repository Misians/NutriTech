# myapp/admin.py
from django.contrib import admin
from .models import Client

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('fullName', 'user', 'cpf', 'email', 'age', 'gender')
    search_fields = ('fullName', 'cpf', 'email')
    list_filter = ('gender', 'user')
    # Campos que podem ser editados diretamente na lista
    list_editable = ('email', 'age')