from django.urls import path

from Items.views import ItemsView

urlpatterns = [
path('update', ItemsView.as_view()),
]