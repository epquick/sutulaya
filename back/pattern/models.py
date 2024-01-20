from django.db import models


class Pattern(models.Model):
    width = models.PositiveIntegerField()
    height = models.PositiveIntegerField()


class PatternCrossType(models.Model):
    class Type(models.TextChoices):
        SIMPLE = 'S', 'simple'

    status = models.CharField(max_length=1, choices=Type.choices, default=Type.SIMPLE)
    color = models.CharField(max_length=6)


class PatternCross(models.Model):
    type = models.ForeignKey(PatternCrossType, on_delete=models.CASCADE)
    x_coord = models.PositiveIntegerField()
    y_coord = models.PositiveIntegerField()

