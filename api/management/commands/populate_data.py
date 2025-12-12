import random
from django.core.management.base import BaseCommand
from api.models import Sweet, CustomUser

class Command(BaseCommand):
    help = 'Populate the database with fake data'

    def handle(self, *args, **options):
        self.stdout.write('Populating data...')

        # Create Sweets directly
        categories = ['Chocolate', 'Candy', 'Gummies', 'Pastry', 'Cookie']
        names = ['Delight', 'Supreme', 'Crunch', 'Chewy', 'Bliss', 'Treat', 'Sparkle']
        
        sweets_to_create = []
        for _ in range(20):
            category = random.choice(categories)
            name = f"{random.choice(names)} {category}"
            price = round(random.uniform(0.5, 10.0), 2)
            quantity = random.randint(0, 100)
            sweets_to_create.append(Sweet(name=name, category=category, price=price, quantity=quantity))
        
        Sweet.objects.bulk_create(sweets_to_create)
        self.stdout.write(self.style.SUCCESS(f'Successfully created {len(sweets_to_create)} sweets'))

        # Create fake users
        for i in range(5):
            email = f'user{i}@example.com'
            if not CustomUser.objects.filter(email=email).exists():
                CustomUser.objects.create_user(email=email, password='password123')
        
        self.stdout.write(self.style.SUCCESS('Successfully created 5 fake users'))
