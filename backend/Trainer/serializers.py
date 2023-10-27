from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Trainer

class SignupSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password"]

class TrainerSerializer(ModelSerializer):
    class Meta:
        model = Trainer
        fields = '__all__'
