from django.db import models


class File(models.Model):
    svg_txt = models.TextField()

    def __str__(self):
        return f'file {self.id}'
