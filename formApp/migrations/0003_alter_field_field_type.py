# Generated by Django 4.2.4 on 2023-08-15 11:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('formApp', '0002_alter_field_max_len_alter_field_min_len_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='field',
            name='field_type',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
