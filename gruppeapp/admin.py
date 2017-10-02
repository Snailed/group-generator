# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Elev, Klasse, Gruppe, GruppeElev, Advertisement

# Register your models here.
admin.site.register(Klasse)
admin.site.register(Elev)
admin.site.register(Gruppe)
admin.site.register(GruppeElev)
admin.site.register(Advertisement)