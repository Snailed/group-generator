# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-20 09:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gruppeapp', '0009_auto_20170719_2020'),
    ]

    operations = [
        migrations.AddField(
            model_name='klasse',
            name='description',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]
