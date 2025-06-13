# myapp/views.py
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required 
from rest_framework.exceptions import PermissionDenied

from .models import Client
from .forms import ClientForm
from django.contrib import messages 
from rest_framework import viewsets, permissions # Certifique-se que permissions está importado
from .serializers import ClientSerializer

# myapp/views.py

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [permissions.AllowAny] # <-- Essencial para acesso sem autenticação

    def get_queryset(self):
        # Para retornar TODOS os clientes quando não há autenticação (e não filtrar por user)
        return Client.objects.all().order_by('fullName')

    def perform_create(self, serializer):
        # Se o 'user' for opcional, apenas salve. Se for obrigatório, isso falhará sem autenticação.
        # Se você quer associar a um usuário SOMENTE se ele estiver logado, mantenha a lógica if/else.
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save() # Salva sem atribuir um usuário
@login_required
def client_list(request):
    clients = Client.objects.filter(user=request.user).order_by('fullName')
    return render(request, 'myapp/client_list.html', {'clients': clients})

@login_required
def client_create(request):
    if request.method == 'POST':
        form = ClientForm(request.POST)
        if form.is_valid():
            client = form.save(commit=False)
            client.user = request.user 
            client.save() 
            messages.success(request, 'Cliente cadastrado com sucesso!')
            return redirect('client_list')
        else:
            messages.error(request, 'Erro ao cadastrar o cliente. Verifique os dados.')
    else:
        form = ClientForm()
    return render(request, 'myapp/client_form.html', {'form': form, 'title': 'Cadastrar Novo Cliente'})

@login_required
def client_update(request, pk):
    client = get_object_or_404(Client, pk=pk, user=request.user)
    if request.method == 'POST':
        form = ClientForm(request.POST, instance=client)
        if form.is_valid():
            form.save()
            messages.success(request, 'Cliente atualizado com sucesso!')
            return redirect('client_list')
        else:
            messages.error(request, 'Erro ao atualizar o cliente. Verifique os dados.')
    else:
        form = ClientForm(instance=client)
    return render(request, 'myapp/client_form.html', {'form': form, 'client': client, 'title': 'Editar Cliente'})

@login_required
def client_delete(request, pk):
    client = get_object_or_404(Client, pk=pk, user=request.user)
    if request.method == 'POST':
        client.delete()
        messages.success(request, 'Cliente excluído com sucesso!')
        return redirect('client_list')
    return render(request, 'myapp/client_confirm_delete.html', {'client': client, 'title': 'Excluir Cliente'})