from django.db import models
from Items.models import Item

class Shop(models.Model):
    items = models.ManyToManyField(Item, related_name='shop_items')

    def __str__(self):
        return f'Shop #{self.id}'
    
    def replenish_items(self, quantity=10):
        for item in self.items.all():
            item.quantity = quantity
            item.save()
