import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from api.serializers import LoginSerializer

User = get_user_model()
try:
    if not User.objects.filter(email='test@example.com').exists():
        User.objects.create_user(email='test@example.com', password='password123')
        print("Created user")
    else:
        print("User exists")

    data = {
        'email': 'test@example.com',
        'password': 'password123'
    }
    serializer = LoginSerializer(data=data)
    if serializer.is_valid():
        print("VALID")
        user = serializer.validated_data['user']
        print(f"User email: '{user.email}'")
        if user.email == 'test@example.com':
             print("MATCH")
        else:
             print("MISMATCH")
    else:
        print("INVALID")
        print(serializer.errors)

except Exception as e:
    print(e)
