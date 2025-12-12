from django.test import TestCase
from api.models import Sweet

class SweetModelTests(TestCase):
    def test_create_sweet(self):
        sweet = Sweet.objects.create(
            name='Chocolate Bar',
            category='Chocolate',
            price=2.50,
            quantity=100
        )
        self.assertEqual(sweet.name, 'Chocolate Bar')
        self.assertEqual(sweet.category, 'Chocolate')
        self.assertEqual(sweet.price, 2.50)
        self.assertEqual(sweet.quantity, 100)
        self.assertTrue(sweet.pk is not None)

    def test_sweet_str(self):
        sweet = Sweet.objects.create(
            name='Lollipop',
            category='Candy',
            price=0.50,
            quantity=50
        )
        self.assertEqual(str(sweet), 'Lollipop')

    def test_default_quantity(self):
        sweet = Sweet.objects.create(
            name='Gummy Bears',
            category='Gummies',
            price=1.50
        )
        self.assertEqual(sweet.quantity, 0)
