# Generated by Django 4.2.5 on 2023-10-10 03:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemon', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pokemon',
            name='max_health',
            field=models.IntegerField(default=45),
        ),
        migrations.AlterField(
            model_name='pokemon',
            name='health',
            field=models.IntegerField(default=45),
        ),
    ]
