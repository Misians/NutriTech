# myproject/urls.py
# myproject/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapp.urls')), # Inclui as URLs da sua API diretamente na raiz ou em um prefixo
    # URLs de autenticação padrão do Django (para o login via navegador/sessão, se usar)
    path('accounts/', include('django.contrib.auth.urls')),
]