from django.db import models

class Item (models.Model):
    name = models.CharField(max_length=30)
    value = models.IntegerField()
    stat_boost = models.IntegerField()
    item_class = models.CharField(max_length=10, default='health')
    item_type = models.CharField(max_length=15, default='normal')
    quantity = models.IntegerField(default=1)

    def __str__ (self):
        return f'{self.name}'
    
    def increment_quantity(self, qty=1):
        self.quantity += qty
        self.save()

    def decrement_quantity(self, qty=1):
        self.quantity -= qty
        if self.quantity <= 0:
            self.delete()
        else:
            self.save()
    