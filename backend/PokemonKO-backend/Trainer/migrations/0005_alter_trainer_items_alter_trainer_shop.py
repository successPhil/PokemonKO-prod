# Generated by Django 4.2.5 on 2023-10-09 15:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Items', '0001_initial'),
        ('Shop', '0002_remove_shop_trainer'),
        ('Trainer', '0004_alter_trainer_shop'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trainer',
            name='items',
            field=models.ManyToManyField(blank=True, related_name='trainers', to='Items.item'),
        ),
        migrations.AlterField(
            model_name='trainer',
            name='shop',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='Shop.shop'),
        ),
    ]