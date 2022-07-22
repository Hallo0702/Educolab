# Generated by Django 3.2.12 on 2022-07-21 05:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='StudentInfo',
            fields=[
                ('student_id', models.CharField(max_length=45, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('birthday', models.DateField()),
                ('school', models.CharField(max_length=45)),
                ('grade', models.IntegerField()),
                ('class_field', models.IntegerField(db_column='class')),
                ('student_number', models.IntegerField()),
                ('password', models.CharField(max_length=45)),
                ('phone_number', models.CharField(max_length=11)),
                ('email', models.EmailField(max_length=45)),
                ('plus_point', models.IntegerField()),
                ('minus_point', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='TeacherInfo',
            fields=[
                ('teacher_id', models.CharField(max_length=45, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('birthday', models.DateField()),
                ('school', models.CharField(max_length=45)),
                ('subject', models.CharField(max_length=45)),
                ('homeroom_teacher_flag', models.IntegerField()),
                ('homeroom_teacher_grade', models.IntegerField(blank=True, null=True)),
                ('homeroom_teacher_class', models.IntegerField(blank=True, null=True)),
                ('password', models.CharField(max_length=45)),
                ('phone_number', models.CharField(max_length=11)),
                ('email', models.EmailField(max_length=45)),
            ],
        ),
    ]
