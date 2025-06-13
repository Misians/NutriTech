# myapp/urls.py
from . import views
# myapp/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from .views import ClientViewSet

# Cria um roteador e registra a ViewSet do cliente
router = DefaultRouter()
router.register(r'clients', ClientViewSet) # 'clients' será o prefixo da URL (e.g., /api/clients/)

urlpatterns = [
    # Inclui todas as URLs geradas pelo roteador (list, create, retrieve, update, delete)
    path('api/', include(router.urls)),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'), # Adicione esta linha

    # Opcional: Adicione a URL de login/logout para a API, se necessário
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]