# Generated by Django 3.2.12 on 2022-08-08 01:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('homework', '0011_studenthomework_teacher'),
    ]

    operations = [
        migrations.AlterField(
            model_name='submithomework',
            name='student',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='submit_homework', to=settings.AUTH_USER_MODEL),
        ),
    ]
