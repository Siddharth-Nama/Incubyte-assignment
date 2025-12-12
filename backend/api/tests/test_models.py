from django.test import TestCase
from django.contrib.auth import get_user_model

class UserModelTests(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email='test@example.com', password='password123')
        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.check_password('password123'))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        User = get_user_model()
        admin = User.objects.create_superuser(email='admin@example.com', password='password123')
        self.assertEqual(admin.email, 'admin@example.com')
        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_superuser)

    def test_create_user_invalid_email(self):
        User = get_user_model()
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password='password123')
