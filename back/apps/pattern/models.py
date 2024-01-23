from django.contrib.auth.models import User
from django.db import models


class Pattern(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    width = models.PositiveIntegerField()
    height = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} :: {self.name} :: {self.created_at}'


class PatternCrossType(models.Model):
    class Type(models.TextChoices):
        SIMPLE = 'S', 'simple'

    pattern = models.ForeignKey(Pattern, on_delete=models.CASCADE)
    type = models.CharField(max_length=1, choices=Type.choices, default=Type.SIMPLE)
    color = models.CharField(max_length=6)
    symbol = models.CharField(max_length=1)

    def __str__(self):
        return f'{self.pattern} :: {self.symbol}'


class PatternCross(models.Model):
    type = models.ForeignKey(PatternCrossType, on_delete=models.CASCADE)
    x_coord = models.PositiveIntegerField()
    y_coord = models.PositiveIntegerField()
    is_done = models.BooleanField(default=False)
    done_at = models.DateTimeField(null=True)

    def __str__(self):
        return f'{self.type} :: {self.x_coord} :: {self.y_coord}'

