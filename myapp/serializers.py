# myapp/serializers.py
from rest_framework import serializers
from .models import Client

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        # Inclua todos os campos que você quer expor na API e que o React poderá manipular.
        fields = ['id', 'fullName', 'cpf', 'dob', 'gender', 'age', 'email', 'observations', 'objectives', 'user']
        # O 'user' será definido automaticamente pelo backend para o usuário logado.
        # Por segurança, podemos torná-lo read-only para que o frontend não o modifique diretamente.
        read_only_fields = ['user']