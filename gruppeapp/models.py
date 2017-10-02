# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User


from django.db import models

# Create your models here.
class Klasse(models.Model):
    navn = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None, blank=True, null=True)
    description = models.CharField(max_length=100)
    def __str__(self):
        return self.navn

    def __unicode__(self):
        return u'{f}'.format(f=self.navn)
class Elev(models.Model):
    klasse = models.ForeignKey(Klasse, on_delete=models.CASCADE)
    navn = models.CharField(max_length=100)
    def __str__(self):
        return self.navn
    def __unicode__(self):
        return u'{f}'.format(f=self.navn)
class Gruppe(models.Model):
    link = models.CharField(max_length=32)
    antalgrupper = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None, blank=True, null=True)
    def __str__(self):
        return self.link

class GruppeElev(models.Model):
    gruppe = models.ForeignKey(Gruppe, on_delete=models.CASCADE)
    navn = models.CharField(max_length=100)
    position = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.navn
    def __unicode__(self):
        return u'{f}'.format(f=self.navn)

class Advertisement(models.Model):
    size = models.CharField(max_length=10)
    ishorizontal = models.BooleanField(default=False)
    text = models.CharField(max_length=300)
    title = models.CharField(max_length=50)
    def __str__(self):
        return self.title