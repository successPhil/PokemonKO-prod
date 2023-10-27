from django.db import models

class Move(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=15, default='Normal')
    damage = models.IntegerField(default=0)

    def __str__(self):
        return self.name
