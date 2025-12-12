from django.test import TestCase
from api.models import Sweet
from api.serializers import SweetSerializer

class SweetSerializerTests(TestCase):
    def test_sweet_serializer_valid(self):
        data = {
            'name': 'Jelly Beans',
            'category': 'Gummies',
            'price': '1.99',
            'quantity': 50
        }
        serializer = SweetSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        sweet = serializer.save()
        self.assertEqual(sweet.name, 'Jelly Beans')
        self.assertEqual(float(sweet.price), 1.99)

    def test_sweet_serializer_invalid(self):
        # Missing required field 'price'
        data = {
            'name': 'Invalid Sweet',
            'category': 'Unknown'
        }
        serializer = SweetSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('price', serializer.errors)
