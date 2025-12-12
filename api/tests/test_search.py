from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from api.models import Sweet

User = get_user_model()

class SweetSearchTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='user@example.com', password='pass')
        self.client.force_authenticate(user=self.user)
        Sweet.objects.create(name='Chocolate Bar', category='Chocolate', price=2.50)
        Sweet.objects.create(name='Gummy Bears', category='Gummies', price=1.50)
        Sweet.objects.create(name='Lollipop', category='Candy', price=0.50)
        self.url = '/api/sweets/search/'

    def test_search_by_name(self):
        response = self.client.get(self.url, {'name': 'Bar'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Should match Chocolate Bar
        self.assertTrue(any(s['name'] == 'Chocolate Bar' for s in response.data))
        self.assertFalse(any(s['name'] == 'Gummy Bears' for s in response.data))

    def test_search_by_category(self):
        response = self.client.get(self.url, {'category': 'Gummies'})
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Gummy Bears')

    def test_search_by_price_range(self):
        # Price between 1.00 and 3.00 (Choco 2.50, Gummy 1.50)
        response = self.client.get(self.url, {'min_price': '1.00', 'max_price': '3.00'})
        self.assertEqual(len(response.data), 2)
        names = [s['name'] for s in response.data]
        self.assertIn('Chocolate Bar', names)
        self.assertIn('Gummy Bears', names)
        self.assertNotIn('Lollipop', names)
