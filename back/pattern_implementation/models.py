from django.contrib.auth.models import User
from django.db import models

from back.pattern.models import Pattern, PatternCross


class PatternImplementation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pattern = models.ForeignKey(Pattern, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class PatternImplementationCross(models.Model):
    pattern_implementation = models.ForeignKey(PatternImplementation, on_delete=models.CASCADE)
    cross = models.ForeignKey(PatternCross, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

