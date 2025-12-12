from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIRequestFactory
from api.serializers import RegisterSerializer, LoginSerializer

class AuthSerializerTests(TestCase):
    def test_register_serializer_valid(self):
        data = {
            'email': 'newuser@example.com',
            'password': 'password123',
            'confirm_password': 'password123'
        }
        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertEqual(user.email, 'newuser@example.com')
        self.assertTrue(user.check_password('password123'))

    def test_register_serializer_mismatch_passwords(self):
        data = {
            'email': 'newuser@example.com',
            'password': 'password123',
            'confirm_password': 'mismatch'
        }
        serializer = RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('non_field_errors', serializer.errors)

    def test_login_serializer_valid(self):
        # Create user content
        User = get_user_model()
        User.objects.create_user(email='test@example.com', password='password123')
        
        data = {
            'email': 'test@example.com',
            'password': 'password123'
        }
        serializer = LoginSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['user'].email, 'test@example.com')
