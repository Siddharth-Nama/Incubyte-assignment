from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from api.models import Sweet

User = get_user_model()

class InventoryTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='user@example.com', password='password123')
        self.admin = User.objects.create_superuser(email='admin@example.com', password='password123')
        self.sweet = Sweet.objects.create(name='Candy', category='Sweet', price=1.00, quantity=10)
        self.purchase_url = f'/api/sweets/{self.sweet.pk}/purchase/'
        self.restock_url = f'/api/sweets/{self.sweet.pk}/restock/'

    def test_purchase_sweet(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.purchase_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check quantity
        self.sweet.refresh_from_db()
        self.assertEqual(self.sweet.quantity, 9)
        self.assertEqual(response.data['quantity'], 9)

    def test_purchase_sweet_out_of_stock(self):
        self.sweet.quantity = 0
        self.sweet.save()
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.purchase_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_restock_sweet_admin(self):
        self.client.force_authenticate(user=self.admin)
        data = {'quantity': 100}
        response = self.client.post(self.restock_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.sweet.refresh_from_db()
        self.assertEqual(self.sweet.quantity, 110)

    def test_restock_sweet_forbidden(self):
        self.client.force_authenticate(user=self.user)
        data = {'quantity': 100}
        response = self.client.post(self.restock_url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
