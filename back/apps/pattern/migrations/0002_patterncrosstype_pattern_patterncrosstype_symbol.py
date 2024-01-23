# Generated by Django 4.2.9 on 2024-01-23 12:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pattern', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='patterncrosstype',
            name='pattern',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='pattern.pattern'),
        ),
        migrations.AddField(
            model_name='patterncrosstype',
            name='symbol',
            field=models.CharField(max_length=1, null=True),
        ),
    ]