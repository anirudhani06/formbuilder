from django.db import models
import uuid
from django.contrib.auth import get_user_model

USER = get_user_model()

# Create your models here.


class Form(models.Model):
    id = models.UUIDField(
        default=uuid.uuid1, primary_key=True, unique=True, editable=False
    )
    name = models.CharField(max_length=255)
    submit = models.CharField(max_length=40, default="Submit")
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self) -> str:
        return self.name


class Field(models.Model):
    label = models.CharField(max_length=255)
    field_type = models.CharField(max_length=50, blank=True, null=True)
    name = models.CharField(max_length=40, blank=True, null=True)
    placeholder = models.CharField(max_length=40, blank=True, null=True)
    max_len = models.CharField(max_length=20, blank=True, null=True)
    min_len = models.CharField(max_length=20, blank=True, null=True)
    rows = models.CharField(max_length=20, blank=True, null=True)
    required = models.BooleanField(default=False)
    position = models.IntegerField()

    form = models.ForeignKey(Form, on_delete=models.CASCADE, related_name="fields")

    def __str__(self) -> str:
        return self.label

    class Meta:
        ordering = ["position"]
