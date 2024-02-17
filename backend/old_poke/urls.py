from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('pokemon.urls')),
    path('api/login/', include('Trainer.urls')),
    path('api/trainer/', include('Trainer.urls')),
    path('api/items/', include('Items.urls'))
]
