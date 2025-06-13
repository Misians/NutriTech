# myapp/forms.py
from django import forms
from .models import Client

class ClientForm(forms.ModelForm):
    class Meta:
        model = Client
        # Inclua todos os campos que você deseja que o usuário preencha
        fields = ['fullName', 'cpf', 'dob', 'gender', 'age', 'email', 'observations', 'objectives']
        widgets = {
            # Usa um input type="date" para o campo de data de nascimento
            'dob': forms.DateInput(attrs={'type': 'date'}),
        }
        # Você também pode definir rótulos personalizados aqui se quiser
        labels = {
            'fullName': 'Nome Completo',
            'dob': 'Data de Nascimento',
            # ... outros campos
        }