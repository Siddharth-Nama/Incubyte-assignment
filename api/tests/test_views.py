from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status

User = get_user_model()

class AuthViewTests(APITestCase):
    def test_register_view(self):
        url = reverse('register')
        data = {
            'email': 'newuser@example.com',
            'password': 'password123',
            'confirm_password': 'password123'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, 'newuser@example.com')

    def test_login_view(self):
        User.objects.create_user(email='test@example.com', password='password123')
        url = reverse('login')
        data = {
            'email': 'test@example.com',
            'password': 'password123'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
