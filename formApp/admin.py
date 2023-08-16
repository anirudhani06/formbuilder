from django.contrib import admin
from .models import Form, Field

# Register your models here.
admin.site.register([Form, Field])
