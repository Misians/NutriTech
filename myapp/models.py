# myapp/models.py
from django.db import models
from django.contrib.auth.models import User

class Client(models.Model):
    # Torne o campo 'user' opcional
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='clients', null=True, blank=True)
    
    fullName = models.CharField(max_length=255)
    cpf = models.CharField(max_length=14, unique=True)
    dob = models.DateField()
    gender = models.CharField(max_length=1, choices=[('M', 'Masculino'), ('F', 'Feminino'), ('O', 'Outro')], blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    observations = models.TextField(blank=True, null=True)
    objectives = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.fullName