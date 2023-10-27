from django.test import TestCase
from Items.models import Item

class items_test(TestCase):
    def setUp(self):
        self.item = Item.objects.create(name='testitem', value=30, stat_boost=60, item_class='health', quantity=15)

    def test_increment_default_qty(self):
        initial_qty = self.item.quantity
        self.item.increment_quantity()
        final_qty = self.item.quantity
        self.assertEqual(final_qty - 1, initial_qty)

    def test_increment_qty(self):
        initial_qty = self.item.quantity
        self.item.increment_quantity(25)
        final_qty = self.item.quantity
        self.assertEqual(final_qty-25, initial_qty)

    def test_decrement_default_qty(self):
        initial_qty = self.item.quantity
        self.item.decrement_quantity()
        final_qty = self.item.quantity
        self.assertEqual(final_qty + 1, initial_qty)

    def test_decrement_qty(self):
        initial_qty = self.item.quantity
        self.item.decrement_quantity(13)
        final_qty = self.item.quantity
        self.assertEqual(final_qty + 13, initial_qty)
