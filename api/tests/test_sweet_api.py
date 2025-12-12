from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model
from api.models import Sweet

User = get_user_model()

class SweetAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='user@example.com', password='password123')
        self.client.force_authenticate(user=self.user)
        self.sweet = Sweet.objects.create(name='Candy', category='Sweet', price=1.00, quantity=10)
        self.url = '/api/sweets/'

    def test_list_sweets(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_sweet(self):
        data = {'name': 'New Candy', 'category': 'Sweet', 'price': '2.00', 'quantity': 20}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Sweet.objects.count(), 2)

    def test_retrieve_sweet(self):
        response = self.client.get(f'{self.url}{self.sweet.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Candy')

    def test_update_sweet(self):
        data = {'name': 'Updated Candy', 'category': 'Sweet', 'price': '1.50', 'quantity': 10}
        response = self.client.put(f'{self.url}{self.sweet.pk}/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Updated Candy')

    def test_delete_sweet_admin_only(self):
        # Regular user should fail? Requirement says "Delete a sweet (Admin only)"
        response = self.client.delete(f'{self.url}{self.sweet.pk}/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Admin user
        admin = User.objects.create_superuser(email='admin@example.com', password='password123')
        self.client.force_authenticate(user=admin)
        response = self.client.delete(f'{self.url}{self.sweet.pk}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Sweet.objects.count(), 0)
